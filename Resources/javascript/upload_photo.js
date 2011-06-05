if(Ti.Platform.osname == 'android') {
Ti.include('/javascript/application.js');
Ti.include('/lib/jsdeferred.js');
} else {
Ti.include("../javascript/application.js");
Ti.include("../lib/jsdeferred.js");
}
var cc ={win:Ti.UI.currentWindow};
Deferred.define();
var image;
var tmp_file;
var tab = cc.win.tab;
var tabGroup = cc.win.tabGroup;

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];

cc.win.layout = 'vertical';

function uploadToServer(image) {
	
	if(!Ti.Network.online){	  	
		noNetworkAlert();
	}
		
	progresslavel.text = 'Uploding...';
	Ti.App.fireEvent('show_indicator',{title:'Uploding...'});
	
	var xhr = Ti.Network.createHTTPClient();
	(function() {
		var deferred = new Deferred();
		xhr.onload = function()
		{		
		    var json = this.responseText;
		    var data = JSON.parse(json);
		    if (data.status == 200)
		    {
	            //Titanium.API.info(data.response);
	            //progresslavel.text = 'Done';
		    }
		    else
		    {
			    //Titanium.API.info(data.response);
			    //progresslavel.text = 'Error';
				Ti.App.fireEvent('hide_indicator',{});    
		    }
			deferred.call();
		};
		xhr.onerror = function()	
		{
			var json = this.responseText;
		    var data = JSON.parse(json);
			progresslavel.text = 'Error';
			Ti.App.fireEvent('hide_indicator',{});
		};		
		var url = 'https://handuplist.com/upload.json';
		xhr.onsendstream = function(e){
	      Ti.API.info(e.progress);
	    };			
		xhr.open('POST',url);
		
		Ti.API.info(textArea.value);
		Ti.API.info(pricetext.value);
			
		xhr.send({
			photo:image, 
			title:textArea.value, 
			price:pricetext.value, 
			email:Ti.App.Properties.getString('email'),
		    password:Ti.App.Properties.getString('password')
		});
		return deferred;
	})().next(function(){
		
		//Ti.App.fireEvent('hide_indicator',{});		
        //var homewin = Titanium.UI.createWindow({
		//	url: 'main.js',
		//	barColor: useThisBarColor,
		//	backgroundColor: (Ti.Platform.osname == 'android') ? '#fff' : useThisBackgroundColor,
		//	backButtonTitle: null,
		//	title: 'Feed'
		//});
		//homewin.open();
		Titanium.UI.currentWindow.close();
		tabGroup.setActiveTab(0);
				
	});    
}

// BODY
var body = Ti.UI.createView({top:0, height: Ti.Platform.displayCaps.platformHeight, width: Ti.Platform.displayCaps.platformWidth, layout:'vertical', backgroundColor:useThisBackgroundColor});
cc.win.add(body);

var headerLabel = Ti.UI.createLabel({
	color:'#000', 
	top:10, 
	left:20, 
	height:Ti.Platform.displayCaps.platformHeight * 0.07, 
	width:Ti.Platform.displayCaps.platformWidth, 
	text:'Photo Info',
	textAlign:'left', 
	font:{fontSize:22}
	});
body.add(headerLabel);

var titleview = Titanium.UI.createView({	
	top:10,
	height:Ti.Platform.displayCaps.platformHeight * 0.05,
	width:Ti.Platform.displayCaps.platformWidth,
	backgroundColor: '#555'
});

var titlelabel = Titanium.UI.createLabel({
	text:'Photo Title',
	font:{fontSize:16},
	left:20,
	width:Ti.Platform.displayCaps.platformWidth,	
	color:'#ffffff'	
});
titleview.add(titlelabel);
body.add(titleview);

