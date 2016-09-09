NixFont.directive('singleFont', function () {
  'use strict';

  var remote = require('electron').remote,
      actions = remote.require('./actions.js'),
      dialog = remote.dialog;

  return {
    replace: true,
    scope: {
      font: '=',
      index: '@'
    },
    templateUrl: './feapp/shared/single-font/single-font.html',
    link: function (scope, element, attrs) {

      scope.downloadFont = function () {
        var selectedFolder = dialog.showOpenDialog({
              properties: ['openDirectory']
            }),
            file,
            key;

        for (key in scope.font.files) {
          file = scope.font.files[key];

          actions.downloadFont({
            downloadFolder: selectedFolder[0],
            fontURL: file,
            font: file
          }, function (error, file) {
            if (error) {
              console.log('Font not saved!');
            }

            console.log(file);
          });
        }
      };

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
