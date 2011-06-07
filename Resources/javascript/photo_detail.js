if(Ti.Platform.osname == 'android') {
Ti.include('/javascript/application.js');
} else {
Ti.include("../javascript/application.js");
}
var cc ={win:Ti.UI.currentWindow};

var url = "https://handuplist.com/snaps/";
var filename = "snap.json";
var image;
var userimage_url = cc.win.userimageUrl;
var mediumimage_url = cc.win.mediumimageUrl;
var snap_id = cc.win.snapId;
var user_id = cc.win.userId;
var user_name = cc.win.userName;
var price = cc.win.price;
var snap_title = cc.win.snapTitle;
var created_at = cc.win.createdAt;

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];

cc.win.layout = 'vertical';

var body = Ti.UI.createView({
	top:0, 
    height: Ti.Platform.displayCaps.platformHeight,
    width: Ti.Platform.displayCaps.platformWidth,	
	layout:'vertical'	
});
cc.win.add(body);

var imageView = Ti.UI.createImageView({
    width: 200,
    height: 200,
    top: 10,
	left:20,
	right:20	
});
var imageCache = new ImageWithCache();
imageCache.addImage('photo', mediumimage_url, snap_id, imageView);

var titlelabel = Titanium.UI.createLabel({
	text:'' + snap_title,
	font:{fontSize:16},
	top:20,
	left:50,
	height:'auto',
	width:150,
	textAlign:'left',	
	color:'#000000'	
});

var pricelabel = Titanium.UI.createLabel({
	text:'¥' + price,
	font:{fontSize:20},
	top:20,
	left:50,
	height:'auto',
	width:150,
	textAlign:'left',		
	color:'#000000'
});

body.add(imageView);
body.add(titlelabel);
body.add(pricelabel);


