if(Ti.Platform.osname == 'android') {
Ti.include('/javascript/application.js');
Ti.include('/lib/date_extensions.js');
} else {
Ti.include("../javascript/application.js");
Ti.include("../lib/date_extensions.js");
}
var cc ={win:Ti.UI.currentWindow};

if(!isLogin()){
	Ti.API.info('welcome window open');

	var welcomewin = Titanium.UI.createWindow({
		url: 'welcome.js',
		backgroundImage: '../images/background.png',
		title: 'Welcome',
		barColor: useThisBarColor
	});	
	Ti.UI.currentTab.open(welcomewin, { animated : true});

}

var url = "https://handuplist.com/shareusers.json";
var filename = "shareusers.json";
var imageCache = new ImageWithCache();

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

function getTableData(data){
	var tableData=[];
	
/*
    var refresh_row = Ti.UI.createTableViewRow({hasChild:false,height:50,backgroundColor:useThisBackgroundColor});

	// Create refresh row
	var refresh_view = Ti.UI.createView({
		height:'auto',
		layout:'vertical',		
		left:5,
		top:5,
		bottom:5,
		right:5
	});
	
	var refresh_label = Ti.UI.createLabel({
		text:'refresh',
		left:54,
		textAlign:'left',
		color:'#444444',
		font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
	});	
	
	refresh_view.add(refresh_label);
	refresh_row.add(refresh_view);
	tableData[0] = refresh_row;	
*/
	
	var itemCount = data.length;
	for (var c=0;c<itemCount;c++){
		
		var user_id = data[c].user.id;
		var user_name = data[c].user.name;	
		var created_at = data[c].user.created_at;
		var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';					
		var userimage_url = data[c].user.photo_thumb_url;
		
		var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height:70,			
			expanded: false
		});
		
		// Create a vertical layout view to hold all the info labels and images for each tweet
		var post_view = Ti.UI.createView({
			borderRadius: 5			
		});		
		
		var actionview = Ti.UI.createView({
			top:0,
			left:0,	 
			height:100,
			width:70,
			layout:'vertical'
		});
        var image;
		image = Ti.UI.createImageView({
			    borderRadius:isAndroid() ? 10 : 5,				
				left:20,
				top:20,
				height:40,
				width:40
			});
		imageCache.addImage('profile', userimage_url, user_id, image);
		actionview.add(image);
		post_view.add(actionview);
		
		var user_label = Ti.UI.createLabel({
			text:user_name,
			left:70,
			width:150,
			top:20,
			height:16,
			textAlign:'left',
			color:'#444444',
			font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
		});		
		post_view.add(user_label);

		var shareView = Titanium.UI.createView({	
			top:20,
			backgroundColor:'#999',
			height:35,
			width:80,
			right:20,
			borderRadius:10
		});
		var shareLabel = Titanium.UI.createLabel({
			font:{fontSize:14},
			color:'#fff',
			text:'Share',
			height:'auto',
			width:'auto',
			textAlign:'center'
		});
		shareView.add(shareLabel);
		post_view.add(shareView);
						
		// Add the vertical layout view to the row
		row.add(post_view);
		
		row.className = 'item'+c;
		
		//refresh row
		tableData[c] = row;			
					
    }
	
	// Create loadmore row
/*
	var loadmore_row = Ti.UI.createTableViewRow({hasChild:false,height:50,backgroundColor:useThisBackgroundColor});
	var loadmore_view = Ti.UI.createView({
		height:'auto',
		layout:'vertical',		
		left:5,
		top:5,
		bottom:5,
		right:5
	});	
	var loadmore_label = Ti.UI.createLabel({
		text:'load more',
		left:54,
		textAlign:'left',
		color:'#444444',
		font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
	});		
	loadmore_view.add(loadmore_label);
	loadmore_row.add(loadmore_view);	
	tableData[itemCount+1] = loadmore_row;
*/		
	
	Ti.App.fireEvent('hide_indicator',{});		
	return tableData;	
}

function displayItems(file){	
	if(file.exists()) {		
		var dataContent = JSON.parse(''+file.read());		
		cc.tableView = Ti.UI.createTableView({
			data: getTableData(dataContent)
			//,
			/*
width: Ti.Platform.displayCaps.platformWidth,
			height: (70 * 20),
			zIndex: 1
*/
		});
		//cc.scrollView.add(cc.tableView);
		body.add(cc.tableView);
		
		cc.tableView.addEventListener('click', function(e){
			if (!Ti.Network.online) {
				noNetworkAlert();
			}
			else {
				if (e.rowData.controller) {
					var win = Titanium.UI.createWindow({
						url: e.rowData.controller,
						title: e.rowData.title,
						barColor: cc.win.barColor,
						fullscreen: false,
						backgroundColor: '#f39380'
					});
					
					Ti.UI.currentTab.open(win, {
						animated: true
					});
				}
			}
		});
		
	}
}

function loadFeed(url, filename){
	if(!Ti.Network.online){	  	
		noNetworkAlert();
	}
    var xhr = Ti.Network.createHTTPClient({		
        onload: function(e){
            try {
				Titanium.API.info("onload");
                if(xhr.status==200) {
                    var file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
                    file.write(xhr.responseData);					
					displayItems(file);
                }
            } catch (x) {
				Titanium.API.info("onload error");
				Titanium.API.info(x);
            }
        },
		onerror: function(e){
			Titanium.API.info("onerror");
		}		
    });
    url = url + '?email=' + Ti.App.Properties.getString('email') + '&password=' + Ti.App.Properties.getString('password')
    xhr.open("GET", url);
    xhr.send();
}

if (isLogin()) {
	Ti.App.fireEvent('show_indicator');
	loadFeed(url);
		
	// update the offset value whenever scroll event occurs
/*
	var offset = 0;
	cc.scrollView.addEventListener('scroll', function(e){
		if (e.y != null) {
			offset = e.y;
			Ti.API.debug('offset: ' + offset);
		}
	});
	
	// set the initial position of the scrollView's content
	var init = setInterval(function(e){
		Ti.API.info('check if ' + offset + ' = 50');
		if (offset == 50) {
			Ti.API.debug('we have just done what the scrollView\'s contentOffset should be doing');
			clearInterval(init);
		}
		cc.scrollView.scrollTo(0, 50);
	}, 100);
	
	// Pull-to-Refresh Listeners
	var bottomOfScreenOffset = ((70 * 20) - Ti.Platform.displayCaps.platformHeight);
	var lastRowOffset = bottomOfScreenOffset - 50;
	Ti.API.debug("lastRowOffset: " + lastRowOffset + "\n bottomOfScreenOffset: " + bottomOfScreenOffset);
	cc.scrollView.addEventListener('touchend', function(){
		if (offset == 0) {			
			//loadFeed(url);
			Ti.API.info('REFRESH !!!!');			
			cc.scrollView.scrollTo(0, 50);
		}
		else 
			if (offset < 50) {
				cc.scrollView.scrollTo(0, 50);
				Ti.API.info('Dont refresh, go back to base');
			}
			else 
				if (offset == bottomOfScreenOffset) {
					Ti.API.info('LOAD MORE !!!!');
					alertDialog.message = "LOAD MORE !!!!";
					alertDialog.show();
					cc.scrollView.scrollTo(0, lastRowOffset);
				}
				else 
					if (offset > lastRowOffset) {
						cc.scrollView.scrollTo(0, lastRowOffset);
						Ti.API.info('Dont load more, go back to base');
					}
	});
*/
	
	Ti.App.addEventListener('people_refresh', function() {
		loadFeed(url);
		Titanium.API.info("people_refresh!");
    });
	
}
