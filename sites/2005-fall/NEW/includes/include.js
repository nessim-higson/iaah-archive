<!--
// Author: Genex: Brian Deaton

function BrowserCheck() {
	var b = navigator.appName;
	if (b=="Netscape") this.b = "ns";
	else if (b=="Microsoft Internet Explorer") this.b = "ie";
	else this.b = b;
	this.version = navigator.appVersion;
	this.v = parseInt(this.version);
	this.ns = (this.b=="ns" && this.v>=4);
	this.ns4 = (this.b=="ns" && this.v==4);
	this.ns5 = (this.b=="ns" && this.v==5);
	this.ie = (this.b=="ie" && this.v>=4)
	this.ie4 = (this.version.indexOf('MSIE 4')>0);
	this.ie5 = (this.version.indexOf('MSIE 5')>0);
	this.min = (this.ns||this.ie);
	this.pc = (this.version.indexOf('Win')>0);
	this.mac = (this.version.indexOf('PPC')>0);
	this.ns408=(parseFloat(this.version)==4.08);
}

var is = new BrowserCheck();

if (navigator.appName=="Netscape" && parseInt(navigator.appVersion)==4) {
	widthCheck = window.innerWidth;
	heightCheck = window.innerHeight;
	window.onResize = resizeFix;
}

function popWindow(urlVal,windowName,widthVal,heightVal) {
	var paraString;
	var wt;
	var ht;
	// Bug fix: we are now blanking the windowName variable
	windowName == "";
	wt = widthVal;
	ht = heightVal;

	var winl = (screen.width - wt) / 2;
	var wint = (screen.height - ht) / 2;
	if (is.pc){wint = wint - 25};

	paraString = "width=" + wt + ",height=" + ht + ",top=" + wint + ",left=" + winl;

	paraString = paraString + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0";

	if(is.ie && is.pc) {
		if(typeof(poppedWindow) == "object") {
			poppedWindow.close();
			if(is.ie4) {
				poppedWindow = window.open(urlVal,windowName,paraString);
			}
		}
	}
	poppedWindow = window.open(urlVal,windowName,paraString);
	poppedWindow.focus();
}

function popPoster(urlVal,windowName,widthVal,heightVal) {
	var paraString;
	var wt;
	var ht;
	// Bug fix: we are now blanking the windowName variable
	windowName == "";
	wt = widthVal;
	ht = heightVal;

	var winl = (screen.width - wt) / 2;
	var wint = (screen.height - ht) / 2;
	if (is.pc){wint = wint - 25};

	paraString = "width=" + wt + ",height=" + ht + ",top=" + wint + ",left=" + winl;

	paraString = paraString + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0";

	if(is.ie && is.pc) {
		if(typeof(poppedWindow) == "object") {
			poppedWindow.close();
			if(is.ie4) {
				poppedWindow = window.open(urlVal,windowName,paraString);
			}
		}
	}
	poppedWindow = window.open(urlVal,windowName,paraString);
	poppedWindow.focus();
}


function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

var isInternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
// Handle all the FSCommand messages in a Flash movie.
function beyondtheSeaSplash_DoFSCommand(command, args) {
	var beyondtheSeaSplashObj = isInternetExplorer ? document.all.beyondtheSeaSplash : document.beyondtheSeaSplash;
	//
	// Place your code here.
	//
}

// Hook for Internet Explorer.
if (navigator.appName && navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Windows") != -1 && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	document.write('<script language=\"VBScript\"\>\n');
	document.write('On Error Resume Next\n');
	document.write('Sub beyondtheSeaSplash_FSCommand(ByVal command, ByVal args)\n');
	document.write('	Call beyondtheSeaSplash_DoFSCommand(command, args)\n');
	document.write('End Sub\n');
	document.write('</script\>\n');
}