var textArea = Ti.UI.createTextField(
    {
		hintText:'Title your photo',
        height:Ti.Platform.displayCaps.platformHeight * 0.08,
        width:Ti.Platform.displayCaps.platformWidth * 0.8,
        top:10,
		left:40,
		right:40,
        font:{fontSize:17},
		textAlign:'left',
        padding:20,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        suppressReturn:true		        
    }
);
body.add(textArea);

var priceview = Titanium.UI.createView({	
	top:0,
	height:Ti.Platform.displayCaps.platformHeight * 0.05,
	backgroundColor: '#555'
});

var pricelabel = Titanium.UI.createLabel({
	text:'price',
	font:{fontSize:16},
	left:20,	
	color:'#ffffff'	
});
priceview.add(pricelabel);
body.add(priceview);

var pricetext = Ti.UI.createTextField(
    {
		hintText:'Enter price',
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
body.add(pricetext);

var tmp_image = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpimg.jpg");
//var tmp_thumbimage = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpthumbimg");

var imageView = Ti.UI.createImageView({
    borderRadius:isAndroid() ? 10 : 5,
    width: 50,
    height: 50,
    top: 10,
	image:tmp_image.read()
	//image:thumbnailImg
});
body.add(imageView);

var progressview = Titanium.UI.createView({
	top: 30,
	height:Ti.Platform.displayCaps.platformHeight * 0.05,
	width:Ti.Platform.displayCaps.platformWidth,
	//bottom:90,	
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
	top:0,
	height: 'auto',
	width:Ti.Platform.displayCaps.platformWidth,
        layout:'horizontal'
	//backgroundColor:'#cccccc'
	});

var cancelView = Titanium.UI.createView({
        top:10,
        backgroundColor:'#999',
        height:Ti.Platform.displayCaps.platformHeight * 0.1,
        width:Ti.Platform.displayCaps.platformWidth * 0.35,
        left:20,
        borderRadius:10
});

var cancelLabel = Titanium.UI.createLabel({
        font:{fontSize:18},
        color:'#fff',
        text:'Cancel',
        height:'auto',
        width:'auto',
        textAlign:'center'
});

cancelView.add(cancelLabel);

cancelLabel.addEventListener(
    'click',
    function () {
                //Are you Sure? yes or no
                var homewin = Titanium.UI.createWindow({
                        url:'../tab/snaps.js',
                        barColor:useThisBarColor,
                    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
                        title:'Feed'
                });
                Ti.UI.currentTab.open(homewin, { animated : true});
    }
);

cancelLabel.addEventListener(
    'touchstart',
    function () {
                cancelView.backgroundColor = '#000000';
    }
);

cancelLabel.addEventListener(
    'touchcancel',
    function () {
                cancelView.backgroundColor = '#999999';
    }
);

cancelLabel.addEventListener(
    'touchend',
    function () {
                cancelView.backgroundColor = '#999999';
    }
);

footer.add(cancelView);

var doneView = Titanium.UI.createView({
	top:10,
	backgroundColor:'#52A829',
	height:Ti.Platform.displayCaps.platformHeight * 0.1,
	width:Ti.Platform.displayCaps.platformWidth * 0.35,
	right:20,
	borderRadius:10
});

var doneLabel = Titanium.UI.createLabel({
	font:{fontSize:18},
	color:'#fff',
	text:'Done!',
	height:'auto',
	width:'auto',
	textAlign:'center'
});

doneView.add(doneLabel);

doneLabel.addEventListener(
    'click',
    function () {		
		uploadToServer(tmp_image.read());				         
    }
);

doneLabel.addEventListener(
    'touchstart',
    function () {
		doneView.backgroundColor = '#999999';				         
    }
);

doneLabel.addEventListener(
    'touchcancel',
    function () {
		doneView.backgroundColor = '#52A829';				         
    }
);

doneLabel.addEventListener(
    'touchend',
    function () {
		doneView.backgroundColor = '#52A829';				         
    }
);

footer.add(doneView);

//cc.win.add(footer);
body.add(footer);
