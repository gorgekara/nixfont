NixFont.directive('toolbar', function () {
  'use strict';

  var remote = require('electron').remote;

  return {
    replace: true,
    templateUrl: './feapp/shared/toolbar/toolbar.html',
    link: function (scope, element, attrs) {
      var browserWindow = remote.getCurrentWindow();

      scope.close = function () {
        browserWindow.close();
      };

      scope.minimize = function () {
        browserWindow.minimize();
      };
    }
  }
});