function swap(id)	{
	if ((id == 'trailer') ||(id == 'synopsis') ||(id == 'gallery'))	{
		document.images.leftNavMenu.src = 'images/menu_' + id + '-on.jpg';
	}
	else if ((id == 'blog') ||(id == 'message') ||(id == 'register'))	{
		document.images.rightNavMenu.src = 'images/menu_' + id + '-on.jpg';
	}
}
function turnOff(id)	{
	if (id == 'left')	{
		document.images.leftNavMenu.src = 'images/leftmenu-off.jpg';
	}
	else if (id == 'right')	{
		document.images.rightNavMenu.src = 'images/rightmenu-off.jpg';
	}
}

function rollOver(imgname, page)
	{
		document.images[imgname].src = "images/" + page + "/" + imgname + "-on.jpg";
	}
function rollOut(imgname, page)
	{
		document.images[imgname].src = "images/" + page + "/" + imgname + "-off.jpg";
	}

function openSite(urlVal, windowName, widthVal, heightVal) {
	var paraString;
	var wt;
	var ht;
	var scrollbars = 0;
	// Bug fix: we are now blanking the windowName variable
	windowName == "";
	wt = widthVal;
	ht = heightVal;

	var winl = 0;
	var wint = 0;

	var sAlert;
	
	sAlert = "screen.availWidth: " + screen.availWidth + "\n"
	sAlert = sAlert + "screen.availHeight: " + screen.availHeight + "\n"
//	alert(sAlert);
	wt = screen.availWidth;
	ht = screen.availHeight;

	if (is.pc)	{
	ht = ht - 36;
	wt = wt - 10;
	}

	if (widthVal > screen.availWidth || heightVal > screen.availHeight)	{
		scrollbars = 1;
	}
	paraString = "width=" + wt + ",height=" + ht + ",top=" + wint + ",left=" + winl;
	paraString = paraString + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=" + scrollbars + ",resizable=0";

	if(is.ie && is.pc) {
		if(typeof(poppedWindow) == "object") {
			poppedWindow.close();
			if(is.ie4) {
				poppedWindow = window.open(urlVal,windowName,paraString);
			}
		}
	}
	poppedWindow = window.open(urlVal,windowName,paraString);
	poppedWindow.focus();
}

	
function openWallpaper(filename, imgWidth, imgHeight) {
	var paraString;
	var winWidth;
	var winHeight;
	var imgWidth;
	var imgHeight;
	var scrollwidth;
	var scrollheight;
	var scroll = 0;
	var resize = 0;
	var screenWidth = screen.width;
	var screenHeight = screen.height;
	var imgPadding = 150;
	scrollwidth = 16;
	scrollheight = 16;
	imgWidth = imgWidth;
	imgHeight = imgHeight;

	
	
	if (imgWidth > (screenWidth - imgPadding))	{
//		alert((screenWidth - imgPadding) + scrollwidth);
		winWidth = (screenWidth - imgPadding) + scrollwidth;
		scroll = 1;
		resize = 1;
		}
	else	{
	winWidth = imgWidth;
	}
	
	if (imgHeight > (screenHeight - imgPadding))	{
//		alert((screenHeight - imgPadding) + scrollheight);
		winHeight= (screenHeight - imgPadding) + scrollheight;
		scroll = 1;
		resize = 1;
		}
	else	{
	winHeight= imgHeight + 88;
	}
	
	var winLeftPos = (screenWidth - winWidth) / 2;
	var winTopPos = (screenHeight - winHeight) / 2;
	if (is.pc){winTopPos = (winTopPos - 50)};
	
	paraString = "width=" + winWidth + ",height=" + winHeight + ",top=" + winTopPos + ",left=" + winLeftPos;
	paraString = paraString + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=" + scroll + ",resizable=" + resize;

	poppedWindow = window.open("","wallpaper",paraString);
	
	poppedWindow.document.write('<html><head><title>Waiting: Wallpaper</title></head><body bgcolor="#FFFFFF" leftmargin="0px" rightmargin="0px" topmargin="0px" marginwidth="0px" marginheight="0px"><img src="../images/wallpaperInstructions.jpg"><br><a href="#" onClick="top.close();"><img src="../images/downloads/wallpapers/' + filename + '_' + imgWidth + '.jpg" width="' + imgWidth + '" height="' + imgHeight + '" border="0"></a></body></html>')

	poppedWindow.focus();
}

-->