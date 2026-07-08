// scaleBrowser
function scaleBrowser(){
	window.moveTo(0,0);
	var aH = screen.availHeight;
	var aW = screen.availWidth;
	//alert ("availWidth = "+aW+" availHeight =  "+ aH);
	window.resizeTo(aW,aH);

}
//window.onResize = scaleBrowser;
//window.onLoad = scaleBrowser;