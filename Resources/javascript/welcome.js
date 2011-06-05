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

cc.win.layout = 'vertical';

// BODY
var body = Ti.UI.createView({
	top:0, 
	//height:400,
	height: Ti.Platform.displayCaps.platformHeight,
    width: Ti.Platform.displayCaps.platformWidth, 
	layout:'vertical'	
});

cc.win.add(body);

var footer = Ti.UI.createView({
	bottom:0,
    top: Ti.Platform.displayCaps.platformHeight * 0.6,
	height:Ti.Platform.displayCaps.platformHeight * 0.15
	});

var loginView = Titanium.UI.createView({	
	top:10,
	backgroundColor:'#999',
	height:Ti.Platform.displayCaps.platformHeight * 0.1,
	width:Ti.Platform.displayCaps.platformWidth * 0.35,
	left:20,
	borderRadius:10
});

var loginLabel = Titanium.UI.createLabel({
	font:{fontSize:16},
	color:'#fff',
	text:'Log In',
	height:'auto',
	width:'auto',
	textAlign:'center'
});

loginView.add(loginLabel);

loginLabel.addEventListener(
    'click',
    function () {       
		//Are you Sure? yes or no
		var loginwin = Titanium.UI.createWindow({
			url:'login.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Login'
		});
		loginwin.open();         
    }
);

loginLabel.addEventListener(
    'touchstart',
    function () {
		loginView.backgroundColor = '#000000';				         
    }
);

loginLabel.addEventListener(
    'touchcancel',
    function () {
		loginView.backgroundColor = '#999999';				         
    }
);

loginLabel.addEventListener(
    'touchend',
    function () {
		loginView.backgroundColor = '#999999';				         
    }
);

footer.add(loginView);
//body.add(loginView);

var signupView = Titanium.UI.createView({
	top:10,
	backgroundColor:'#52A829',
	height:Ti.Platform.displayCaps.platformHeight * 0.1,
	width:Ti.Platform.displayCaps.platformWidth * 0.35,
	right:20,
	borderRadius:10
});

var signupLabel = Titanium.UI.createLabel({
	font:{fontSize:16},
	color:'#fff',
	text:'Sign Up',
	height:'auto',
	width:'auto',
	textAlign:'center'
});

signupView.add(signupLabel);

signupLabel.addEventListener(
    'click',
    function () {
		var signupwin = Titanium.UI.createWindow({
			url:'signup.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Signup'
		});
		signupwin.open();						         
    }
);

signupLabel.addEventListener(
    'touchstart',
    function () {
		signupView.backgroundColor = '#999999';				         
    }
);

signupLabel.addEventListener(
    'touchcancel',
    function () {
		signupView.backgroundColor = '#52A829';				         
    }
);

signupLabel.addEventListener(
    'touchend',
    function () {
		signupView.backgroundColor = '#52A829';				         
    }
);

footer.add(signupView);
//body.add(signupView);

//cc.win.add(footer);
body.add(footer);
