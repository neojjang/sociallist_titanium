if(Ti.Platform.osname == 'android') {
Ti.include('javascript/application.js');
//Ti.include('lib/date_extensions.js');
//Ti.include('lib/jsdeferred.js');
} else {
Ti.include("./javascript/application.js");
//Ti.include('./lib/date_extensions.js');
//Ti.include('./lib/jsdeferred.js');
}

if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
    Ti.UI.iPhone.showStatusBar({'animated': false});
}

//if (!isLogin()) {
//		var welcomewin = Titanium.UI.createWindow({
//			url: 'javascript/welcome.js',
//			backgroundImage: 'images/background.png',
//			title: 'Welcome',
//			barColor: useThisBarColor
//		});
//		welcomewin.open();	
//}

var tabGroup = Titanium.UI.createTabGroup();

//Tab1(Feed)
var win1 = Titanium.UI.createWindow({
	url:'./tab/snaps.js',
	barColor:useThisBarColor,	
    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
	title:'Feed'
});
win1.addEventListener('click', function(e){
	win1.orientationModes = [
			Ti.UI.PORTRAIT,
			Ti.UI.UPSIDE_PORTRAIT
		]; 
});
var tab1 = Titanium.UI.createTab({  
    icon:'./images/feed.png',
	backgroundColor:'#000000',
    title:'Feed',
    window:win1
});
win1.tab = tab1;

//Tab2(Me)
var win2 = Titanium.UI.createWindow({
	url:'./tab/me.js',  
    title:'Me',
    backgroundColor:useThisBackgroundColor,
	barColor:useThisBarColor
});
win2.addEventListener('click', function(e){
	win1.orientationModes = [
			Ti.UI.PORTRAIT,
			Ti.UI.UPSIDE_PORTRAIT
		]; 
});
var tab2 = Titanium.UI.createTab({  
    icon:'./images/me.png',
	backgroundColor:'#000000',
    title:'Me',
    window:win2
});
win2.tab = tab2;

//Tab3(Camera)
var win3 = Titanium.UI.createWindow({
	url:'./tab/camera_or_photo.js',  
    title:'Camera',
    backgroundColor:useThisBackgroundColor,
	barColor:useThisBarColor
});
win3.addEventListener('click', function(e){
	win1.orientationModes = [
			Ti.UI.PORTRAIT,
			Ti.UI.UPSIDE_PORTRAIT
		]; 
});
var tab3 = Titanium.UI.createTab({  
    icon:'./images/camera.png',
	backgroundColor:'#000000',
    title:'Camera',
    window:win3
});
win3.tab = tab3;
win3.tabGroup = tabGroup;

//Tab4(People)
var win4 = Titanium.UI.createWindow({
	url:'./tab/people.js',  
    title:'People',
    backgroundColor:useThisBackgroundColor,
	barColor:useThisBarColor
});
win4.addEventListener('click', function(e){
	win1.orientationModes = [
			Ti.UI.PORTRAIT,
			Ti.UI.UPSIDE_PORTRAIT
		]; 
});
var tab4 = Titanium.UI.createTab({  
    icon:'./images/people.png',
	backgroundColor:'#000000',
    title:'People',
    window:win4
});
win4.tab = tab4;

//Tab5(Settings)
var win5 = Titanium.UI.createWindow({
	url:'./tab/settings.js',  
    title:'Settings',
    backgroundColor:useThisBackgroundColor,
	barColor:useThisBarColor
});
win5.addEventListener('click', function(e){
	win1.orientationModes = [
			Ti.UI.PORTRAIT,
			Ti.UI.UPSIDE_PORTRAIT
		]; 
});
var tab5 = Titanium.UI.createTab({  
    icon:'./images/settings.png',
	backgroundColor:'#000000',
    title:'Settings',
    window:win5
});
win5.tab = tab5;

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);  
tabGroup.open();

