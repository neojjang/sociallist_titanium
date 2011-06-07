if(Ti.Platform.osname == 'android') {
  Ti.include('/javascript/application.js');
} else {
  Ti.include('../javascript/application.js');
}
var cc ={win:Ti.UI.currentWindow};
var tab = cc.win.tab;
var tabGroup = cc.win.tabGroup;

var image;

//(function(){
    //cc.win.backgroundImage = '../images/graph.png';
	
	cc.win.orientationModes = [
		Ti.UI.PORTRAIT,
		Ti.UI.UPSIDE_PORTRAIT
	];
	//Titanium.UI.orientation = Titanium.UI.PORTRAIT;
	
	cc.mainContainer = Ti.UI.createView({
		height:'auto',
		top:30,
		borderRadius:isAndroid() ? 10 : 5,		
		layout:'vertical',
		borderRadius:5		
	});
	cc.win.add(cc.mainContainer);
		
	cc.cameraContainer = Ti.UI.createView({
		borderRadius:isAndroid() ? 10 : 5,
		backgroundColor:'#52A829',
		height:70,
		left:40,
		right:40,
		top:25
	});

	cc.mainContainer.add(cc.cameraContainer);
	
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
	cc.mainContainer.add(cc.vwLine);
		
	cc.photoContainer = Ti.UI.createView({
		borderRadius:isAndroid() ? 10 : 5,
		backgroundColor:'#52A829',		
		height:70,
		left:40,
		right:40,
		top:20
	});
	
	cc.mainContainer.add(cc.photoContainer);

	cc.photolabel = Titanium.UI.createLabel({
		color:'#ffffff',
		text:'Photo Gallery',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		height:36,
		width:'auto'
	});	
	
	cc.photoContainer.add(cc.photolabel);
	
	cc.loginwin = Titanium.UI.createWindow({
		url: '../javascript/login.js',
		title: 'Login',
		backButtonTitle: null,
		barColor: useThisBarColor
	});
	//cc.loginwin.tab = tab;
	//cc.loginwin.tabGroup = tabGroup;		
		
//})();

cc.cameraContainer.addEventListener('click', function(){

	Titanium.Media.showCamera({
	
		success:function(event)
		{
			//var cropRect = event.cropRect;
			//image = event.media;
			//thumbnailImg = event.thumbnail;	
			//Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{				
				var uploadwin = Titanium.UI.createWindow({
					url:'../javascript/upload_photo.js',  
				    title:'Upload',
				    barColor:useThisBarColor,
				    backgroundColor:useThisBackgroundColor				
				});
				uploadwin.tab = tab;
				uploadwin.tabGroup = tabGroup;
								
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
									
				//Ti.UI.currentTab.open(uploadwin);
				tab.open(uploadwin);				
							
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
			Ti.API.debug('Our type was: '+event.mediaType);
			var targetjs;
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				targetjs = '../javascript/upload_photo.js';
			} else if (event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO) { 			
				targetjs = '../javascript/upload_video.js';
			} else {
				targetjs = '../javascript/upload_photo.js';	
			}							
			var uploadwin = Titanium.UI.createWindow({
				url:targetjs,  
			    title:'Upload',
			    barColor:useThisBarColor,
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
								
			//Ti.UI.currentTab.open(uploadwin);
			tab.open(uploadwin);						
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

if (!isLogin()) {
	Ti.API.info('not login');
	cc.loginwin.open();		
} else {
	Ti.API.info('login');
}