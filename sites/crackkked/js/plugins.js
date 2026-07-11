/*! npm.im/scroll-restoration-polyfill */
!function(){"use strict";/*! npm.im/one-event */
function e(e,n,t,o){e.addEventListener(n,t,o),e.addEventListener(n,function r(){e.removeEventListener(n,t,o),e.removeEventListener(n,r,o)},o)}function n(){return window.pageYOffset||document.body.scrollTop}function t(){return window.pageXOffset||document.body.scrollLeft}function o(){e(window,"scroll",scrollTo.bind(window,t(),n()))}e.promise=function(n,t,o){return new Promise(function(r){return e(n,t,r,o)})};var r="auto";"scrollRestoration"in history||Object.defineProperty(history,"scrollRestoration",{enumerable:!0,get:function(){return r},set:function(e){e!==r&&("auto"===e?(window.removeEventListener("popstate",o),r=e):"manual"===e&&(window.addEventListener("popstate",o),r=e))}})}();

// Easing
function easeOutBounce(t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
    return c*(7.5625*t*t) + b;
  } else if (t < (2/2.75)) {
    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  } else if (t < (2.5/2.75)) {
    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  } else {
    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  }
}

function easeOutCubic(t, b, c, d) {
  t /= d;
  t--;
  return c*(t*t*t + 1) + b;
};

function easeIn(t, b, c, d) {

    return -c *(t/=d)*(t-2) + b;

};

// Touch
var isTouch = is_touch_device();

function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

// Mobile Tablet helpers
var isMobile = false;
var isTablet = false;
var userAgent = navigator.userAgent;

if ( (userAgent.indexOf('iPhone') !== -1) || (userAgent.indexOf('Android') !== -1 && userAgent.indexOf('Mobile') !== -1 ))  {
    document.querySelector('html').classList.add('mobile');
    isMobile = true;
} else if (userAgent.indexOf('iPad') !== -1 || userAgent.indexOf('Android') !== -1) {
    document.querySelector('html').classList.add('tablet');
    isTablet = true;
} else {
    document.querySelector('html').classList.add('desktop');
}

if (userAgent.indexOf('iPad') !== -1 || userAgent.indexOf('iPhone') !== -1)
    document.querySelector('html').classList.add('ios');

if ( userAgent.indexOf('Android') !== -1 )
    document.querySelector('html').classList.add('android');

if ( userAgent.indexOf('BlackBerry') !== -1 )
    document.querySelector('html').classList.add('blackberry', 'minimized');

// Due to high resolution devices crashing cause of too much pixel data

//screen.availHeight 1004 - width: 768
//screen.availHeight 748 - width: 1024 // all ipads
// Targeting iPad mini
if ( userAgent.indexOf('iPad') !== -1 && window.screen.availWidth === 768 && window.screen.availHeight === 1004 ) {
  //alert('iPad mini detected');
}

// Targeting iPhone 6 Plus
if ( userAgent.indexOf('iPhone') !== -1 && window.screen.height === 736 && window.screen.width === 414 && window.devicePixelRatio > 2.5 ) {
  //alert('iPhone 6 Plus detected');
}

// Portrait or Landscape
function onOrientationChange() {
  if(window.innerHeight > window.innerWidth) {
      document.querySelector('html').classList.remove('landscape');
      document.querySelector('html').classList.add('portrait');
  } else {
      document.querySelector('html').classList.remove('portrait');
      document.querySelector('html').classList.add('landscape');
  }

}

function randNum(min, max) {
    return Math.random() * (max - min) + min;
};

// Set image ratios
function setRatio( el, windowSizing ){
  var $this = el,
    ht = 1600,
    wdt = 2560,
    rest,
    maxht, maxwdt;

  if (document.querySelector('html').classList.contains('portrait')) {
    ht = 2560,
    wdt = 1600;
  }

  if (windowSizing) {
    maxht =  window.innerHeight;
    maxwdt =  window.innerWidth;
  } else {
    maxht = $this.parentElement.getBoundingClientRect().height;
    maxwdt = $this.parentElement.getBoundingClientRect().width;
  }

  var divRatio = (maxht / maxwdt) * 100,
    elRatio = (ht / wdt) * 100,
    pixAlign = {'margin-top':0,'margin-left':0};

  if (divRatio > elRatio) {
      console.log(1);

    $this.style.height = maxht + 'px';
    $this.style.width = 'auto';

    rest = $this.getBoundingClientRect().width - maxwdt;

    $this.style.marginTop = 0;
    $this.style.marginLeft = '-'+(rest/2)+'px';
  } else {
    console.log(2);

    $this.style.height = 'auto';
    $this.style.width = maxwdt + 'px';

    rest = $this.getBoundingClientRect().height - maxht;

    $this.style.marginTop = '-'+(rest/2)+'px';

    $this.style.marginLeft = 0;
  }

  // Chain
  return $this;
};


// download base 64
function base64ToArrayBuffer(base64) {
    var binaryString =  window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++)        {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

var saveByteArray = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, name) {
        var blob = new Blob(data, {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// download base 64 - DEMO
/*
var image = renderer.extract.image();  // pixijs
document.body.append(image);
var base64 = image.src.split(',')[1]

var sampleBytes = base64ToArrayBuffer(base64);
saveByteArray([sampleBytes], 'yo.png');
*/

