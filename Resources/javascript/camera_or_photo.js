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

var image;

(function(){
	cc.cameraContainer = Ti.UI.createView({
		borderRadius:isAndroid() ? 10 : 5,
		backgroundColor:'#52A829',
		height:70,
		left:20,
		right:20,
		top:25
	});

	body.add(cc.cameraContainer);
	
	cc.cameralabel = Titanium.UI.createLabel({
		color:'#ffffff',
		text:'Camera',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		height:36,
		width:'auto'
	});	
	
	cc.cameraContainer.add(cc.cameralabel);

	cc.vwLine = Ti.UI.createView({
		top:20,
		height:1,
		right:25,
		left:25,
		borderColor:'#999999'
	  });				
	body.add(cc.vwLine);
		
	cc.photoContainer = Ti.UI.createView({
		borderRadius:isAndroid() ? 10 : 5,
		backgroundColor:'#52A829',		
		height:70,
		left:20,
		right:20,
		top:20
	});
	
	body.add(cc.photoContainer);

	cc.photolabel = Titanium.UI.createLabel({
		color:'#ffffff',
		text:'Photo Gallery',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		height:36,
		width:'auto'
	});	
	
	cc.photoContainer.add(cc.photolabel);
		
})();

cc.cameraContainer.addEventListener('click', function(){

	Titanium.Media.showCamera({	
		success:function(event)
		{
			//var cropRect = event.cropRect;				
			//Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{				
				var uploadwin = Titanium.UI.createWindow({
					url:'upload_photo.js',  
				    title:'Upload',
				    backgroundColor:useThisBackgroundColor		
				});								
				var tmp_image = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpimg.jpg");
				tmp_image.write(event.media);
				
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
																	
				Ti.UI.currentTab.open(uploadwin);						
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

});

cc.photoContainer.addEventListener('click', function(){

	Titanium.Media.openPhotoGallery({
		success:function(event)
		{
			//thumbnailImg = event.thumbnail;
			Ti.API.debug('Our type was: '+event.mediaType);
			var targetjs;
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				targetjs = 'upload_photo.js';
			} else if (event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) { 			
				targetjs = 'upload_video.js';
			} else {
				targetjs = 'upload_photo.js';	
			}							
			var uploadwin = Titanium.UI.createWindow({
				url:targetjs,  
			    title:'Upload',
			    backgroundColor:useThisBackgroundColor			
			});
			var tmp_image;
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
			//tmp_thumbimage.write(event.thumbnail);
								
			Ti.UI.currentTab.open(uploadwin);						
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
