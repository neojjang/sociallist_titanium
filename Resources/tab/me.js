if(Ti.Platform.osname == 'android') {
  Ti.include('/javascript/application.js');
  Ti.include('/lib/date_extensions.js');
} else {
  Ti.include('../javascript/application.js');
  Ti.include('../lib/date_extensions.js');
}
var cc ={win:Ti.UI.currentWindow};
var tab = cc.win.tab;

//if(!isLogin()){
//	Ti.API.info('welcome window open');

//	var welcomewin = Titanium.UI.createWindow({
//		url: '../javascript/welcome.js',
//		backgroundImage: '../images/background.png',
//		title: 'Welcome',
//		barColor: useThisBarColor
//	});	
//	Ti.UI.currentTab.open(welcomewin, { animated : true});	

//}

var url = "https://handuplist.com/me.json";
var filename = "me.json";
var imageCache = new ImageWithCache();

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];
//Titanium.UI.orientation = Titanium.UI.PORTRAIT;

var alertDialog = Titanium.UI.createAlertDialog({
    title: 'System Message',
    buttonNames: ['OK']
});

//cc.win.backgroundImage = '../images/graph.png';

cc.scrollView = Ti.UI.createScrollView({
	zIndex:2,
	showVerticalScrollIndicator:false
});
cc.win.add(cc.scrollView);

