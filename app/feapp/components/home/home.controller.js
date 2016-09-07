NixFont.controller('HomeController', function ($scope, ApiService) {
  'use strict';

  ApiService.get({
    success: function (data) {
      $scope.fonts = data.items;
    }
  })
});