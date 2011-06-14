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
var tmp_image;
var imageView;

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];

cc.win.layout = 'vertical';

cc.loginwin = Titanium.UI.createWindow({
	url: '../javascript/login.js',
	title: 'Login',
	backButtonTitle: null,
	barColor: useThisBarColor
});

var optionsDialogOpts = {
	options:['Take with Camera', 'Choose from Library', 'Cancel'],
	destructive:1,
	cancel:2
	//title:'I am a title'
};

if (isAndroid) {
	optionsDialogOpts.selectedIndex = 3;
}

var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);

dialog.addEventListener('click',function(e){
    if(e.index == 0){
		Titanium.Media.showCamera({	
			success:function(event)
			{
				//var cropRect = event.cropRect;				
				//Ti.API.debug('Our type was: '+event.mediaType);
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
				{				
					//var uploadwin = Titanium.UI.createWindow({
					//	url:'upload_photo.js',  
					//    title:'Upload',
					//    backgroundColor:useThisBackgroundColor		
					//});											
					tmp_image = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpimg.jpg");
					tmp_image.write(event.media);
					imageView.image = tmp_image.read();

				    //var instream = Titanium.Stream.createStream({
				    //  mode: Titanium.Stream.MODE_READ,
				    //  source: event.media
				    //});	    
				    //var f = 
				    //  Titanium.Filesystem.getFile(
				    //      Titanium.Filesystem.applicationDataDirectory, "tmpimg.jpg");
				    //var outstream = f.open(Titanium.Filesystem.MODE_WRITE);	    
				    //var buffer = Ti.createBuffer({length: 1024});	    
				    //var read_bytes = 0;
				    //while ((read_bytes = instream.read(buffer)) > 0) {
				    //  outstream.write(buffer, 0, read_bytes);
				    //}	    
				    //instream.close();
				    //outstream.close();				

					//Ti.UI.currentTab.open(uploadwin);						
				}
				else
				{
					alert("got the wrong type back ="+event.mediaType);
				}
			},
			cancel:function()
			{		
			},
			error:function(error)
			{
				// create alert
				var a = Titanium.UI.createAlertDialog({title:'Camera'});

				// set message
				if (error.code == Titanium.Media.NO_CAMERA)
				{
					a.setMessage('Please run this test on device');
				}
				else
				{
					a.setMessage('Unexpected error: ' + error.code);
				}

				// show alert
				a.show();
			},	
			saveToPhotoGallery:true,
			allowEditing:true,
			mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO
		});
    }
    else if(e.index == 1){
		Titanium.Media.openPhotoGallery({
			success:function(event)
			{
				//thumbnailImg = event.thumbnail;
				//Ti.API.debug('Our type was: '+event.mediaType);
				//var targetjs;
				//if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//	targetjs = 'upload_photo.js';
				//} else if (event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) { 			
				//	targetjs = 'upload_video.js';
				//} else {
				//	targetjs = 'upload_photo.js';	
				//}							
				//var uploadwin = Titanium.UI.createWindow({
				//	url:targetjs,  
				//    title:'Upload',
				//    backgroundColor:useThisBackgroundColor			
				//});
				//var tmp_image;
				//var tmp_thumbimage;
				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					tmp_image = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpimg.jpg");
					//tmp_thumbimage = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpthumbimg");
				} else if (event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) {
					tmp_image = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpimg.mpeg");
					//tmp_thumbimage = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpthumbimg");
				} else {
					tmp_image = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpimg.jpg");
					//tmp_thumbimage = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpthumbimg");
				}
				tmp_image.write(event.media);
				imageView.image = tmp_image.read();
				//tmp_thumbimage.write(event.thumbnail);

				//Ti.UI.currentTab.open(uploadwin);						
			},
			cancel:function()
			{
			},
			error:function(error)
			{
			},
			allowEditing:true
		});
    }
    else if(e.index == 2){
		//Ti.App.fireEvent('hide_indicator',{});
		//Titanium.UI.currentWindow.close();
		Titanium.UI.currentTab.close();
		imageView.image = nil;
		dialog = nil;
		tabGroup.setActiveTab(0);
		Ti.App.fireEvent('snaps_loadFeed',{});
    }
});

dialog.show();

var lat;
var lng;
if(Titanium.Geolocation.locationServicesEnabled){
	Titanium.Geolocation.getCurrentPosition(function(e){    
	    if(!e.success || e.error){
	        Ti.API.error(e.error);
	        return;
	    }
	    var coords = e.coords;
		lat = e.coords.latitude;
	    lng = e.coords.longitude;				
	});
}

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
			lat:lat,
			lng:lng,  
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
		Ti.App.fireEvent('hide_indicator',{});
		//Titanium.UI.currentWindow.close();
		Titanium.UI.currentTab.close();
		imageView.image = nil;
		dialog = nil;
		tabGroup.setActiveTab(0);
		Ti.App.fireEvent('snaps_loadFeed',{});
				
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
	font:{fontSize:15},
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
        font:{fontSize:16},
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
	top:10,
	height:Ti.Platform.displayCaps.platformHeight * 0.05,
	backgroundColor: '#555'
});

var pricelabel = Titanium.UI.createLabel({
	text:'Price',
	font:{fontSize:15},
	left:20,	
	color:'#ffffff'	
});
priceview.add(pricelabel);
body.add(priceview);

var pricetext = Ti.UI.createTextField(
    {
		hintText:'Enter price',
        height:Ti.Platform.displayCaps.platformHeight * 0.08,
        width:Ti.Platform.displayCaps.platformWidth * 0.8,
        top:10,
        font:{fontSize:16},
		textAlign:'left',
        padding:20,
        keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        suppressReturn:true		        
    }
);
body.add(pricetext);

tmp_image = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpimg.jpg");
//var tmp_thumbimage = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpthumbimg");

imageView = Ti.UI.createImageView({
    borderRadius:isAndroid() ? 10 : 5,
    width: 50,
    height: 50,
    top: 10
    //,
	//image:tmp_image.read()
	//image:thumbnailImg
});
body.add(imageView);

var progressview = Titanium.UI.createView({
	top: 10,
	height:Ti.Platform.displayCaps.platformHeight * 0.03,
	width:Ti.Platform.displayCaps.platformWidth,
	//bottom:90,	
	backgroundColor: '#111111'
});
var progresslavel = Titanium.UI.createLabel({
	font:{fontSize:13},
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
        left:30,
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
                //var homewin = Titanium.UI.createWindow({
                //        url:'../tab/snaps.js',
                //        barColor:useThisBarColor,
                //    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
                //        title:'Feed'
                //});
                //Ti.UI.currentTab.open(homewin, { animated : true});

				Ti.App.fireEvent('hide_indicator',{});
				Titanium.UI.currentWindow.close();
				tabGroup.setActiveTab(0);
				Ti.App.fireEvent('snaps_loadFeed',{});
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
	left:30,
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

if (!isLogin()) {
	Ti.API.info('not login');
	cc.loginwin.open();		
} else {
	Ti.API.info('login');
}
