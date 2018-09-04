var general = (function() {
  'use strict';

  var config = {
    selectors: {
      owl_carousel: $('.fera-slider'),
      owl_thumbs: $('.fera-slider-thumbs'),
      menu: $('.menu-mobile'),
      logo: $('.header-logo'),
      nav: $('.header-nav'),
      body: $('body'),
      number_container: $('.number-container')
    },

    classes: {
      active: 'active'
    },

    data: {
      product: {
        loop: false,
        items: 1,
        nav: true
      },
      slider: {
        loop: false,
        items: 1,
        nav: true,
        dots: true
      },
      thumbs: {
        loop:false,
        nav:false,
        center:true,
        responsive:{
          0:{
            items:3
          },
          600:{
            items:4
          },
          1000:{
            items:6
          }
        }
      }
    }
  }

  function init() {
    carousel();
    config.selectors.menu.on('click', menu);
    customInputNumber();
  }

  function menu(){
    $(this).toggleClass('-opened');
    config.selectors.logo.toggleClass('-opened');
    config.selectors.body.toggleClass('-hidden');
    config.selectors.nav.toggleClass('-opened');
  }

  function carousel() {
    config.selectors.owl_carousel.each(function() {
      $(this).owlCarousel(config.data[$(this).data('carousel')]).on('changed.owl.carousel', function (e) {
       config.selectors.owl_thumbs.trigger('to.owl.carousel', [e.item.index, 500, true]);
      });;
    });

    config.selectors.owl_thumbs.each(function() {
      $(this).owlCarousel(config.data[$(this).data('carousel')]).on('click', '.owl-item', function () {
         config.selectors.owl_carousel.trigger('to.owl.carousel', [$(this).index(), 500, true]);
        }).on('changed.owl.carousel', function (e) {
         config.selectors.owl_carousel.trigger('to.owl.carousel', [e.item.index, 500, true]);
      });;
    });
  }

  function customInputNumber(){
    config.selectors.number_container.each(function() {
      var el = $(this),
        input = el.find('input[type="number"]'),
        plus = el.find('.plus'),
        minus = el.find('.minus'),
        min = input.attr('min'),
        max = input.attr('max');

      plus.click(function() {
        var actualVal = parseFloat(input.val());
        if (actualVal >= max) {
          var newVal = actualVal;
        } else {
          var newVal = actualVal + 1;
        }
        el.find("input").val(newVal);
        el.find("input").trigger("change");
      });

      minus.click(function() {
        var actualVal = parseFloat(input.val());
        if (actualVal <= min) {
          var newVal = actualVal;
        } else {
          var newVal = actualVal - 1;
        }
        el.find("input").val(newVal);
        el.find("input").trigger("change");
      });

    });
  }


  return {
    init: init
  };
}());

$(document).ready(function() {
  general.init();
});
