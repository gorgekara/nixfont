NixFont.directive('nixScrollDown', function () {
  'use strict';

  var scrollDirection = 0;

  return {
    link: function (scope, element, attrs) {
      var nextButton = '.btn-next',
          fonts = '.fonts';

      $(element).on('scroll', function () {
        if (scrollDirection < $(fonts).scrollTop()) {
          if ($(fonts).height() + 100 > $(nextButton).position().top) {
            scope.$apply(function () {
              scope.$eval(attrs.nixScrollDown);
            });
          }
        }

        scrollDirection = $(fonts).scrollTop();
      });

    }
  };
});
