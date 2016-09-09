NixFont.controller('LayoutController', function ($scope, ConnectionService) {
  'use strict';

  function success() {
  }

  function error() {
    // $scope.notConnected = true;
  }

  ConnectionService.check(success, error);
});
