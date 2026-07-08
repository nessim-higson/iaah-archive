function WinPop(file,name,w,h,m,s,t,r){
	
	LPos = (screen.width) ? (screen.width-w)/2 : 0;
	TPos = (screen.height) ? (screen.height-h)/2 : 0;
	options = "width=" + w + ",height=" + h + ",top=" +TPos + " ,left=" + LPos + ",menubar=" + m + ",scrollbars=" + s + ",toolbar=" + t + ",resizable=" + r;
	PopWallpaper = window.open(file,name,options);
	PopWallpaper.focus();
			
}