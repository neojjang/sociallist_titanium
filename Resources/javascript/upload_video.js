if(Ti.Platform.osname == 'android') {
Ti.include('/javascript/application.js');
} else {
Ti.include("../javascript/application.js");
}
var cc ={win:Ti.UI.currentWindow};
var image;
var tmp_file;

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];

var tmp_image = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "tmpimg.mpeg");

var imageView = Ti.UI.createImageView({
    width: 44,
    height: 44,
    top: 150,
	image:tmp_image.read()
});
cc.win.add(imageView);

function uploadToServer(image) {
	l1.text = 'Waiting for response...';
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function()
	{		
	    var json = this.responseText;
	    var data = JSON.parse(json);
	    if (data.status == 200)
	    {
            //Titanium.API.info(data.response);
            l1.text = data.response;
	    }
	    else
	    {
		    //Titanium.API.info(data.response);
		    l1.text = data.response;     
	    }
	};
	xhr.onerror = function()	
	{
		var json = this.responseText;
	    var data = JSON.parse(json);
		l1.text = data.response;
	};		
	var url = 'https://handuplist.com/upload.json';
	xhr.onsendstream = function(e){
      Ti.API.info(e.progress);
    };	
	xhr.open('POST',url);	
	xhr.send({photo:image, title:textArea.value});    
}

var l1 = Titanium.UI.createLabel({
	text:'',
	font:{fontSize:13},
	top:10,
	left:10,
	width:300,
	color:'#888'
});
cc.win.add(l1);

var textArea = Ti.UI.createTextField(
    {
        height:50,
        width:200,
        top:50,
        font:{fontSize:20},
        borderWidth:2,
        borderColor:'#bbb',
        borderRadius:5,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        suppressReturn:true		
    }
);
cc.win.add(textArea);

var postButton = Ti.UI.createButton(
    {
        top: 120,
        right: 80,
        width: 60,
        height: 44,
        title: 'DONE'
    }
);
postButton.addEventListener(
    'click',
    function () {       
		uploadToServer(tmp_image.read());		         
    }
);
cc.win.add(postButton);

/*
var cancelButton = Ti.UI.createButton(
    {
        top: 120,
        right: 80,
        width: 60,
        height: 44,
        title: 'CANCEL'
    }
);
cancelButton.addEventListener(
    'click',
    function () {       
		var camerawin = Titanium.UI.createWindow({
			url:'android_menu_2.js',  
		    title:'Camera',
		    backgroundColor:'#fff'
		});			
		camerawin.open({ animated : true});           
    }
);
cc.win.add(cancelButton);
*/
