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

// BODY
//var body = Ti.UI.createView({
//	top:0, 
//	height: Ti.Platform.displayCaps.platformHeight, 
//	width: Ti.Platform.displayCaps.platformWidth, 
//	layout:'vertical'
	//backgroundImage:'../images/graph.png'
//});
//cc.win.add(body);

//body.add(header);

//var snapview = Ti.UI.createView({
//	top:10,	
//	left:20,	 
//	height:150,
//	width:300,	
//	borderRadius:5,
//	layout:'horizontal'
//});
var imageView = Ti.UI.createImageView({
    width: 200,
    height: 200,
    top: 10,
	left:20,
	right:20	
});
var imageCache = new ImageWithCache();
imageCache.addImage('photo', mediumimage_url, snap_id, imageView);
//cc.win.add(imageView);	
//snapview.add(imageView);

//var userview = Ti.UI.createView({
//	top:0,	
//	left:0,	 
//	height:150,
//	width:150,	
//	borderRadius:5,
//	layout:'vertical'
//});
//var userimageView = Ti.UI.createImageView({
//    width: 40,
//    height: 40,
//    top: 10,
//	left:20	
//});
//imageCache.addImage('profile', userimage_url, user_id, userimageView);	
//userview.add(userimageView);

//var namelabel = Titanium.UI.createLabel({
//	text:'' + user_name,
//	font:{fontSize:14,fontWeight:'bold'},
//	top:5,
//	left:20,	
//	color:'#000000'
//});
//userview.add(namelabel);

//var createdatlabel = Titanium.UI.createLabel({
//	text:'' + created_at,
//	font:{fontSize:12},
//	left:20,	
//	color:'#000000'
//});
//userview.add(createdatlabel);

var titleview = Titanium.UI.createView({	
	top:0
	//height:50
	//backgroundColor: '#555'
});

var titlelabel = Titanium.UI.createLabel({
	text:'' + snap_title,
	font:{fontSize:16},
	left:20,	
	color:'#000000'	
});
titleview.add(titlelabel);
//body.add(titleview);

var priceview = Titanium.UI.createView({	
	top:0
	//height:50
	//backgroundColor: '#555'
});

var pricelabel = Titanium.UI.createLabel({
	text:'¥' + price,
	font:{fontSize:20},
	left:20,	
	color:'#000000'
});
priceview.add(pricelabel);

var rowData = [];
var row1 = Ti.UI.createTableViewRow({height:300});
var post_view = Ti.UI.createView({
	top:15,
	bottom:15,
	layout:'vertical'			
});
post_view.add(imageView);
post_view.add(titleview);
post_view.add(priceview);
row1.add(post_view);
rowData[0] = row1;

var infomationView = Ti.UI.createTableView({
    data: rowData,
    width: Ti.Platform.displayCaps.platformWidth,
    //style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
    top:50
});
cc.win.add(infomationView);

//body.add(priceview);

//snapview.add(userview);
//body.add(snapview);


//var footer = Ti.UI.createView({
//	top:10,
//	height:70,
//	width:300
//	});

//var likeView = Titanium.UI.createView({	
//	bottom:10,
//	backgroundColor:'#999',
//	height:40,
//	width:130,
//	left:20,
//	borderRadius:10
//});

//var likeLabel = Titanium.UI.createLabel({
//	font:{fontSize:14},
//	color:'#fff',
//	text:'Like',
//	height:'auto',
//	width:'auto',
//	textAlign:'center'
//});

//likeView.add(likeLabel);

//likeLabel.addEventListener(
//    'click',
//    function () {
//		likeSnap = new LikeSnap();       
//		likeSnap.addLike(
//			snap_id,
//			Ti.App.Properties.getString('email'),
//			Ti.App.Properties.getString('password'),
//			userimage_url,
//			mediumimage_url,			
//			user_id,
//			user_name,
//			snap_title,
//			created_at);       
//    }
//);

//likeLabel.addEventListener(
//    'touchstart',
//    function () {
//		likeView.backgroundColor = '#000000';				         
//    }
//);

//likeLabel.addEventListener(
//    'touchcancel',
//    function () {
//		likeView.backgroundColor = '#999999';				         
//    }
//);

//likeLabel.addEventListener(
//    'touchend',
//    function () {
//		likeView.backgroundColor = '#999999';				         
//    }
//);

//footer.add(likeView);

