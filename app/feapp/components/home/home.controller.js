NixFont.controller('HomeController', function ($rootScope, $scope, ApiService, FontService) {
  'use strict';

  $rootScope.$on('search', function (event, searchResults) {
    $scope.empty = false;

    if (!searchResults) {
      FontService.clear();
      $scope.fonts = FontService.next();
      $scope.nextDisabled = false;
    } else if (searchResults.length) {
      $scope.fonts = searchResults;
      $scope.nextDisabled = true;
    } else if (!searchResults.length) {
      $scope.fonts = [];
      $scope.nextDisabled = true;
      $scope.empty = true;
    }
  });

  $scope.fonts = [];

  $scope.next = function () {
    var previousPage = FontService.page - 1,
        maxIndex = FontService.perPage * previousPage;

    $scope.fonts.forEach(function (font, index) {
      if (index >= previousPage && index <= maxIndex) {
        font.removed = true;
      }
    });

    $scope.fonts = $scope.fonts.concat(FontService.next());

    $scope.tempPage = previousPage;
    $scope.tempMax = maxIndex;
  };

  $scope.previous = function () {
    $scope.fonts.forEach(function (font, index) {
      if (index >= $scope.tempPage && index <= $scope.tempMax) {
        font.removed = false;
      }
    });

    $scope.tempPage -= 1;
    $scope.tempMax = FontService.perPage * $scope.tempPage;
  };

  if (FontService.get()) {
    $scope.fonts = FontService.next();
  } else {
    getFonts();
  }

  function getFonts() {
    ApiService.get({
      success: function (data) {
        FontService.save(data.item);
      }
    });
  }
});
