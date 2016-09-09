NixFont.directive('nixScrollUp', function () {
  'use strict';

  var scrollDirection = 0;

  return {
    link: function (scope, element, attrs) {
      var fonts = '.fonts';

      $(element).on('scroll', function () {
        if (scrollDirection > $(fonts).scrollTop()) {
            scope.$apply(function () {
                scope.$eval(attrs.nixScrollUp);
            });
        }

        scrollDirection = $(fonts).scrollTop();
      });

    }
  };
});
