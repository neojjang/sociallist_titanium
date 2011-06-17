if(Ti.Platform.osname == 'android') {
  Ti.include('/javascript/application.js');
  Ti.include('/lib/date_extensions.js');
} else {
  Ti.include('../javascript/application.js');
  Ti.include('../lib/date_extensions.js');
}
var cc ={win:Ti.UI.currentWindow};
var tab = cc.win.tab;

function formatDate()
{
	var date = new Date;
	var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
	if (date.getHours()>=12)
	{
		datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+date.getMinutes()+' PM';
	}
	else
	{
		datestr+=' '+date.getHours()+':'+date.getMinutes()+' AM';
	}
	return datestr;
}

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

var url = "https://handuplist.com/index.json";
var filename = "index.json";
var imageCache = new ImageWithCache();

cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];

var alertDialog = Titanium.UI.createAlertDialog({
    title: 'System Message',
    buttonNames: ['OK']
});

cc.tableView = Ti.UI.createTableView({
	width: Ti.Platform.displayCaps.platformWidth
});
cc.win.add(cc.tableView);

var distance_label = Ti.UI.createLabel({
	text: 'Within 0.0 mile',
	left:5,		
	height:'auto',
	width:Ti.Platform.displayCaps.platformWidth * 0.3,
	textAlign:'left',
	color:'#ffffff',			
	font:{fontFamily:'Trebuchet MS',fontSize:12,fontWeight:'bold'}
});
var toolbarSlider = Titanium.UI.createSlider({
	min:0,
	max:10,
	value:0.1,
	width:Ti.Platform.displayCaps.platformWidth * 0.6,
	right:10,
	height:'auto'
});
cc.win.setToolbar([distance_label,toolbarSlider],{animated:true});

var distance = 0;
toolbarSlider.addEventListener('change',function(e) {
    distance_label.text = 'Within ' + e.value.toFixed(1) + ' mile';
    distance = e.value.toFixed(1);  
});

toolbarSlider.addEventListener('touchend',function(e) {

	if(Titanium.Geolocation.locationServicesEnabled){
		Titanium.Geolocation.getCurrentPosition(function(e){    
		    if(!e.success || e.error){
		        Ti.API.error(e.error);
		        return;
		    }
		    var coords = e.coords;
			var lat = e.coords.latitude;
		    var lng = e.coords.longitude;
			Ti.App.fireEvent('show_indicator');
			loadFeed(url, lat, lng, distance);
			setTimeout(endReloading, 2000);
		});
	}
    
});

