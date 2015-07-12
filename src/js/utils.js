/*********************
 * utils.js
 *********************/

/* FUNCTIONS UTILS*/
/**
* function browser
* arg: "width" or "height"
* @return width or the height of the current browser window.
*/
function browser(arg){
  var myWidth;
  var myHeight;

  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement &&
  ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {

    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;

  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {

    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;

  }
  if(arg=="width"){
    return myWidth;
  }
  if(arg=="height"){
    return myHeight;
  }
}

/**
* function isMobile
*
* @return true or false
*/
var isMobile = function () {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
};

var isSafari = function() {
  return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
};

var isSafariMobile = function() {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  return (/iPhone|iPod|iPad/).test(ua);
};
