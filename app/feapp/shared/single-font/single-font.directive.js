NixFont.directive('singleFont', function () {
  'use strict';

  return {
    replace: true,
    scope: {
      font: '=',
      index: '@'
    },
    templateUrl: './feapp/shared/single-font/single-font.html',
    link: function (scope, element, attrs) {

      scope.toggleParagraph = function () {
        scope.font.showParagraph = !scope.font.showParagraph;
      };

      $('head').prepend([
        '<style type="text/css">',
          '@font-face {',
            'font-family: "', scope.font.family ,'";',
            'src: local("☺"), url("', scope.font.files.regular , '") format("truetype");',
          '}',
          '.f-', scope.index , ' {',
            'font-family: ', scope.font.family , ' !important;',
          '}',
        '</style>'].join(''));
    }
  }
});