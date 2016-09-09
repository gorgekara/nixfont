var electron = require('electron'),
    jetpack = require('fs-jetpack'),
    notifier = require('node-notifier'),
    fs = require('fs'),
    request = require('request');

module.exports = {
  downloadFont: function (options, cb) {
    request(options.fontURL, {
      encoding: 'binary'
    }, function (error, response, body) {
      if (error) {
        notifier.notify({
          title: 'Failed to download font file!',
          message: options.font
        });
        return cb(error);
      }

      var fontPathArr = options.font.split('/'),
          fontName = fontPathArr[fontPathArr.length - 1],
          fullFilePath = options.downloadFolder + '/' + fontName;

      fs.writeFile(fullFilePath, body, 'binary', function (err) {
        if (error) {
          console.log(error);
          return;
        }

        notifier.notify({
          title: 'Downloaded font file!',
          message: options.font
        });

        if (typeof cb === 'function') {
          cb(null, JSON.stringify(options.font));
        }
      });
    });
  }
};
