/*********************
 * jquery.bootstrap.carouselvideo.js *
 *********************/

(function ($) {

  /* CAROUSEL VIDEO CLASS DEFINITION */

  var CarouselVideo = function (element, options) {
    this.$element = $(element);
    this.options = options;
    this.init();
  };

  CarouselVideo.prototype = {

    // Build
    init: function () {
      console.log('init CarouselVideo');
      return this;
    },

    setHeight: function(){
      
    }
  };

  /* CAROUSEL VIDEO PLUGIN DEFINITION */
  var old = $.fn.carouselvideo;

  $.fn.carouselvideo = function (option) {
    return this.each(function() {
      var data = $(this).data('carouselvideo'),
          options = $.extend({}, $.fn.carouselvideo.defaults, $(this).data(), typeof option === 'object' && option);
      if (!data) {
        $(this).data('carouselvideo', (data = new CarouselVideo(this, options)));
      }
      if (typeof option === 'string') {
        data['_'+option]();
      }
    });
  };

  $.fn.carouselvideo.defaults = {
    target: ''
  };

  $.fn.carouselvideo.Constructor = CarouselVideo;

  /* CAROUSEL VIDEO NO CONFLICT */
  $.fn.carouselvideo.noConflict = function () {
    $.fn.carouselvideo = old;
    return this;
  };

  /* CAROUSEL VIDEO ON LOAD */
  $(window).on('load', function (){
    $('[data-carouselvideo]').each(function(){
      var options = {
        target : $(this).attr("data-target")
      };
      $(this).carouselvideo(options);
    });

  });
})(window.jQuery);
