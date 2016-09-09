NixFont.directive('toolbar', function ($rootScope, FontService) {
  'use strict';

  var remote = require('electron').remote;

  return {
    replace: true,
    templateUrl: './feapp/shared/toolbar/toolbar.html',
    link: function (scope, element, attrs) {
      var browserWindow = remote.getCurrentWindow();

      scope.search = function () {
        $rootScope.$emit('search', FontService.search(scope.query));
      };

      scope.close = function () {
        browserWindow.close();
      };

      scope.minimize = function () {
        browserWindow.minimize();
      };
    }
  }
});
