var general = (function() {
  'use strict';

  function init() {
    parallax();
    map();
    lightbox();
    submenu();
  }

  function lightbox() {
    $("[data-fancybox]").fancybox({
      infobar : false,
      buttons : false,
    });
  }

  function submenu() {
    var $header, oldHeight;

    // if (Responsive.isSmartphone()) {
    //   return false;
    // }

    $header = $('.main-header');

    $('.main-nav .link.-primary[href="#"]').on('click', function(e) {
      var $currentSubmenu, newHeight;

      e.preventDefault();
      e.stopPropagation();

      $currentSubmenu = $(this).parents('.item').find('.submenu');
      $('.submenu').not($currentSubmenu).removeClass('-active');

      if (!$currentSubmenu.hasClass('-active')) {
        $currentSubmenu.addClass('-active');
      } else {
        $currentSubmenu.removeClass('-active');
      }

    });

    $(document).on('click', 'html', function(e) {
      $('.submenu').removeClass('-active');
    });

  };

  function map() {

    $('section.map').on('click', function () {
      $('.map iframe').css("pointer-events", "auto");
    });

    $("section.map").on('mouseleave', function() {
      $('iframe').css("pointer-events", "none");
    });

  }

  function parallax() {

    if(!Responsive.isSmartphone() && !Responsive.isTablet()) {
      skrollr.init({
        smoothScrolling: false,
        forceHeight: false
      });
    }

  }

  return {
    init:init
  };
}());

$(function(){
  general.init();
});