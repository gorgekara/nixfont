NixFont.service('ApiService', function (CONSTANTS, $http) {
  'use strict';

  var self = {};

  self.get = function (options) {
    options.method = 'GET';
    return self.exec(options);
  };

  self.post = function (options) {
    options.method = 'POST';
    return self.exec(options);
  };

  self.put = function (options) {
    options.method = 'PUT';
    return self.exec(options);
  };

  self.delete = function (options) {
    options.method = 'DELETE';
    return self.exec(options);
  };

  self.exec = function (options) {
    options.success = options.success || function () {};
    options.error = options.error || function () {};

    var headers,
        onSuccess,
        onError;
    
    headers = {};
    headers['Content-Type'] = 'application/json';

    onSuccess = function (response) {
      if (response.status >= 400) {
        options.error(response);
        return;
      }

      options.success(response.data, response);
    };

    onError = function (response) {
      options.error(response);
    };

    return $http({
      method: options.method,
      headers: headers,
      url: CONSTANTS.API_URL + '?key=' + CONSTANTS.API_KEY,
      params: options.params || {},
      data: options.data || {},
    }).then(onSuccess, onError);
  };

  return self;
});