/*********************
 * jquery.bootstrap.carouselvideo.js *
 *********************/

(function ($) {

  /* CAROUSEL VIDEO CLASS DEFINITION */

  var CarouselVideo = function (element, options) {
    this.$element = $(element);
    this.options = options;
    if(!isMobile()){
      this.$window = $(window).on('resize', $.proxy(this.setSize, this));
    }
    this.init();
  };

  CarouselVideo.prototype = {

    // Build
    init: function () {
      var self = this;

      if(!this.$element.find('.item.active').length){
        this.$element.find('.item:first').addClass('active');
      }

      this.$element.find('.item').each(function(){
        self.initSlide(this);
      });

      this.setSize();
      this.$element.attr('data-ready', true);
      return this;
    },

    initVideo: function(){
      //second it
      this.$element.find('.item video').each(function(){
        $video = $(this);
        $wrap = $video.wrap('<div></div>').addClass('video-wrapper');
      });
    },

    initSlide:function(slide){
      var $video = $(slide).find('video');
      if(!$video.length)
        return;

      if(isMobile()){
        $video.remove();
        return;
      }
      $video.wrap('<div></div>');

      if($(slide).hasClass('active')){
        $video[0].play();
      }
      $(slide).on('addClass', function(e, classes){
        if(classes.indexOf('active') >= 0){
          console.log('Play', $video);
          $video[0].play();
        }
      });
      $(slide).on('removeClass', function(e, classes){
        if(classes.indexOf('active') >= 0){
          console.log('Stop');
          $video[0].pause();
        }
      });
    },

    setSize: function(){
      // First it set the height of every item
      var self = this;
      var height = browser('height') - this.options.paddingBottom;
      this.$element.find('.item').css('height', height+'px');
    console.log('setSize', height);

      this.$element.find('.item video').each(function(){
        self.centerElement($(this));
      });
    },

    centerElement: function($elt){
      var initW = parseInt($elt.data('width'));
      var initH = parseInt($elt.data('height'));

      var carW = browser('width');
      var carH = browser('height') - this.options.paddingBottom;

      var ratio = initW/initH;

      var newW, newH, top, left;

      if(initW/initH > carW/carH){
        newH = carH;
        newW = initW * newH / initH;
        top = 0;
        left = ( carW - newW ) / 2;
      }else{
        newW = carW;
        newH = initH * newW / initW;
        left = 0;
        top = ( carH - newH ) / 2;
      }

      $elt.parent().css({
        'width': newW+'px',
        'height': newH+'px',
        'top': top+'px',
        'left': left+'px',
      });
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
