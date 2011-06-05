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

var url = "https://handuplist.com/shareusers.json";
var filename = "shareusers.json";
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

function getTableData(data){
	var tableData=[];
		
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
		
	Ti.App.fireEvent('hide_indicator',{});		
	return tableData;	
}

function displayItems(file){	
	if(file.exists()) {		
		var dataContent = JSON.parse(''+file.read());		

		cc.tableView = Ti.UI.createTableView({
			data: getTableData(dataContent)
			//,
			//width: Ti.Platform.displayCaps.platformWidth,
			//height: (100 * 20),
			//zIndex: 1
		});		
		cc.win.add(cc.tableView);
		
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
	Ti.App.addEventListener('tabpeople_refresh', function() {
		loadFeed(url);
		Titanium.API.info("tabpeople_refresh!");
    });	
}
