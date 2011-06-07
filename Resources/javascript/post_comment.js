if(Ti.Platform.osname == 'android') {
Ti.include('/javascript/application.js');
Ti.include('/lib/jsdeferred.js');
} else {
Ti.include("../javascript/application.js");
Ti.include("../lib/jsdeferred.js");
}
var cc ={win:Ti.UI.currentWindow};
Deferred.define();

var userimage_url = cc.win.userimageUrl;
var mediumimage_url = cc.win.mediumimageUrl;
var snap_id = cc.win.snapId;
var user_id = cc.win.userId;
var user_name = cc.win.userName;
var snap_title = cc.win.snapTitle;
var created_at = cc.win.createdAt;

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];

cc.win.layout = 'vertical';

// BODY
var body = Ti.UI.createView({top:0, height: Ti.Platform.displayCaps.platformHeight, width: Ti.Platform.displayCaps.platformWidth, layout:'vertical', backgroundColor:useThisBackgroundColor});
cc.win.add(body);

//body.add(header);

var headerLabel = Ti.UI.createLabel({
	color:'#000', 
	top:10, 
	left:20, 
	height:Ti.Platform.displayCaps.platformHeight * 0.1, 
	width:'auto', 
	text:'New Comment',
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
	text:'Comment',
	font:{fontSize:16},
	left:20,
	width:'auto',	
	color:'#ffffff'	
});
titleview.add(titlelabel);
body.add(titleview);

var textArea = Ti.UI.createTextField(
    {
		hintText:'Your comment',
        height:Ti.Platform.displayCaps.platformHeight * 0.1,
        width:Ti.Platform.displayCaps.platformWidth * 0.8,
        top:10,
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
	height: Ti.Platform.displayCaps.platformHeight * 0.2,
	width:'auto'
	//backgroundColor:'#cccccc'
	});

var cancelView = Titanium.UI.createView({	
	top:10,
	backgroundColor:'#999',
	height:Ti.Platform.displayCaps.platformHeight * 0.08,
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
			url:'snaps.js',
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
	height:Ti.Platform.displayCaps.platformHeight * 0.08,
	width:Ti.Platform.displayCaps.platformWidth * 0.35,
	right:20,
	borderRadius:10
});

var doneLabel = Titanium.UI.createLabel({
	font:{fontSize:18},
	color:'#fff',
	text:'Add!',
	height:'auto',
	width:'auto',
	textAlign:'center'
});

doneView.add(doneLabel);

doneLabel.addEventListener(
    'click',
    function () {
		
		progresslavel.text = 'Uploding...';
	    Ti.App.fireEvent('show_indicator',{title:'Uploding...'});
				
		commentSnap = new CommentSnap();       
		commentSnap.addComment(
			snap_id,
			textArea.value,
			Ti.App.Properties.getString('email'),
			Ti.App.Properties.getString('password'),
			userimage_url,
			mediumimage_url,			
			user_id,
			user_name,
			snap_title,
			created_at
			);
		Ti.App.fireEvent('hide_indicator',{});	
		Titanium.UI.currentWindow.close();
		tabGroup.setActiveTab(0);
		Ti.App.fireEvent('snaps_loadFeed',{});	 			         
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
