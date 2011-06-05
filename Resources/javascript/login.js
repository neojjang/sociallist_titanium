if(Ti.Platform.osname == 'android') {
Ti.include('/javascript/application.js');
} else {
Ti.include("../javascript/application.js");
}
var cc ={win:Ti.UI.currentWindow};
//var tab = cc.win.tab;
//var tabGroup = cc.win.tabGroup;

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];

cc.win.layout = 'vertical';

function checkLogin(input_email, input_password) {
	if(!Ti.Network.online){	  	
		noNetworkAlert();
	}
	
	progresslavel.text = 'Checking...';
	var xhr = Ti.Network.createHTTPClient();
	(function() {
		var deferred = new Deferred();
		xhr.onload = function()
		{		
		    var json = this.responseText;
		    var data = JSON.parse(json);
		    if (data.status == 'signed_in')
		    {	           
				var db = new HanduplistDB();
				db.deleteUser();
				db.addUser(data, input_password);
				Ti.App.Properties.setString('id', data.id);
	            Ti.App.Properties.setString('email', data.email);
	            Ti.App.Properties.setString('password', input_password);
	            Ti.App.Properties.setString('name', data.name);
	            Ti.App.Properties.setString('photo', data.photo);				
	            progresslavel.text = 'Login Successful';
				deferred.call();
		    }
		    else
		    {	
			    Titanium.API.info("signin error");		    
			    progresslavel.text = 'Invalid Login';    
		    }			
		};
		xhr.onerror = function()	
		{	
		    Titanium.API.info("onerror");		
			progresslavel.text = 'Invalid Login';
		};		
		var url = 'https://handuplist.com/users/sign_in.json';
		xhr.onsendstream = function(e){
	      Ti.API.info(e.progress);
	    };			
		xhr.open('POST',url);
		postjson = {
			user: {
				email: input_email,
				password: input_password
			}
		};
		xhr.setRequestHeader("Content-Type","application/json");		
		xhr.send(JSON.stringify(postjson));
		return deferred;
	})().next(function(){
				
        //var camerawin = Titanium.UI.createWindow({
		//	url: '../tab/camera_or_photo.js',
		//	barColor: useThisBarColor,
		//	backgroundColor: (Ti.Platform.osname == 'android') ? '#fff' : useThisBackgroundColor,
		//	backButtonTitle: null,
		//	title: 'Camera'
		//});
		//camerawin.open();
		//Ti.UI.currentTab.open(camerawin);
		Titanium.UI.currentWindow.close();
		//tabGroup.setActiveTab(3);
						
	});    
}

// BODY
var body = Ti.UI.createView({top:0, height: Ti.Platform.displayCaps.platformHeight, width: Ti.Platform.displayCaps.platformWidth, layout:'vertical', backgroundImage:'../images/graph.png'});

var headerLabel = Ti.UI.createLabel({
	color:'#000',
	top:10, 
	left:20, 
	height:Ti.Platform.displayCaps.platformHeight * 0.1, 
	text:'Login',
	textAlign:'left', 
	font:{fontSize:22}
	});
body.add(headerLabel);

var emailview = Titanium.UI.createView({	
	top:10,
	height:Ti.Platform.displayCaps.platformHeight * 0.05,	
	backgroundColor: '#555'
});

var emaillabel = Titanium.UI.createLabel({
	text:'email',
	font:{fontSize:16},
	left:20,	
	color:'#ffffff'	
});
emailview.add(emaillabel);
body.add(emailview);

var emailtext = Ti.UI.createTextField(
    {
		hintText:'Enter your email address',        
        height:Ti.Platform.displayCaps.platformHeight * 0.1,
        width:Ti.Platform.displayCaps.platformWidth * 0.8,
        top:10,
        font:{fontSize:16},
		textAlign:'left',
        padding:20,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        suppressReturn:true 		        
    }
);
body.add(emailtext);

