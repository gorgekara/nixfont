NixFont.service('ConnectionService', function ($http) {
  'use strict';

  var self = {};

  self.check = function (success, error) {
    success = success || function () {};
    error = error || function () {};
    $http.get('http://google.com').then(success, error);
  };

  return self;
});
