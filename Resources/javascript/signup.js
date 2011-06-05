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

//function signUp(input_email, input_password, input_name, input_photo) {
function signUp(input_email, input_password, input_name) {	
	if(!Ti.Network.online){	  	
		noNetworkAlert();
	}
	
	progresslavel.text = 'Wait...';
	var xhr = Ti.Network.createHTTPClient();
	(function() {
		var deferred = new Deferred();
		xhr.onload = function()
		{		
		    var json = this.responseText;
		    var data = JSON.parse(json);
		    if (data.status == 'signed_up')
		    {	            
				var db = new SnapAmigoDB();
				db.deleteUser();
				db.addUser(data, input_password);
				Ti.App.Properties.setString('id', data.id);
	            Ti.App.Properties.setString('email', data.email);
	            Ti.App.Properties.setString('password', input_password);
	            Ti.App.Properties.setString('name', data.name);
	            Ti.App.Properties.setString('photo', data.photo);				
	            progresslavel.text = 'Signup Successful';
				deferred.call();
		    }
		    else
		    {			    
			    progresslavel.text = 'Signup Failed';    
		    }			
		};
		xhr.onerror = function()	
		{			
			progresslavel.text = 'Signup Failed';
		};		
		var url = 'https://snapamigo.com/users.json';
		xhr.onsendstream = function(e){
	      Ti.API.info(e.progress);
	    };			
		xhr.open('POST',url);
		postjson = {
			user: {
				email: input_email,
				password: input_password,
				password_confirmation: input_password,
				name: input_name
				//profile
			}			
		};
		xhr.setRequestHeader("Content-Type","application/json");		
		xhr.send(JSON.stringify(postjson));		
		return deferred;
	})().next(function(){				
        //var homewin = Titanium.UI.createWindow({
		//	url: '../tab/snaps.js',
		//	barColor: useThisBarColor,			
		//	backgroundColor: (Ti.Platform.osname == 'android') ? '#fff' : useThisBackgroundColor,
		//	backButtonTitle: null,
		//	title: 'Feed'
		//});
		//homewin.open();
		//Ti.UI.currentTab.open(camerawin);
		Titanium.UI.currentWindow.close();		
	});    
}

// BODY
var body = Ti.UI.createView({top:0, height: Ti.Platform.displayCaps.platformHeight, width: Ti.Platform.displayCaps.platformWidth, layout:'vertical', backgroundImage:'../images/graph.png'});

var nameview = Titanium.UI.createView({	
	top:0,
	height:Ti.Platform.displayCaps.platformHeight * 0.05,
	backgroundColor: '#555'
});

var namelabel = Titanium.UI.createLabel({
	text:'nickname',
	font:{fontSize:16},
	left:20,	
	color:'#ffffff'	
});
nameview.add(namelabel);
body.add(nameview);

var nametext = Ti.UI.createTextField(
    {
		hintText:'Enter your nickname',
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
body.add(nametext);

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

/*
var profileview = Titanium.UI.createView({	
	top:10,
	height:30,	
	backgroundColor: '#555'
});

var profilelabel = Titanium.UI.createLabel({
	text:'photo',
	font:{fontSize:16},
	left:20,	
	color:'#ffffff'	
});
profileview.add(profilelabel);
body.add(profileview);

var imageView = Ti.UI.createImageView({
    width: 40,
    height: 40,
    top: 10,
	left:20,
	image:'../images/avatar_medium.gif'
});
body.add(imageView);

var photoContainer = Ti.UI.createView({
	borderRadius:isAndroid() ? 10 : 5,
	backgroundColor:'#52A829',		
	height:50,
	left:80,
	right:20,
	top:-40
});

body.add(photoContainer);

photolabel = Titanium.UI.createLabel({
	color:'#ffffff',
	text:'Choose a Photo',
	font:{fontSize:17,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	height:20,
	width:'auto'
});	

photoContainer.add(photolabel);

photolabel.addEventListener(
    'touchstart',
    function () {
		photoContainer.backgroundColor = '#999999';				         
    }
);

photolabel.addEventListener(
    'touchcancel',
    function () {
		photoContainer.backgroundColor = '#52A829';				         
    }
);

photolabel.addEventListener(
    'touchend',
    function () {
		photoContainer.backgroundColor = '#52A829';				         
    }
);

*/
cc.win.add(body);

var progressview = Titanium.UI.createView({
	top: 20,
	height:Ti.Platform.displayCaps.platformHeight * 0.05,
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
	top:0,
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
	text:'Create',
	height:'auto',
	width:'auto',
	textAlign:'center'
});

submitView.add(submitLabel);

submitLabel.addEventListener(
    'click',
    function () {				
		//signUp(emailtext.value, passtext.value, nametext.value, imageView.image);
		signUp(emailtext.value, passtext.value, nametext.value);				         
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

//cc.win.add(footer);
body.add(footer);

/*
photoContainer.addEventListener('click', function(){

	Titanium.Media.openPhotoGallery({
		success:function(event)
		{
			Ti.API.debug('Our type was: '+event.mediaType);
			imageView.image = event.media;							
		},
		cancel:function()
		{
		},
		error:function(error)
		{
		},
		allowEditing:true
	});
	
});
*/
