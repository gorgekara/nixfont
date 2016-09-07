NixFont.controller('HomeController', function ($scope, ApiService) {
  'use strict';

  $scope.fonts = [];

  ApiService.get({
    success: function (data) {
      // $scope.fonts = data.items;

      // Temporary limit items
      data.items.forEach(function (item, index) {
        if (index < 5) {
          $scope.fonts.push(item);
        }
      })
    }
  })
});