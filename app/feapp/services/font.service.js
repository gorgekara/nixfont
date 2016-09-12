NixFont.service('FontService', function (CONSTANTS, $http) {
  'use strict';

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();

    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;

      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function similarity(s1, s2) {
    var longer = s1,
        shorter = s2,
        longerLength;

    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }

    longerLength = longer.length;

    if (longerLength === 0) {
      return 1.0;
    }

    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  var self = {};

  self.page = 0;
  self.perPage = 10;

  self.save = function (fonts) {
    localStorage.setItem('fonts', JSON.stringify(fonts));
    self.fonts = fonts;
  };

  self.get = function () {
    var fonts = typeof localStorage.getItem('fonts') === 'undefined' ? '{}' : localStorage.getItem('fonts');
    return self.fonts || JSON.parse(fonts);
  };

  self.next = function () {
    var temp = self.get();

    if (self.disableNext) { return []; }

    temp = temp.splice(self.page * self.perPage, self.perPage);

    self.page += 1;

    return temp;
  };

  self.clear = function () {
    self.page = 0;
    self.disableNext = false;
  };

  self.search = function (query) {
    if (!query) { return false; }

    self.disableNext = true;
    self.page = 0;

    var temp = _.filter(self.get(), function (font) {
      var fontSimilarity = similarity(query, font.family);

      if (fontSimilarity > 0.3) {
        font.similarity = fontSimilarity;
        return font.family;
      }
    });

    temp = _.orderBy(temp, 'similarity', 'desc');

    return temp;
  };

  return self;
});