//var commentView = Titanium.UI.createView({
//	bottom:10,
//	backgroundColor:'#52A829',
//	height:40,
//	width:120,
//	right:20,
//	borderRadius:10
//});

//var commentLabel = Titanium.UI.createLabel({
//	font:{fontSize:14},
//	color:'#fff',
//	text:'Comment',
//	height:'auto',
//	width:'auto',
//	textAlign:'center'
//});

//commentView.add(commentLabel);

//commentLabel.addEventListener(
//    'click',
//    function () {		
//		var commentwin = Titanium.UI.createWindow({
//			url:'post_comment.js',
//			barColor:useThisBarColor,			
//		    backgroundColor:(Ti.Platform.osname == 'android') ? '#fff' :useThisBackgroundColor,
//			title:'New Comment',
//			userimageUrl: userimage_url,
//			mediumimageUrl:	mediumimage_url,
//			snapId:	snap_id,
//			userId: user_id,
//			userName: user_name,
//			snapTitle:	snap_title,
//			createdAt: created_at
//		});
//		Ti.UI.currentTab.open(commentwin, { animated : true});				         
//    }
//);

//commentLabel.addEventListener(
//    'touchstart',
//    function () {
//		commentView.backgroundColor = '#999999';				         
//    }
//);

//commentLabel.addEventListener(
//    'touchcancel',
//    function () {
//		commentView.backgroundColor = '#52A829';				         
//    }
//);

//commentLabel.addEventListener(
//    'touchend',
//    function () {
//		commentView.backgroundColor = '#52A829';				         
//    }
//);

//footer.add(commentView);

//cc.win.add(footer);
//body.add(footer);

//cc.scrollView = Ti.UI.createTableView({
	//zIndex:2,
	//showVerticalScrollIndicator:false
//});

//body.add(cc.scrollView);

cc.tableView = Ti.UI.createTableView({
	//data: getTableData(dataContent),
	width: Ti.Platform.displayCaps.platformWidth
	//height: (100 * 20),
	//zIndex: 1
});
cc.win.add(cc.tableView);

function getTableData(data){
	var tableData=[];	
	var itemCount = data.comments.length;
	for (var c=0;c<itemCount;c++){
		
        //var snap_id = data[c].snap.id;
		var user_id = data.comments[c].comment.user_id;
		var user_name = data.comments[c].comment.user_name;
		var content = data.comments[c].comment.content;
		//var like_count = data[c].snap.like_count;
		//var comment_count = data[c].snap.comment_count;		
		//var content_type = data[c].snap.photo_content_type;		
		var created_at = data.comments[c].comment.created_at;
		var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';			
		var userimage_url = data.comments[c].comment.user_photo;
		//var thumbimage_url = data[c].snap.photo_thumb_url;
		//var mediumimage_url = data[c].snap.photo_medium_url;
		
		var row = Ti.UI.createTableViewRow({
			hasChild:false,
			height:'auto',			
			expanded: false
		});
		
		var post_view = Ti.UI.createView({
			borderRadius: 5			
		});		
				
		var actionview = Ti.UI.createView({
			top:0,
			left:20,	 
			height:100,
			width:80,
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
		post_view.add(actionview);
		
		var snap_title = Ti.UI.createLabel({
			text:content,
			left:80,
			right:10,
			top:15,			
			height:'auto',
			width:'auto',
			textAlign:'left',
			color:'#666666',
			font:{fontSize:16,fontWeight:'bold'}
		});		
		post_view.add(snap_title);
		
		/*
var date_label = Ti.UI.createLabel({
			text: created_at,
			left:80,
			top:'',			
			height:'auto',
			width:150,
			textAlign:'left',
			color:'#666666',			
			font:{fontFamily:'Trebuchet MS',fontSize:10}
		});		
		post_view.add(date_label);
*/				
		row.add(post_view);
		
		row.className = 'item'+c;		
		tableData[c] = row;					
    }
		
	Ti.App.fireEvent('hide_indicator',{});		
	return tableData;	
}

function displayItems(file){	
	if(file.exists()) {		
		var dataContent = JSON.parse(''+file.read());
		cc.tableView.data = getTableData(dataContent);
				

		//cc.scrollView.add(cc.tableView);
		
/*
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
*/
		
	}
}

function loadSnap(url, filename){
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

//Ti.App.fireEvent('show_indicator');
//loadSnap(url + snap_id + '.json', snap_id + '.json');
