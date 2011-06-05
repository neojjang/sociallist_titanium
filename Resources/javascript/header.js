var header = Ti.UI.createView({
	top:0, 
	height: Ti.Platform.displayCaps.platformHeight * 0.09,
	backgroundImage:'../images/header_gradient.png', 
	layout:'vertical'	
});
var naviview = Ti.UI.createView({
	top:0,
	left:0,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.07,
	width:Ti.Platform.displayCaps.platformWidth,
	layout:'horizontal'
});
var logoView = Titanium.UI.createImageView({
    image:'../images/whitelogo_20.png',    
    height:'auto',
	width:'auto',	
    top:Ti.Platform.displayCaps.platformHeight * 0.01875,
	left:Ti.Platform.displayCaps.platformWidth * 0.0208
});
logoView.addEventListener(
    'click',
    function () {
		var homewin = Titanium.UI.createWindow({
			url:'home.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Home'
		});
		Ti.UI.currentTab.open(homewin, { animated : true});						         
    }
);
var minicameralogo = Titanium.UI.createImageView({
    image:'../images/camera.png',    
    height:Ti.Platform.displayCaps.platformHeight * 0.0625,
	width:Ti.Platform.displayCaps.platformWidth * 0.1041,	
    top:Ti.Platform.displayCaps.platformHeight * 0.01875,
	left:Ti.Platform.displayCaps.platformWidth * 0.229
});
minicameralogo.addEventListener(
    'click',
    function () {
		var camerawin = Titanium.UI.createWindow({
			url:'camera_or_photo.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Camera'
		});
		Ti.UI.currentTab.open(camerawin, { animated : true});						         
    }
);
minicameralogo.addEventListener(
    'touchstart',
    function () {
		minicameralogo.image = '../images/camera_dark.png';				         
    }
);
minicameralogo.addEventListener(
    'touchcancel',
    function () {
		minicameralogo.image = '../images/camera.png';				         
    }
);
minicameralogo.addEventListener(
    'touchend',
    function () {
		minicameralogo.image = '../images/camera.png';				         
    }
);
var minifeedlogo = Titanium.UI.createImageView({
    image:'../images/feed.png',    
    height:Ti.Platform.displayCaps.platformHeight * 0.0625,
	width:Ti.Platform.displayCaps.platformWidth * 0.1041,	
    top:Ti.Platform.displayCaps.platformHeight * 0.01875,
	left:Ti.Platform.displayCaps.platformWidth * 0.05
});
minifeedlogo.addEventListener(
    'click',
    function () {
		var feedwin = Titanium.UI.createWindow({
			url:'snaps.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Feed'
		});
		Ti.UI.currentTab.open(feedwin, { animated : true});						         
    }
);
minifeedlogo.addEventListener(
    'touchstart',
    function () {
		minifeedlogo.image = '../images/feed_dark.png';				         
    }
);
minifeedlogo.addEventListener(
    'touchcancel',
    function () {
		minifeedlogo.image = '../images/feed.png';				         
    }
);
minifeedlogo.addEventListener(
    'touchend',
    function () {
		minifeedlogo.image = '../images/feed.png';				         
    }
);
var minipeoplelogo = Titanium.UI.createImageView({
    image:'../images/people.png',    
    height:Ti.Platform.displayCaps.platformHeight * 0.0625,
	width:Ti.Platform.displayCaps.platformWidth * 0.1041,
    top:Ti.Platform.displayCaps.platformHeight * 0.01875,
	left:Ti.Platform.displayCaps.platformWidth * 0.05
});
minipeoplelogo.addEventListener(
    'click',
    function () {
		var peoplewin = Titanium.UI.createWindow({
			url:'people.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'People'
		});
		Ti.UI.currentTab.open(peoplewin, { animated : true});						         
    }
);
minipeoplelogo.addEventListener(
    'touchstart',
    function () {
		minipeoplelogo.image = '../images/people_dark.png';				         
    }
);
minipeoplelogo.addEventListener(
    'touchcancel',
    function () {
		minipeoplelogo.image = '../images/people.png';				         
    }
);
minipeoplelogo.addEventListener(
    'touchend',
    function () {
		minipeoplelogo.image = '../images/people.png';				         
    }
);
var bar = Ti.UI.createView({
	top:Ti.Platform.displayCaps.platformHeight * 0.0125, 
	height:Ti.Platform.displayCaps.platformHeight * 0.05,	
	backgroundColor:'#F75342', 
	layout:'vertical'	
});
naviview.add(logoView);
naviview.add(minicameralogo);
naviview.add(minifeedlogo);
naviview.add(minipeoplelogo);
header.add(naviview);
header.add(bar);