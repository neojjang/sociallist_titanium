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

//cc.win.layout = 'vertical';

var scrollView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	top:0,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true
});

var body = Ti.UI.createView({
	top:0, 
    height: 800,
    width: Ti.Platform.displayCaps.platformWidth,	
	layout:'vertical'	
});
scrollView.add(body);

var imageView = Ti.UI.createImageView({
    width: 300,
    height: 300,
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
	left:20,
	height:'auto',
	width:150,
	textAlign:'left',	
	color:'#000000'	
});

var pricelabel = Titanium.UI.createLabel({
	text:'¥' + price,
	font:{fontSize:22},
	top:20,
	left:20,
	height:'auto',
	width:150,
	textAlign:'left',		
	color:'#000000'
});

var vwLine = Ti.UI.createView({
	top:20,
	height:1,
	right:25,
	left:25,
	borderColor:'#999999'
});				

var messageContainer = Ti.UI.createView({
	borderRadius:isAndroid() ? 10 : 5,
	backgroundColor:'#52A829',		
	height:70,
	left:40,
	right:40,
	top:20
});

var messagelabel = Titanium.UI.createLabel({
	color:'#ffffff',
	text:'Message',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	height:36,
	width:'auto'
});

messageContainer.add(messagelabel);

var targetView = Titanium.Map.createAnnotation({
        latitude:37.390749,
        longitude:-122.081651,
        title:snap_title,
        subtitle:user_name,
        pincolor:Titanium.Map.ANNOTATION_RED
});

var mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        region: {latitude:37.390749, longitude:-122.081651, latitudeDelta:0.01, longitudeDelta:0.01},
        animate:true,
        regionFit:true,
        userLocation:true,
        annotations:[targetView],
        top:20,
        height:250,
        width:300
});

body.add(imageView);
body.add(titlelabel);
body.add(pricelabel);
body.add(vwLine);
body.add(messageContainer);
body.add(mapview);

cc.win.add(scrollView);


