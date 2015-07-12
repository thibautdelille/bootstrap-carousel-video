/*********************
 * jquery.bootstrap.carouselvideo.js *
 *********************/

(function ($) {

  /* CAROUSEL VIDEO CLASS DEFINITION */

  var CarouselVideo = function (element, options) {
    this.$element = $(element);
    this.options = options;
    this.$window = $(window).on('resize', $.proxy(this.setSize, this));
    this.init();
  };

  CarouselVideo.prototype = {

    // Build
    init: function () {
      console.log('init CarouselVideo');
      this.initVideo();
      this.setSize();
      this.$element.attr('data-ready', true);

      this.$element.find('.item').each(function(){
      });
      return this;
    },

    initVideo: function(){
      //second it
      this.$element.find('.item video').each(function(){
        $video = $(this);
        $video.attr('data-width', $video.width());
        $video.attr('data-height', $video.height());
        $video.wrap('<div></div>').addClass('video-wrapper');
      });
    },

    setSize: function(){
      // First it set the height of every item
      var self = this;
      var height = browser('height') - this.options.paddingBottom;
      this.$element.find('.item').css('height', height+'px');

      this.$element.find('.item video').each(function(){
        self.centerElement($(this));
      });
    },

    centerElement: function($elt){
      var initW = parseInt($elt.data('width'));
      var initH = parseInt($elt.data('height'));

      var ratio = initW/initH;

      var newW, newH, top, left;

      if(initW/initH > browser('width')/browser('height')){
        newH = browser('height');
        newW = initW*newH/initH;
        top = 0;
        left = (browser('width')-newW)/2;
      }else{
        newW = browser('width');
        newH = initH*newW/initW;
        left = 0;
        top = (browser('height')-newH)/2;
      }

      $elt.parent().css({
        'width': newW+'px',
        'height': newH+'px',
        'marginTop': top+'px',
        'marginLeft': left+'px',
      })
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
    paddingBottom: '',
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
