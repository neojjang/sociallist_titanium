if(Ti.Platform.osname == 'android') {
Ti.include('/javascript/application.js');
} else {
Ti.include("../javascript/application.js");
}
var cc ={win:Ti.UI.currentWindow};

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];

var alertDialog = Titanium.UI.createAlertDialog({
    title: 'System Message',
    buttonNames: ['OK']
});

cc.win.layout = 'vertical';

var body = Ti.UI.createView({
	top:0, 
	//height:500,
    height: Ti.Platform.displayCaps.platformHeight,
    width: Ti.Platform.displayCaps.platformWidth,	
	backgroundImage:'../images/graph.png', 
	layout:'vertical'	
});
cc.win.add(body);

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
body.add(header);

var firstview = Ti.UI.createView({
	top:0,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.25,
	width:Ti.Platform.displayCaps.platformWidth * 0.95,
	layout:'horizontal'
});

var feedview = Ti.UI.createView({
	top:0,
	left:Ti.Platform.displayCaps.platformWidth * 0.0208,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.225,
	width:Ti.Platform.displayCaps.platformWidth * 0.375,
	layout:'vertical'
});
var feedimage = Titanium.UI.createImageView({
    image:'../images/feed_dark.png',    
    height:Ti.Platform.displayCaps.platformHeight * 0.15,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,	
    top:Ti.Platform.displayCaps.platformHeight * 0.0125,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625
});
feedimage.addEventListener(
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
feedimage.addEventListener(
    'touchstart',
    function () {
		feedimage.image = '../images/feed.png';				         
    }
);
feedimage.addEventListener(
    'touchcancel',
    function () {
		feedimage.image = '../images/feed_dark.png';				         
    }
);
feedimage.addEventListener(
    'touchend',
    function () {
		feedimage.image = '../images/feed_dark.png';				         
    }
);
var feedlabel = Ti.UI.createLabel({
	text:'Feed',
	top:0,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,
	textAlign:'center',
	color:'#444444',
	font:{fontFamily:'Trebuchet MS',fontSize:20,fontWeight:'bold'}
});
feedlabel.addEventListener(
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
feedlabel.addEventListener(
    'touchstart',
    function () {
		feedlabel.color = '#BED120';				         
    }
);
feedlabel.addEventListener(
    'touchcancel',
    function () {
		feedlabel.color = '#444444';				         
    }
);
feedlabel.addEventListener(
    'touchend',
    function () {
		feedlabel.color = '#444444';				         
    }
);
feedview.add(feedimage);
feedview.add(feedlabel);
firstview.add(feedview);

var meview = Ti.UI.createView({
	top:0,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.225,
	width:Ti.Platform.displayCaps.platformWidth * 0.375,
	layout:'vertical'
});
var meimage = Titanium.UI.createImageView({
    image:'../images/me_dark.png',    
    height:Ti.Platform.displayCaps.platformHeight * 0.15,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,	
    top:Ti.Platform.displayCaps.platformHeight * 0.0125,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625
});
meimage.addEventListener(
    'click',
    function () {
		var mewin = Titanium.UI.createWindow({
			url:'me.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Me'
		});
		Ti.UI.currentTab.open(mewin, { animated : true});						         
    }
);
meimage.addEventListener(
    'touchstart',
    function () {
		meimage.image = '../images/me.png';				         
    }
);
meimage.addEventListener(
    'touchcancel',
    function () {
		meimage.image = '../images/me_dark.png';				         
    }
);
meimage.addEventListener(
    'touchend',
    function () {
		meimage.image = '../images/me_dark.png';				         
    }
);
var melabel = Ti.UI.createLabel({
	text:'Me',
	top:0,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,
	textAlign:'center',
	color:'#444444',
	font:{fontFamily:'Trebuchet MS',fontSize:20,fontWeight:'bold'}
});
melabel.addEventListener(
    'click',
    function () {
		var mewin = Titanium.UI.createWindow({
			url:'me.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Me'
		});
		Ti.UI.currentTab.open(mewin, { animated : true});						         
    }
);
melabel.addEventListener(
    'touchstart',
    function () {
		melabel.color = '#BED120';				         
    }
);
melabel.addEventListener(
    'touchcancel',
    function () {
		melabel.color = '#444444';				         
    }
);
melabel.addEventListener(
    'touchend',
    function () {
		melabel.color = '#444444';				         
    }
);
meview.add(meimage);
meview.add(melabel);
firstview.add(meview);

body.add(firstview);

var secondview = Ti.UI.createView({
	top:0,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.25,
	width:Ti.Platform.displayCaps.platformWidth * 0.95,
	layout:'horizontal'
});		

var cameraview = Ti.UI.createView({
	top:10,
	left:Ti.Platform.displayCaps.platformWidth * 0.0208,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.225,
	width:Ti.Platform.displayCaps.platformWidth * 0.375,
	layout:'vertical'
});
var cameraimage = Titanium.UI.createImageView({
    image:'../images/camera_dark.png',    
    height:Ti.Platform.displayCaps.platformHeight * 0.15,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,	
    top:Ti.Platform.displayCaps.platformHeight * 0.0125,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625
});
cameraimage.addEventListener(
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
cameraimage.addEventListener(
    'touchstart',
    function () {
		cameraimage.image = '../images/camera.png';				         
    }
);
cameraimage.addEventListener(
    'touchcancel',
    function () {
		cameraimage.image = '../images/camera_dark.png';				         
    }
);
cameraimage.addEventListener(
    'touchend',
    function () {
		cameraimage.image = '../images/camera_dark.png';				         
    }
);
var cameralabel = Ti.UI.createLabel({
	text:'Camera',
	top:0,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,
	textAlign:'center',
	color:'#444444',
	font:{fontFamily:'Trebuchet MS',fontSize:20,fontWeight:'bold'}
});
cameralabel.addEventListener(
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
cameralabel.addEventListener(
    'touchstart',
    function () {
		cameralabel.color = '#BED120';				         
    }
);
cameralabel.addEventListener(
    'touchcancel',
    function () {
		cameralabel.color = '#444444';				         
    }
);
cameralabel.addEventListener(
    'touchend',
    function () {
		cameralabel.color = '#444444';				         
    }
);
cameraview.add(cameraimage);
cameraview.add(cameralabel);
secondview.add(cameraview);

var peopleview = Ti.UI.createView({
	top:10,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.225,
	width:Ti.Platform.displayCaps.platformWidth * 0.375,
	layout:'vertical'
});
var peopleimage = Titanium.UI.createImageView({
    image:'../images/people_dark.png',    
    height:Ti.Platform.displayCaps.platformHeight * 0.15,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,	
    top:Ti.Platform.displayCaps.platformHeight * 0.0125,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625
});
peopleimage.addEventListener(
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
peopleimage.addEventListener(
    'touchstart',
    function () {
		peopleimage.image = '../images/people.png';				         
    }
);
peopleimage.addEventListener(
    'touchcancel',
    function () {
		peopleimage.image = '../images/people_dark.png';				         
    }
);
peopleimage.addEventListener(
    'touchend',
    function () {
		peopleimage.image = '../images/people_dark.png';				         
    }
);
var peoplelabel = Ti.UI.createLabel({
	text:'People',
	top:0,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,
	textAlign:'center',
	color:'#444444',
	font:{fontFamily:'Trebuchet MS',fontSize:20,fontWeight:'bold'}
});
peoplelabel.addEventListener(
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
peoplelabel.addEventListener(
    'touchstart',
    function () {
		peoplelabel.color = '#BED120';				         
    }
);
peoplelabel.addEventListener(
    'touchcancel',
    function () {
		peoplelabel.color = '#444444';				         
    }
);
peoplelabel.addEventListener(
    'touchend',
    function () {
		peoplelabel.color = '#444444';				         
    }
);
peopleview.add(peopleimage);
peopleview.add(peoplelabel);
secondview.add(peopleview);

body.add(secondview);

var thirdview = Ti.UI.createView({
	top:0,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.25,
	width:Ti.Platform.displayCaps.platformWidth * 0.95,
	layout:'horizontal'
});		

var settingsview = Ti.UI.createView({
	top:10,
	left:Ti.Platform.displayCaps.platformWidth * 0.0208,	 
	height:Ti.Platform.displayCaps.platformHeight * 0.225,
	width:Ti.Platform.displayCaps.platformWidth * 0.375,
	layout:'vertical'
});
var settingsimage = Titanium.UI.createImageView({
    image:'../images/settings_dark.png',    
    height:Ti.Platform.displayCaps.platformHeight * 0.15,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,	
    top:Ti.Platform.displayCaps.platformHeight * 0.0125,
	left:Ti.Platform.displayCaps.platformWidth * 0.0625
});
settingsimage.addEventListener(
    'click',
    function () {
		var settingswin = Titanium.UI.createWindow({
			url:'settings.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Settings'
		});
		Ti.UI.currentTab.open(settingswin, { animated : true});						         
    }
);
settingsimage.addEventListener(
    'touchstart',
    function () {
		settingsimage.image = '../images/settings.png';				         
    }
);
settingsimage.addEventListener(
    'touchcancel',
    function () {
		settingsimage.image = '../images/settings_dark.png';				         
    }
);
settingsimage.addEventListener(
    'touchend',
    function () {
		settingsimage.image = '../images/settings_dark.png';				         
    }
);
var settingslabel = Ti.UI.createLabel({
	text:'Settings',
	top:0,
	width:Ti.Platform.displayCaps.platformWidth * 0.25,
	textAlign:'center',
	color:'#444444',
	font:{fontFamily:'Trebuchet MS',fontSize:20,fontWeight:'bold'}
});
settingslabel.addEventListener(
    'click',
    function () {
		var settingswin = Titanium.UI.createWindow({
			url:'settings.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Settings'
		});
		Ti.UI.currentTab.open(settingswin, { animated : true});						         
    }
);
settingslabel.addEventListener(
    'touchstart',
    function () {
		settingslabel.color = '#BED120';				         
    }
);
settingslabel.addEventListener(
    'touchcancel',
    function () {
		settingslabel.color = '#444444';				         
    }
);
settingslabel.addEventListener(
    'touchend',
    function () {
		settingslabel.color = '#444444';				         
    }
);
settingsview.add(settingsimage);
settingsview.add(settingslabel);
thirdview.add(settingsview);

body.add(thirdview);