function getTableData(data){
	var tableData=[];
	
	var itemCount = data.length;
	for (var c=0;c<itemCount;c++){
		
        var snap_id = data[c].snap.id;
		var user_id = data[c].snap.user_id;
		var user_name = data[c].snap.user_name;
		var price = data[c].snap.price;
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
		
		var post_view = Ti.UI.createView({
			borderRadius: 5,
			top:15,
			bottom:15			
		});
		post_view.row = c;
		post_view.addEventListener(
		    'click',
		    function (e) {								
				Ti.API.info('e.source.row: ' + e.source.row);				
                var photo_detailwin = Titanium.UI.createWindow({
					url:'../javascript/photo_detail.js',  
				    title:'Photo Detail',
				    barColor:useThisBarColor,
				    backgroundColor:useThisBackgroundColor,
					userimageUrl: data[e.source.row].snap.user_photo,
					mediumimageUrl:	data[e.source.row].snap.photo_medium_url,
					snapId:	data[e.source.row].snap.id,
					userId: data[e.source.row].snap.user_id,
					userName: data[e.source.row].snap.user_name,
					price: data[e.source.row].snap.price,
					lat: data[e.source.row].snap.lat,
					lng: data[e.source.row].snap.lng,
					snapTitle:	data[e.source.row].snap.title,
					createdAt: data[e.source.row].snap.created_at	
				});
				Ti.UI.currentTab.open(photo_detailwin, {animated : true});
				//tab.open(photo_detailwin);			
		    }
		);				
		
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
				left:10,
				height:40,
				width:40
			});
		imageCache.addImage('profile', userimage_url, user_id, image);
		actionview.add(image);

		/*
image4 = Ti.UI.createImageView({
			    url :'../images/trash_20.png',				
				left:20,
				top:10,
				height:20,
				width:20
			});			
		actionview.add(image4);
*/		
		post_view.add(actionview);
		
		var snap_image;
		snap_image = Ti.UI.createImageView({
			    borderRadius:isAndroid() ? 10 : 5,
			    left:70,
				height:200,
				width:200
			});
		snap_image.row = c;	
		//snap_image.addEventListener(
		//    'click',
		//    function (e) {								
		//		Ti.API.info('e.source.row: ' + e.source.row);				
        //        var photo_detailwin = Titanium.UI.createWindow({
		//			url:'../javascript/photo_detail.js',  
		//		    title:'Photo Detail',
		//		    backgroundColor:useThisBackgroundColor,
		//			userimageUrl: data[e.source.row].snap.user_photo,
		//			mediumimageUrl:	data[e.source.row].snap.photo_medium_url,
		//			snapId:	data[e.source.row].snap.id,
		//			userId: data[e.source.row].snap.user_id,
		//			userName: data[e.source.row].snap.user_name,
		//			price: data[e.source.row].snap.price,
		//			snapTitle:	data[e.source.row].snap.title,
		//			createdAt: data[e.source.row].snap.created_at	
		//		});
		//		Ti.UI.currentTab.open(photo_detailwin, {animated : true});
		//		//tab.open(photo_detailwin);			
		//    }
		//);
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
			top:5,			
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
			top:25,			
			height:'auto',
			width:150,
			textAlign:'left',
			color:'#ffffff',			
			font:{fontFamily:'Trebuchet MS',fontSize:10}
		});		
		post_view.add(date_label);
		
		var price_label = Ti.UI.createLabel({
			text: '¥' + price,
			left:80,
			top:50,			
			height:'auto',
			width:150,
			textAlign:'left',
			color:'#ffffff',			
			font:{fontFamily:'Trebuchet MS',fontSize:20,fontWeight:'bold'}
		});		
		post_view.add(price_label);				
				
		var countview = Ti.UI.createView({
			top:50,			
			left:10,	 
			height:60,
			width:50,
			//backgroundColor:'#cccccc',
			borderRadius:5,
			layout:'horizontal'
		});		
		image2 = Ti.UI.createImageView({
			    image :'../images/like_20.png',				
				left:0,
				top:8,
				height:20,
				width:20
			});
		image2.row = c;
		//image2.addEventListener(
		//    'click',
		//    function (e) {								
		//		Ti.API.info('e.source.row: ' + e.source.row);				
        //        var photo_detailwin = Titanium.UI.createWindow({
		//			url:'../javascript/photo_detail.js',  
		//		    title:'Photo Detail',
		//		    backgroundColor:useThisBackgroundColor,
		//			userimageUrl: data[e.source.row].snap.user_photo,
		//			mediumimageUrl:	data[e.source.row].snap.photo_medium_url,
		//			snapId:	data[e.source.row].snap.id,
		//			userId: data[e.source.row].snap.user_id,
		//			userName: data[e.source.row].snap.user_name,
		//			price: data[e.source.row].snap.price,
		//			snapTitle:	data[e.source.row].snap.title,
		//			createdAt: data[e.source.row].snap.created_at	
		//		});
		//		//Ti.UI.currentTab.open(photo_detailwin);
		//		tab.open(photo_detailwin);			
		//    }
		//);
		countview.add(image2);		
		var likes_label = Ti.UI.createLabel({
			text: '' + like_count,
			left:5,
			top:10,			
			height:'auto',
			width:20,
			textAlign:'left',
			color:'#000000',
			font:{fontSize:14}
		});
		countview.add(likes_label);
		post_view.add(countview);
		
		var commentview = Ti.UI.createView({
			top:80,			
			left:10,	 
			height:60,
			width:50,
			//backgroundColor:'#cccccc',
			borderRadius:5,
			layout:'horizontal'
		});		
		image3 = Ti.UI.createImageView({
			    image :'../images/comment_20.png',				
				left:0,
				top:8,
				height:20,
				width:20
			});
		image3.row = c;
		//image3.addEventListener(
		//    'click',
		//    function (e) {								
		//		Ti.API.info('e.source.row: ' + e.source.row);				
        //        var photo_detailwin = Titanium.UI.createWindow({
		//			url:'../javascript/photo_detail.js',  
		//		    title:'Photo Detail',
		//		    backgroundColor:useThisBackgroundColor,
		//			userimageUrl: data[e.source.row].snap.user_photo,
		//			mediumimageUrl:	data[e.source.row].snap.photo_medium_url,
		//			snapId:	data[e.source.row].snap.id,
		//			userId: data[e.source.row].snap.user_id,
		//			userName: data[e.source.row].snap.user_name,
		//			price: data[e.source.row].snap.price,
		//			snapTitle:	data[e.source.row].snap.title,
		//			createdAt: data[e.source.row].snap.created_at	
		//		});
		//		//Ti.UI.currentTab.open(photo_detailwin);
		//		tab.open(photo_detailwin);			
		//    }
		//);
        commentview.add(image3);		
		var comments_label = Ti.UI.createLabel({
			text: '' + comment_count,
			left:5,
			top:10,			
			height:'auto',
			width:20,
			textAlign:'left',
			color:'#000000',
			font:{fontSize:14}
		});	
		commentview.add(comments_label);
		post_view.add(commentview);	
						
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
		//left:54,
		textAlign:'center',
		//color:'#444444',
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
		cc.tableView.data = getTableData(dataContent);
				
	}
}