var passview = Titanium.UI.createView({	
	top:10,
	height:Ti.Platform.displayCaps.platformHeight * 0.05,	
	backgroundColor: '#555'
});

var passlabel = Titanium.UI.createLabel({
	text:'password',
	font:{fontSize:16},
	left:20,	
	color:'#ffffff'	
});
passview.add(passlabel);
body.add(passview);

var passtext = Ti.UI.createTextField(
    {
		hintText:'Enter your password',
        passwordMask:true,
        height:Ti.Platform.displayCaps.platformHeight * 0.1,
        width:Ti.Platform.displayCaps.platformWidth * 0.8,
        top:10,
        font:{fontSize:16},
		textAlign:'left',
        padding:20,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        suppressReturn:true		        
    }
);
body.add(passtext);

cc.win.add(body);

var progressview = Titanium.UI.createView({	
	height:Ti.Platform.displayCaps.platformHeight * 0.05,
	top: 30,
	//bottom:220,
	backgroundColor: '#111111'
});
var progresslavel = Titanium.UI.createLabel({
	font:{fontSize:15},
	left:20,
	color:'#ffffff'
});
progressview.add(progresslavel);
//cc.win.add(progressview);
body.add(progressview);

var footer = Ti.UI.createView({
	//bottom:0,
	top: 0,
	height:Ti.Platform.displayCaps.platformHeight * 0.2
	//backgroundColor:'#cccccc'
	});

var submitView = Titanium.UI.createView({
	top:10,
	backgroundColor:'#52A829',
	height:Ti.Platform.displayCaps.platformHeight * 0.08,
	width:Ti.Platform.displayCaps.platformWidth * 0.5,
	left:40,
	right:40,
	borderRadius:10
});

var submitLabel = Titanium.UI.createLabel({
	font:{fontSize:18},
	color:'#fff',
	text:'Submit',
	height:'auto',
	width:'auto',
	textAlign:'center'
});

submitView.add(submitLabel);

submitLabel.addEventListener(
    'click',
    function () {			
		checkLogin(emailtext.value, passtext.value);				         
    }
);

submitLabel.addEventListener(
    'touchstart',
    function () {
		submitView.backgroundColor = '#999999';				         
    }
);

submitLabel.addEventListener(
    'touchcancel',
    function () {
		submitView.backgroundColor = '#52A829';				         
    }
);

submitLabel.addEventListener(
    'touchend',
    function () {
		submitView.backgroundColor = '#52A829';				         
    }
);

footer.add(submitView);

/*
var forgetpassView = Titanium.UI.createView({	
	top:20,
	//bottom:'auto',
	backgroundColor:'#999',
	height:Ti.Platform.displayCaps.platformHeight * 0.08,
	width:Ti.Platform.displayCaps.platformWidth * 0.5,	
	left:40,
	right:40,
	borderRadius:10
});

var forgetpassLabel = Titanium.UI.createLabel({
	font:{fontSize:18},
	color:'#fff',
	text:'I forgot my password',
	height:'auto',
	width:'auto',
	textAlign:'center'
});

forgetpassView.add(forgetpassLabel);

forgetpassLabel.addEventListener(
    'click',
    function () {       
		//Are you Sure? yes or no
		var homewin = Titanium.UI.createWindow({
			url:'snaps.js',
			barColor:useThisBarColor,			
		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
			title:'Feed'
		});
		Ti.UI.currentTab.open(homewin, { animated : true});         
    }
);

forgetpassLabel.addEventListener(
    'touchstart',
    function () {
		forgetpassView.backgroundColor = '#000000';				         
    }
);

forgetpassLabel.addEventListener(
    'touchcancel',
    function () {
		forgetpassView.backgroundColor = '#999999';				         
    }
);

forgetpassLabel.addEventListener(
    'touchend',
    function () {
		forgetpassView.backgroundColor = '#999999';				         
    }
);

footer.add(forgetpassView);
*/

body.add(footer);
