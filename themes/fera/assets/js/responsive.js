var Responsive;

Responsive = (function() {
  function Responsive() {
    this.behavior();
  }

  Responsive.isPhone = function() {
    return $('html').hasClass("phone-screen");
  };

  Responsive.isSmartphone = function() {
    return $('html').hasClass("smartphone-screen");
  };

  Responsive.isTablet = function() {
    return $('html').hasClass("tablet-screen");
  };

  Responsive.isDesktop = function() {
    return $('html').hasClass("desktop-screen");
  };

  Responsive.prototype.defineScreen = function() {
    var screen, width;
    width = $(window).width();
    screen = '';
    if (width <= 800) {
      screen = "smartphone-screen";
    } else if (width >= 801 && width <= 1024) {
      screen = "tablet-screen";
    } else {
      screen = "desktop-screen";
    }
    $('html').addClass(screen);
    return screen;
  };

  Responsive.prototype.behavior = function() {
    var checkScreen, lazyHandler;
    this.actualScreen = this.defineScreen();
    checkScreen = (function(_this) {
      return function() {
        if (_this.actualScreen !== _this.defineScreen()) {
          return location.reload();
        }
      };
    })(this);
    lazyHandler = _.debounce(checkScreen, 250);
    return $(window).on("resize", lazyHandler);
  };

  return Responsive;

})();

$(function() {
  return new Responsive;
});