function getTableData(data){
	var tableData=[];
	
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
	
	var itemCount = data.length;
	for (var c=0;c<itemCount;c++){
		
        var snap_id = data[c].snap.id;
		var user_id = data[c].snap.user_id;
		var user_name = data[c].snap.user_name;
		var title = data[c].snap.title;
		var like_count = data[c].snap.like_count;
		var comment_count = data[c].snap.comment_count;
		var content_type = data[c].snap.photo_content_type;		
		var created_at = data[c].snap.created_at;
		var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';					
		var userimage_url = data[c].snap.user_photo;
		var thumbimage_url = data[c].snap.photo_thumb_url;
		var mediumimage_url = data[c].snap.photo_medium_url;
		
		var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height:200,			
			expanded: false
		});
		
		// Create a vertical layout view to hold all the info labels and images for each tweet
		var post_view = Ti.UI.createView({
			borderRadius: 5			
		});		
		
		var actionview = Ti.UI.createView({
			top:0,
			left:0,	 
			height:200,
			width:50,
			layout:'vertical'
		});
        var image;
		image = Ti.UI.createImageView({
			    borderRadius:isAndroid() ? 10 : 5,				
				left:5,
				top:15,
				height:40,
				width:40
			});
		imageCache.addImage('profile', userimage_url, user_id, image);
		actionview.add(image);

		image4 = Ti.UI.createImageView({
			    url :'../images/trash_20.png',				
				left:20,
				top:10,
				height:20,
				width:20
			});			
		actionview.add(image4);		
		post_view.add(actionview);
		
		var snap_image;
		snap_image = Ti.UI.createImageView({
			    borderRadius:isAndroid() ? 10 : 5,							
				left:70,
				top:15,
				height:112,
				width:150				
			});
		//snap_image.addEventListener('click', function(e){
		  //Ti.API.info('snap_image clicked!');
		  //row.expanded = !row.expanded;
		  //var option = row.expanded ? {height: 80, duration: 200} : {height: 250, duration: 200};
		  //var option = {height: 250, duration: 200};
		  //post_view.animate(option);
		//});
		imageCache.addImage('photo', mediumimage_url, snap_id, snap_image);			
		post_view.add(snap_image);		

		//var user_label = Ti.UI.createLabel({
		//	text:user_id,
		//	left:54,
		//	width:120,
		//	top:-48,
		//	bottom:2,
		//	height:16,
		//	textAlign:'left',
		//	color:'#444444',
		//	font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
		//});		
		//post_view.add(user_label);

		var snap_title = Ti.UI.createLabel({
			text:title,
			left:80,
			top:15,			
			height:'auto',
			width:150,
			textAlign:'left',
			color:'#ffffff',
			font:{fontSize:16,fontWeight:'bold'}
		});	
		post_view.add(snap_title);
		
		var date_label = Ti.UI.createLabel({
			text: created_at,
			left:80,
			top:40,			
			height:'auto',
			width:150,
			textAlign:'left',
			color:'#ffffff',			
			font:{fontFamily:'Trebuchet MS',fontSize:10}
		});		
		post_view.add(date_label);		
				
		var countview = Ti.UI.createView({
			top:150,			
			left:70,	 
			height:30,
			width:100,
			backgroundColor:'#cccccc',
			borderRadius:5,
			layout:'horizontal'
		});		
		image2 = Ti.UI.createImageView({
			    image :'../images/like_20.png',				
				left:10,
				top:5,
				height:20,
				width:20
			});
		image2.row = c;
		image2.addEventListener(
		    'click',
		    function (e) {								
				Ti.API.info('e.source.row: ' + e.source.row);				
                var photo_detailwin = Titanium.UI.createWindow({
					url:'../javascript/photo_detail.js',  
				    title:'Photo Detail',
				    backgroundColor:useThisBackgroundColor,
					userimageUrl: data[e.source.row].snap.user_photo,
					mediumimageUrl:	data[e.source.row].snap.photo_medium_url,
					snapId:	data[e.source.row].snap.id,
					userId: data[e.source.row].snap.user_id,
					userName: data[e.source.row].snap.user_name,
					snapTitle:	data[e.source.row].snap.title,
					createdAt: data[e.source.row].snap.created_at	
				});
				//Ti.UI.currentTab.open(photo_detailwin);
				tab.open(photo_detailwin);			
		    }
		);
		countview.add(image2);		
		var likes_label = Ti.UI.createLabel({
			text: '' + like_count,
			left:5,
			top:5,			
			height:'auto',
			width:20,
			textAlign:'left',
			color:'#000000',
			font:{fontSize:14}
		});
		countview.add(likes_label);
		image3 = Ti.UI.createImageView({
			    image :'../images/comment_20.png',				
				left:0,
				top:8,
				height:20,
				width:20
			});
		image3.row = c;
		image3.addEventListener(
		    'click',
		    function (e) {								
				Ti.API.info('e.source.row: ' + e.source.row);				
                var photo_detailwin = Titanium.UI.createWindow({
					url:'../javascript/photo_detail.js',  
				    title:'Photo Detail',
				    backgroundColor:useThisBackgroundColor,
					userimageUrl: data[e.source.row].snap.user_photo,
					mediumimageUrl:	data[e.source.row].snap.photo_medium_url,
					snapId:	data[e.source.row].snap.id,
					userId: data[e.source.row].snap.user_id,
					userName: data[e.source.row].snap.user_name,
					snapTitle:	data[e.source.row].snap.title,
					createdAt: data[e.source.row].snap.created_at	
				});
				//Ti.UI.currentTab.open(photo_detailwin);
				tab.open(photo_detailwin);			
		    }
		);
        countview.add(image3);		
		var comments_label = Ti.UI.createLabel({
			text: '' + comment_count,
			left:5,
			top:5,			
			height:'auto',
			width:20,
			textAlign:'left',
			color:'#000000',
			font:{fontSize:14}
		});	
		countview.add(comments_label);
		post_view.add(countview);	
						
		// Add the vertical layout view to the row
		row.add(post_view);
		
		row.className = 'item'+c;
		
		//refresh row
		tableData[c+1] = row;			
					
    }
	
	// Create loadmore row
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
	
	Ti.App.fireEvent('hide_indicator',{});		
	return tableData;	
}

function displayItems(file){	
	if(file.exists()) {		
		var dataContent = JSON.parse(''+file.read());		
		cc.tableView = Ti.UI.createTableView({
			data: getTableData(dataContent),
			width: Ti.Platform.displayCaps.platformWidth,
			height: (200 * 20),
			zIndex: 1
		});
		cc.scrollView.add(cc.tableView);
		
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
					
					//Ti.UI.currentTab.open(win, {animated: true});
					tab.open(win, {animated: true});
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
	var bottomOfScreenOffset = ((200 * 20) - Ti.Platform.displayCaps.platformHeight);
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
	Ti.App.addEventListener('tabhomefeed_refresh', function() {
		loadFeed(url);
		Titanium.API.info("tabhomefeed_refresh!");
    });
	
}