function loadFeed(url, lat, lng, dis){
	if(!Ti.Network.online){	  	
		noNetworkAlert();
	}
        Ti.API.debug("loadFeed");
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
    //url = url + '?email=' + Ti.App.Properties.getString('email') + '&password=' + Ti.App.Properties.getString('password')
    url = url + '?lat=' + lat + '&lng=' + lng + '&distance=' + dis
    xhr.open("GET", url);
    xhr.send();
}

//var refresh_view = Ti.UI.createView({
//	backgroundColor: "#000",
//	height:55
//});

//var refresh_label = Ti.UI.createLabel({
//  text: "ひっぱると更新",
//  bottom: 30,
//  height: "auto",
//  color: "#576c89",
//  textAlign: "center",
//  font: {
//    fontSize: 13,
//    fontWeight: "bold"
//  }
//});	

//refresh_view.add(refresh_label);

var border = Ti.UI.createView({
	backgroundColor:"#576c89",
	height:2,
	bottom:0
});

var tableHeader = Ti.UI.createView({
	backgroundColor:"#e2e7ed",
	width:320,
	height:60
});

tableHeader.add(border);

var arrow = Ti.UI.createView({
	backgroundImage:"../images/whiteArrow.png",
	width:23,
	height:60,
	bottom:10,
	left:20
});

var statusLabel = Ti.UI.createLabel({
	text:"Pull to reload",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});

var lastUpdatedLabel = Ti.UI.createLabel({
	text:"Last Updated: "+formatDate(),
	left:55,
	width:200,
	bottom:15,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:12},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});

var miniactInd = Titanium.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30
});

var navActInd = Titanium.UI.createActivityIndicator();
cc.win.setRightNavButton(navActInd);

tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(miniactInd);

cc.tableView.headerPullView = tableHeader;

var pulling = false;
var reloading = false;
var updating = false;
var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."});
var lastRow = 10;

function beginReloading()
{
	if(Titanium.Geolocation.locationServicesEnabled){
		Titanium.Geolocation.getCurrentPosition(function(e){    
		    if(!e.success || e.error){
		        Ti.API.error(e.error);
		        return;
		    }
		    var coords = e.coords;
			var lat = e.coords.latitude;
		    var lng = e.coords.longitude;
			//Ti.App.fireEvent('show_indicator');
			loadFeed(url, lat, lng, distance);
			setTimeout(endReloading, 2000);
		});
	}
}

function endReloading()
{
	// simulate loading
	//for (var c=lastRow;c<lastRow+10;c++)
	//{
	//	cc.tableView.appendRow({title:"Row "+c});
	//}
	//lastRow += 10;

	// when you're done, just reset
	cc.tableView.setContentInsets({top:0},{animated:true});
	reloading = false;
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	miniactInd.hide();
	Ti.App.fireEvent('hide_indicator',{});
	arrow.show();
}

function beginUpdate()
{
	updating = true;
	navActInd.show();

	//cc.tableView.appendRow(loadingRow);

	// just mock out the reload
	setTimeout(endUpdate,2000);
}

