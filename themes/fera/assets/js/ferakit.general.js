var general = (function() {
  'use strict';

  var config = {
    selectors: {
      owl_carousel: $('.fera-slider'),
      owl_thumbs: $('.fera-slider-thumbs')
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


  return {
    init: init
  };
}());

$(document).ready(function() {
  general.init();
});
