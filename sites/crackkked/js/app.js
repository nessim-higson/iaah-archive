/**
* @AUTHOR KLASH.NL
*/

var letterArray;

var stage,
	renderer;

var preloader_2_completed = false;


var CrackedApp = function() {

	this.useTransforms = true;
	this.router = null;

	var word;
	var isTouch;

	const _overlayTyping = document.querySelector('.overlay-typing');
	const _portrait = document.querySelector('#portrait');
	const _shardLoader = document.querySelector('.preloader-container-outer');
	const _lineLoader = document.querySelector('.line-loader');
	const _overlayPreloader = document.querySelector('.overlay-preloader');
	const _uiComponent = document.querySelector('.ui-component');

	const _form = document.querySelector('form');
	const _inputText = _form.querySelector('#input-text');

	var _canvas = null;


	var imageObj,
		imgArray = [],
		str = "",
		arrayChars = [],
		arrayHorizontalLines = [],
		arrayLines = [],
		useSize;

	var cornersObj;

	var canvasWidth = 0,
		canvasHeight = 0,
		assetWidth = 0;

	var sizesObj = {
		large: {
			width: 2560,
			height: 1600,
			assetWidth: 1280
		},
		small: {
			// width: 1280,
			// height: 800,
			// assetWidth: 640
			// width: 640,
			// height: 400,
			// assetWidth: 320
			width: 2560,
			height: 1600,
			assetWidth: 1280
		}
	};

	var pathsObj = {
		lines: 'img/lines-verticals/',
		horizontallines: 'img/lines-horizontals/',
		letters: 'img/alphabet/',
		corners: 'img/corners/'
	};

	this.getChars = function() {
		return arrayChars;
	}

	this.getCorners = function() {
		return cornersObj;
	}

	this.getHorizontalLines= function() {
		return arrayHorizontalLines;
	}

	this.getLines= function() {
		return arrayLines;
	}

	function downloadCanvas(link, canvasId, filename) {
		link.href = document.getElementById(canvasId).toDataURL();
		link.download = filename;
	}

	function buildLetters() {
		Letters.setLetters(function(data) {
			buildCorners();
		});
	}

	function buildCorners() {
		Corners.setCorners(function(data) {
			buildLines();
		});
	}

	function buildLines() {
		Lines.setLines(function(data) {
			completeBuilding()
		});
	}

	function completeBuilding() {

		createPortriatVariant();

		window.dispatchEvent(new Event('resize'));
		TweenMax.to([_canvas, _canvasPortrait], 0.8, {opacity: 1});
	}

	function createPortriatVariant() {

		var a = document.getElementById("canvas"),
			b = document.getElementById("portrait"),
			actx = a.getContext("2d"),
			ctx = b.getContext("2d");

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.save();

		// move to the center of the canvas
		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);

		// rotate the canvas to the specified degrees
		ctx.rotate(90*Math.PI/180);

		//ctx.drawImage(a,-1280,-800);
		ctx.drawImage(a,-(ctx.canvas.height/2),-(ctx.canvas.width/2));

		ctx.restore();
		//showForm();
	}

	function hideForm() {
		_overlayTyping.classList.remove('show');
		document.activeElement.blur();
	}

	function showForm() {
		_overlayTyping.classList.add('show');
	}

	function resetCanvas() {
		renderer.render(stage);
		renderer.clear();
	}

	function attachEvents() {

		var self = this;

		// Text input
		$('form').submit(function(e) {

			e.preventDefault();

			console.warn('formsubmit')

			// Hide canvas
			//$('.holder-main').addClass('hide');
			_canvas.style.opacity = 0;
			_canvasPortrait.style.opacity = 0;

			// Saved typed text
			$(this).data('text-submitted', _inputText.value);
			$('.typed a span').html(_inputText.value);

			hideForm();

			arrayChars = [];

			word = _inputText.value;
			str = word.toUpperCase();
			for (i=0; i<str.split('').length;i++) {
				arrayChars.push({'letter': str.split('')[i]})
			}

			resetCanvas();

			//document.querySelector('.divider').remove();

			// Reload obj
			cornersObj = LetterDataModel.getCorners().corners.slice(0);
			var linesObj = LetterDataModel.getLines().lines.slice(0);

			// Get letters
			for (var i = stage.children.length - 1; i >= 0; i--) { stage.removeChild(stage.children[i]); };

			// Start image load
			buildLetters();

			// activate
			_uiComponent.style.display = 'block';
			_inputText.classList.add('active');

			//_inputText.val('');
		});

		// Refresh
		$('.ui-component .refresh a').on('click', function(e) {
			e.preventDefault();
			$('form').trigger('submit');
		});

		// Touch devices
		$('form .touch').on('click', function(){
			_inputText.focus()
		})
		// $('.touchevents input.text').on('focus', function(){
		//     $('form .touch').hide();
		// })

		// Clear
		$('.ui-component .typed a').on('click', function(e) {
			e.preventDefault();

			_uiComponent.style.display = 'none';

			// Reset WIP
			$('form').data('text-submitted', '');
			_inputText.value = '';

			if (isTouch){
				_overlayTyping.addClass('show');
				$('.form .touch').show();
			} else {
				_overlayPreloader.style.display = 'block';
			}


			resetCanvas();
		});

		// Download
		$('.ui-component .download a').on('click', function(e) {
			e.preventDefault();

			CrackedApp.downloadImage();
		});

		// Info
		var infoEl = document.querySelector('.overlay-info');
		var infoTitle1 = infoEl.querySelector('.title-1');
		var infoTitle2 = infoEl.querySelector('.title-2');
		var infoBody = infoEl.querySelector('.body');

		$('.info').on('click', function(e) {
			e.preventDefault();

			TweenMax.set(infoEl, {'display':'block','opacity':0});
			TweenMax.set([infoTitle1, infoTitle2], {'opacity': 0, y: 25});
			TweenMax.set(infoBody, {'opacity': 0});

			TweenMax.to(infoEl, 0.2, {'opacity': 1});
			TweenMax.to(infoTitle1, 0.7, {'y': 0, 'opacity': 1, delay: 0.2, ease: Cubic.easeOut});
			TweenMax.to(infoTitle2, 0.7, {'y': 0, 'opacity': 1, delay: 0.5, ease: Cubic.easeOut});
			TweenMax.to(infoBody, 0.3, {'opacity': 1, delay: 1.3});
		})

		$('.overlay-info').on('click', function(e) {
			e.preventDefault();

			TweenMax.to(infoEl, 0.2, {'opacity': 0, onComplete: function() {
				infoEl.style.display = 'none';
			}});
		})

		// Keystrokes
		var _spanTouch = document.querySelector('form span.touch');
		document.addEventListener("touchend", function(e) {
			if (_inputText.value === '' && document.activeElement.id !== 'input-text') {
				_spanTouch.style.display = 'block';
			} else {
				_spanTouch.style.display = 'none';
			}
		});

		document.addEventListener("keyup", function(e) {
			//console.warn('keyup: ' + _inputText.val());
		});

		document.addEventListener("keydown", function(e) {

			if ($('.overlay-info').hasClass('show')) {
				return;
			}

			_inputText.focus();
			$('form span.touch').hide();

			console.log('valid: ' + e.keyCode + ' inputval: ' + _inputText.value);

			// 13 = ENTER key
			// 27 = ESCAPE key
			// 8 = BACKSPACE key
			if ( !_overlayTyping.classList.contains('show') && e.keyCode !== 13) {

				_overlayPreloader.style.display = 'none';
				_overlayTyping.classList.add('show');

				_inputText.value = '';

			} else if ( _overlayTyping.classList.contains('show') && e.keyCode === 27) {

				_overlayTyping.classList.remove('show');

				_inputText.value = $('form').data('text-submitted');
			}


			var regex = new RegExp("^[a-zA-Z ]+$");
			var key = String.fromCharCode(e.keyCode); //String.fromCharCode(!event.charCode ? event.which : event.charCode);
			if (regex.test(key) || e.keyCode === 13 || e.keyCode === 8) {

				if (_inputText.value.length === 10 && e.keyCode !== 13 && e.keyCode !== 8) {

					TweenMax.to('.warning', 0.2, {opacity: 1, delay: 0.2});
					TweenMax.to('.warning', 0.6, {opacity: 0, delay: 3});

					e.preventDefault();
					return;
				}
			} else {
				e.preventDefault();
				console.log('cancel')
			}


			// 27 = ESCAPE key

		}, false);

	}

	this.downloadImage = function() {


		//$.post('services/save.php', {data: _canvas.toDataURL("image/png")})


	    $.post("services/save.php", {
	    	data: _canvas.toDataURL("image/png"),
	    	name: $('form').data('text-submitted')
	    }, function (file) {
	    	console.log(file);

			//window.open("http://192.168.0.20/generated/24517d7629c7e2dd04ec0489856c15d8.png", '_blank');
			// console.log("services/download.php?path=" + file);
			//    window.location.href =  "http://cracked.local/services/download.php?path=" + file;
			//window.location.href =  "http://cracked.local/services/download.php?path=http://cracked.local/generated/24517d7629c7e2dd04ec0489856c15d8.png";
			//window.open("http://cracked.local/services/download.php?path=http://cracked.local/generated/24517d7629c7e2dd04ec0489856c15d8.png", '_blank');
			//window.open("http://cracked.local/services/download.php?path=/Users/virgil/Sites/Cracked/www/generated/7845c860880970e14ffdaec5dbcdbaba.png", '_blank');

			if (isTouch) {
				window.location.href('http://'+window.location.host+'/generated/'+file, '_blank');
			}
			//window.location.href = 'http://'+window.location.host+'/generated/24517d7629c7e2dd04ec0489856c15d8.png';
	    });


	    if (!isTouch) {
			//option 5
			// uses plugins.js
			var image = renderer.extract.image();  // pixijs
			//document.body.appendChild(image);
			var base64 = image.src.split(',')[1];

			var sampleBytes = base64ToArrayBuffer(base64);
			saveByteArray([sampleBytes], $('form').data('text-submitted')+'.png');
		}

		// var canvas = document.getElementById("canvas");
		// if (canvas.toBlob) {
		//     canvas.toBlob(
		//         function (blob) {
		//             objectURL = URL.createObjectURL(blob);

		//             window.location.href = objectURL;
		//         },
		//         'image/jpeg'
		//     );
		// }




		//return false;

		//downloadCanvas(this, 'canvas', 'test.png');

		//Canvas2Image.saveAsJPEG(document.getElementById('canvas'), canvasWidth, canvasHeight, _inputText.val());

		// var canvas = document.getElementById("canvas"),
		//     ctx = canvas.getContext("2d");
		// canvas.toBlob(function(blob) {
		//     saveAs(blob, "pretty image.png");
		// });

		// option 4
		/*
		var canvas = document.getElementById("canvas");
		var dataURL = canvas.toDataURL();

		$.ajax({
		  type: "POST",
		  url: "save.php",
		  data: {
			 imgBase64: dataURL,
			 filename: $('form').data('text-submitted')
		  }
		}).done(function(o) {
		  console.log('saved');

			var a = document.createElement('a');
			document.body.append(a);
			a.target = '_blank';
			a.download = $('form').data('text-submitted')+'.jpg';
			a.href = location.origin + location.pathname + 'generated/'+$('form').data('text-submitted')+'.jpg';
			a.click();
			a.remove();


		  // If you want the file to be visible in the browser
		  // - please modify the callback in javascript. All you
		  // need is to return the url to the file, you just saved
		  // and than put the image in your browser.
		});
		*/


	}

	this.onOrientationChange = function() {

	}

	this.layout = function() {

		//var _canvas = $('canvas');

		// if ( _canvas.height() > $(window).height() ) {
		//     _canvas.css('margin-top', -(_canvas.height() - $(window).height())/2 );
		// } else {
		//     _canvas.css('margin-top', 0 );
		// }
		console.log(_canvas);

		setRatio(_canvas, true);
		setRatio(_portrait, true);

		//document.querySelector('.site-wrapper').style.height = window.innerHeight + 'px';

		onOrientationChange();

	}

	this.showIntro = function() {

		var delay = 1.2;

		if (isTouch){

			// Remove preloader line
			_overlayPreloader.remove();

			TweenMax.to(_shardLoader, 0.2, {opacity: 0, delay: delay, onComplete: function() {
				_shardLoader.remove();

				_overlayTyping.classList.add('show');
				_overlayTyping.style.display = 'block';

				TweenMax.to(_overlayTyping, 0.2, {opacity: 1, delay: delay});

				_inputText.focus();
			}});

		} else {

			_lineLoader.remove();

			TweenMax.to(_shardLoader, 0.2, {opacity: 0, delay: delay, onComplete: function() {
				_shardLoader.remove();
				_overlayPreloader.classList.add('show-next');
			}});
		}

		TweenMax.to('.site-title', 1.5, {opacity: 1, y: 0, delay: (delay)+0.3, ease: Expo.easeOut});
		TweenMax.to('.start-typing', 1, {opacity: 1, y: 0, delay: (delay)+0.3, ease: Expo.easeOut, onComplete: function() {
			console.log('-----------------------> show info button');
			TweenMax.to('a.info', 1.5, {opacity: 1, delay: 1, ease: Expo.easeOut});
		}});

		// $('body').on('click', function() {
		//     _inputText.focus();
		// });
		//_overlayTyping.show();

		_inputText.focus();
	}

	this.preload = function() {


		// pathsObj.lines = pathsObj.lines + useSize + '/';
		// pathsObj.horizontallines = pathsObj.horizontallines + useSize + '/';
		// pathsObj.letters = pathsObj.letters + useSize + '/';
		// pathsObj.corners = pathsObj.corners + useSize + '/';

		pathsObj.lines = pathsObj.lines;
		pathsObj.horizontallines = pathsObj.horizontallines;
		pathsObj.letters = pathsObj.letters;
		pathsObj.corners = pathsObj.corners;

		this.pathsObj = pathsObj;


		var lettersObj  = LetterDataModel.getData();
		var cornersObj  = LetterDataModel.getCorners().corners;
		var linesObj  = LetterDataModel.getLines().lines;
		var horizontallinesObj  = LetterDataModel.getHorizontalLines().lines;
		var filename;
		var filecounter = 0;

		// Get letters and add to preload batch
		console.log('letters: ' + Object.keys(lettersObj).length );
		for (var key in lettersObj) {
		  if (lettersObj.hasOwnProperty(key)) {
			for (var i=0;i<lettersObj[key].length;i++) {
				filename = pathsObj.letters + lettersObj[key][i].file;
				//console.log(pathsObj.letters + lettersObj[key][i].file);
				PIXI.loader.add(filename, filename)
				filecounter++;
			}
		  }
		}

		// Get corners and add to preload batch
		console.log('corners: ' + cornersObj.length );
		for (i=0;i<cornersObj.length;i++) {
			filename = pathsObj.corners + cornersObj[i].file;
			//console.log('cornerFilename',cornerFilename)
			PIXI.loader.add(filename, filename)
			filecounter++;
		}

		// Get lines and add to preload batch
		console.log('horizontallines: ' + horizontallinesObj.length );
		for (i=0;i<horizontallinesObj.length;i++) {
			filename = pathsObj.horizontallines + horizontallinesObj[i].file;
			//console.log('cornerFilename',cornerFilename)
			PIXI.loader.add(filename, filename)
			arrayHorizontalLines.push(PIXI.loader.resources[filename]);
			filecounter++;
		}

		// Get lines and add to preload batch
		console.log('lines: ' + linesObj.length );
		for (i=0;i<linesObj.length;i++) {
			filename = pathsObj.lines + linesObj[i].file;
			//console.log('cornerFilename',cornerFilename)
			PIXI.loader.add(filename, filename)
			arrayLines.push(PIXI.loader.resources[filename]);
			filecounter++;
		}

		console.log('filecounter', filecounter);


		PIXI.loader
			.load(function (loader, resources) {
				console.log('load', loader);
				console.log('resources', resources);
				// arrayLines.push(PIXI.loader.resources.line1);
				// arrayLines.push(PIXI.loader.resources.line2);
				// arrayLines.push(PIXI.loader.resources.line3);
				// arrayLines.push(PIXI.loader.resources.line4);
				// arrayLines.push(PIXI.loader.resources.line5);
				// arrayLines.push(PIXI.loader.resources.line6);
				// arrayLines.push(PIXI.loader.resources.line7);
				// arrayLines.push(PIXI.loader.resources.line8);
				// arrayLines.push(PIXI.loader.resources.line9);
				// arrayLines.push(PIXI.loader.resources.line10);
			});

		var test = 0;
		var percLoaded;

		PIXI.loader.onProgress.add(function(){
			test++;
			percLoaded = (test/filecounter*100);

			_lineLoader.querySelector('span').style.width = percLoaded + 'px';
		});

		var self = this;
		PIXI.loader.onComplete.add(function(){
			console.log('preloader 2 completed');
			preloader_2_completed = true;
			if (preloader_1_completed) {
				CrackedApp.showIntro();
			}
		});

	}


	this.initialize = function() {

		if ( document.querySelector('html').classList.contains('touchevents') )
			isTouch = true;
		else
			isTouch = false;

		if ( isTouch && screen.availWidth < 800) {
			//useSize = 'small';
			useSize = 'large';
		} else {
			useSize = 'large';
		}

		this.canvasWidth = sizesObj[useSize].width;
		this.canvasHeight = sizesObj[useSize].height;
		this.assetWidth = sizesObj[useSize].assetWidth;

		document.querySelector('canvas#mirror').width = this.canvasWidth;
		document.querySelector('canvas#mirror').height = this.canvasHeight;

		document.querySelector('canvas#portrait').height = this.canvasWidth;
		document.querySelector('canvas#portrait').width = this.canvasHeight;

		// $('canvas#mirror')
		//     .attr('width',this.canvasWidth)
		//     .attr('height',this.canvasHeight)

		// $('canvas#portrait')
		//     .attr('height',this.canvasWidth)
		//     .attr('width',this.canvasHeight)

		stage = new PIXI.Container();
		renderer = PIXI.autoDetectRenderer(this.canvasWidth, this.canvasHeight, { preserveDrawingBuffer:true });

		renderer.view.id = 'canvas';
		document.querySelector('.holder-main').appendChild(renderer.view);

		_canvas = document.querySelector('#canvas');
		_canvasPortrait = document.querySelector('#portrait');
		console.log(_canvas);

		attachEvents();

		this.layout();

		$(window).resize(function () {
			this.layout();
		}.bind(this));

		// input.focus(); //sets focus to element
		// var val = this.input.value; //store the value of the element
		// this.input.value = ''; //clear the value of the element
		// this.input.value = val; //set that value back.

		if ( !isTouch )
			_inputText.focus();

		this.preload();

	}

	this.initialize();
}


// Start preload
document.addEventListener("DOMContentLoaded", function() {
	window.CrackedApp = new CrackedApp();
});
