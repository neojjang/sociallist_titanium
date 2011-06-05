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

//Profile
var profilelabel = Titanium.UI.createLabel({
	color:'#999',
	text:'Profile',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	width:'auto',
	height:30,
	top:10,
	left:20
});
body.add(profilelabel);

var profiletableData=[];
cc.editrow = Ti.UI.createTableViewRow({
    title: 'Edit Profile',
	color: '#666666'
});
profiletableData[0] = cc.editrow;
cc.profiletable = Titanium.UI.createTableView({
	data: profiletableData,
	borderWidth:1,
	top:10,
	left:20
});
body.add(cc.profiletable);

//Misc
var misclabel = Titanium.UI.createLabel({
	color:'#999',
	text:'Misc',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	width:'auto',
	height:30,
	top:10,
	left:20
});
body.add(misclabel);

var misctableData=[];
cc.logoutrow = Ti.UI.createTableViewRow({
    title: 'Logout',
	color: '#666666'
});
cc.aboutrow = Ti.UI.createTableViewRow({
    title: 'About',
	color: '#666666'
});
misctableData[0] = cc.aboutrow;
misctableData[1] = cc.logoutrow;
cc.misctable = Titanium.UI.createTableView({
	data: misctableData,
	borderWidth:1,
	top:10,
	left:20
});
body.add(cc.misctable);

cc.editrow.addEventListener('click', function (e) {
});

cc.aboutrow.addEventListener('click', function (e) {
});

cc.logoutrow.addEventListener('click', function (e) {
});