function endUpdate()
{
	updating = false;

	//cc.tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});

	// simulate loading
	//for (var c=lastRow;c<lastRow+10;c++)
	//{
	//	tableView.appendRow({title:"Row "+(c+1)},{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
	//}
	//lastRow += 10;

	// just scroll down a bit to the new rows to bring them into view
	//cc.tableView.scrollToIndex(lastRow-9,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});

	navActInd.hide();
}

var lastDistance = 0;

cc.tableView.addEventListener('scroll',function(e)
{
	var offset = e.contentOffset.y;
	var height = e.size.height;
	var total = offset + height;
	var theEnd = e.contentSize.height;
	var distance = theEnd - total;
	
	if (offset <= -65.0 && !pulling)
	{
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Release to refresh...";
	}
	else if (pulling && offset > -65.0 && offset < 0)
	{
		pulling = false;
		var t = Ti.UI.create2DMatrix();
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Pull down to refresh...";
	}
	else if (distance < lastDistance)
	{
		// adjust the % of rows scrolled before we decide to start fetching
		var nearEnd = theEnd * .75;

		if (!updating && (total >= nearEnd))
		{
			beginUpdate();
		}
	}
	lastDistance = distance;	
});

cc.tableView.addEventListener('scrollEnd',function(e)
{
	if (pulling && !reloading && e.contentOffset.y <= -65.0)
	{
		reloading = true;
		pulling = false;
		arrow.hide();
		miniactInd.show();
		Ti.App.fireEvent('show_indicator');
		statusLabel.text = "Reloading...";
		cc.tableView.setContentInsets({top:60},{animated:true});
		arrow.transform=Ti.UI.create2DMatrix();
		beginReloading();
	}
});

//cc.tableView.addEventListener('scroll', function(e){
//	var offset = e.contentOffset.y;
//	if(offset <= -60.0 && !pulling){
//		pulling = true;
//		refresh_label.text = 'はなすとreload!';
//	} else if(pulling && offset > -60.0 && offset < 0) {
//		pulling = false;
//		refresh_label.text = 'ひっぱるとreload!';
//	}
//});
//cc.tableView.addEventListener('scrollEnd', function(e){
//	if(pulling && !reloading && e.contentOffset.y <= -60.0){
//		reloading = true;
//		pulling = false;
//		Ti.App.fireEvent('show_indicator');
//		refresh_label.text = 'reloading...';
//		cc.tableView.setContentInsets({top:60},{animated:true});
//		beginReloading();
//	}
//});

//function beginReloading() {
//	if(Titanium.Geolocation.locationServicesEnabled){
//		Titanium.Geolocation.getCurrentPosition(function(e){    
//		    if(!e.success || e.error){
//		        Ti.API.error(e.error);
//		        return;
//		    }
//		    var coords = e.coords;
//			var lat = e.coords.latitude;
//		    var lng = e.coords.longitude;
//			//Ti.App.fireEvent('show_indicator');
//			loadFeed(url, lat, lng, distance);
//			setTimeout(endReloading, 2000);
//		});
//	}
//}

//function endReloading() {
//  cc.tableView.setContentInsets({top:0},{animated:true});
//  reloading = false;
//  reloadLabel.text = "ひっぱると更新";
//  Ti.App.fireEvent('hide_indicator',{});
//}

Ti.App.addEventListener('snaps_loadFeed', function(e) {
	if(Titanium.Geolocation.locationServicesEnabled){
		Titanium.Geolocation.getCurrentPosition(function(e){    
		    if(!e.success || e.error){
		        Ti.API.error(e.error);
		        return;
		    }
		    var coords = e.coords;
			var lat = e.coords.latitude;
		    var lng = e.coords.longitude;
			Ti.App.fireEvent('show_indicator');
			loadFeed(url, lat, lng, distance);
			setTimeout(endReloading, 2000);
		});
	}
});

if(Titanium.Geolocation.locationServicesEnabled){
	Titanium.Geolocation.getCurrentPosition(function(e){    
	    if(!e.success || e.error){
	        Ti.API.error(e.error);
	        return;
	    }
	    var coords = e.coords;
		var lat = e.coords.latitude;
	    var lng = e.coords.longitude;
		Ti.App.fireEvent('show_indicator');
		loadFeed(url, lat, lng, distance);
		setTimeout(endReloading, 2000);
	});
}