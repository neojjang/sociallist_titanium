if(Ti.Platform.osname == 'android') {
Ti.include('/lib/jsdeferred.js');
} else {
Ti.include("../../../../../../../../../lib/jsdeferred.js");
}
Deferred.define();

var DEFAULT_BAR_COLOR = "#000";
var useThisBackgroundColor='#ffffff';
var useThisBarColor='#026091';

function noNetworkAlert() {
    Ti.App.fireEvent('hide_indicator',{});
  	Ti.UI.createAlertDialog({
  	  title:Ti.Locale.getString('no_network_title'),
  	  message:Ti.Locale.getString('no_network_msg')
  	}).show();
};

function isAndroid(){
	return (Ti.Platform.name == 'android');
};

function isLogin(){
	return (Ti.App.Properties.getString('email') != null && Ti.App.Properties.getString('password') != null);
};

var indicatorShowing = false;
var indWin = null;
var actInd = null;
function showIndicator(title) {
	indicatorShowing = true;
  Ti.API.info("showIndicator with title " + title);
	
  	// window container
  	indWin = Ti.UI.createWindow({
  		height:150,
  		width:150
  	});

  	// black view
  	var indView = Ti.UI.createView({
  		height:150,
  		width:150,
  		backgroundColor:'#000',
  		borderRadius:10,
  		opacity:0.7
  	});
  	indWin.add(indView);

  	// loading indicator
  	actInd = Ti.UI.createActivityIndicator({
  		style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
  		height:30,
  		width:30
  	});
  	indWin.add(actInd);

  	// message
  	var message = Ti.UI.createLabel({
  		text:title,
  		color:'#fff',
  		width:'auto',
  		height:'auto',
  		font:{fontSize:20,fontWeight:'bold'},
  		bottom:20
  	});
  	indWin.add(message);
  	indWin.open();
  	actInd.show();
};

var droidActInd = Ti.UI.createActivityIndicator({height:30,width:30,message:'Loading...'});
function hideIndicator() {
	if(Ti.Platform.osname == 'android'){
		droidActInd.hide();
	}else{
	    if (actInd && actInd !== null) {
	       actInd.hide();
	    }
	    
	    if (indWin && indWin !== null) {
	       indWin.close({opacity:0,duration:500});
	    }
	  	
	  	indicatorShowing = false;		
	}
};

Ti.App.addEventListener('show_indicator', function(e) {
  if(Ti.Platform.osname == 'android') {
  	if(e.title == null) { 
        droidActInd.message = 'Loading...'; 
	} else {
		droidActInd.message = e.title;
	}
    droidActInd.show();
  }else{
	  if(e.title == null) { 
		 e.title = 'Loading'; 
	   }
	  if(indicatorShowing) { 
		 hideIndicator(); 
	  }
	 showIndicator(e.title);	
  }
  

});
Ti.App.addEventListener('change_title', function(e) {
  if(e.title) {
    hideIndicator();
  	showIndicator(e.title);
  }
});
Ti.App.addEventListener('hide_indicator', function(e) {
	hideIndicator();
});
Ti.App.addEventListener('show_snap', function(e) {
	var photo_detailwin = Titanium.UI.createWindow({
		url:'../javascript/photo_detail.js',  
	    title:'Photo Detail',
	    backgroundColor:useThisBackgroundColor,
		userimageUrl: e.userimage_url,
		mediumimageUrl:	e.mediumimage_url,
		snapId:	e.snap_id,
		userId: e.user_id,
		userName: e.user_name,
		snapTitle:	e.snap_title,
		createdAt: e.created_at			
	});
	Ti.UI.currentTab.open(photo_detailwin, {animated : true});	
});

var HanduplistDB = function() {
    this.dbName = 'handuplistdb';
    
    this.open = function () {
        this.db = Titanium.Database.open(this.dbName);
    };

    this.close = function () {
        this.db.close();
    };
	
	this.selectUser = function(){
		this.open();
		var rows = this.db.execute('SELECT * FROM users');
		this.close();
		return rows;
	};
	
    this.deleteUser = function () {
        this.open();                            
        var res = this.db.execute('DELETE FROM users');            
        this.close();
        return true;
    };	

    this.addUser = function (user, input_password) {
        this.open();       
                            
        var res = this.db.execute(
            'INSERT INTO users (id, email, password, name, photo) VALUES(?,?,?,?,?)',
            user.id,
            user.email,
			input_password,
            user.name,
            user.photo            
        );
        Ti.API.debug('Add to DB');        
        this.close();
        return true;
    };

    this.open();
    this.db.execute('CREATE TABLE IF NOT EXISTS users (id TEXT, email TEXT, password TEXT, name TEXT, photo TEXT)');
    this.close();
};

var ImageWithCache = function(){
	
	this.addImage = function(imageDirectoryName, image_url, id, imageViewObject){	
		image_url = image_url.replace(/\?[0-9]+$/, '');
		var cacheFilePath = Titanium.Filesystem.applicationDataDirectory + '/' +  imageDirectoryName + '/' + id;
		var cacheFile = Ti.Filesystem.getFile(cacheFilePath);				
		if (cacheFile.exists()) {			
			//Ti.API.info('foundcache:' + cacheFilePath + ' [' + cacheFile.modificationTimestamp() + ']');
			imageViewObject.image = cacheFilePath;					
		}
		else {			
			//Ti.API.info('createcache:' + cacheFilePath);
				var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
				if (!dir.exists()) {					
					dir.createDirectory();
				};			
				cacheFile = Ti.Filesystem.getFile(cacheFilePath);
				if (!cacheFile.exists()) { 					
					var xhr = Ti.Network.createHTTPClient();
					(function() {
						var deferred = new Deferred();
						xhr.onload = function()
						{		
						    if (xhr.status == 200)
						    {
				                cacheFile.write(xhr.responseData);
								deferred.call();
						    };
						};
						xhr.open('GET',image_url);
						xhr.send();
						return deferred;
					})().next(function(){
				        //Ti.API.info('complete cache:' + cacheFilePath);
						imageViewObject.image = cacheFilePath;
					});
				}				
		}
		//Ti.API.info('addImage return: ' + cacheFilePath);		
		return true;				
	};	
};

var LikeSnap = function(){
	this.addLike = function(input_snap_id, input_email, input_password, input_userimage_url, input_mediumimage_url, input_user_id, input_user_name,input_snap_title, input_created_at){
		if(!Ti.Network.online){	  	
			noNetworkAlert();
		}
			
		//progresslavel.text = 'Wait...';
		Ti.App.fireEvent('show_indicator',{title:'Wait...'});
		
		var xhr = Ti.Network.createHTTPClient();
		(function() {
			var deferred = new Deferred();
			xhr.onload = function()
			{		
			    var json = this.responseText;
			    var data = JSON.parse(json);
			    if (data.status == 200)
			    {
		            //Titanium.API.info(data.response);
		            //progresslavel.text = 'Done';
			    }
			    else
			    {
				    //Titanium.API.info(data.response);
				    //progresslavel.text = 'Error';
					Ti.App.fireEvent('hide_indicator',{});    
			    }
				deferred.call();
			};
			xhr.onerror = function()	
			{
				var json = this.responseText;
			    var data = JSON.parse(json);
				//progresslavel.text = 'Error';
				Ti.App.fireEvent('hide_indicator',{});
			};		
			var url = 'https://handuplist.com/like.json';
			xhr.onsendstream = function(e){
		      Ti.API.info(e.progress);
		    };			
			xhr.open('POST',url);
			postjson = {
				email: input_email,
				password: input_password,
				like: {
					snap_id: input_snap_id
				}
			};				
			xhr.setRequestHeader("Content-Type","application/json");		
		    xhr.send(JSON.stringify(postjson));
			return deferred;
		})().next(function(){
			
			Ti.App.fireEvent('hide_indicator',{});
			Ti.App.fireEvent('show_snap',{
				userimage_url:input_userimage_url, 
				mediumimage_url:input_mediumimage_url, 
				snap_id:input_snap_id, 
				user_id:input_user_id, 
				user_name:input_user_name,
				snap_title:input_snap_title, 
				created_at:input_created_at});					
								
		});    
		
	};
};

var CommentSnap = function(){
	this.addComment = function(input_snap_id, input_comment, input_email, input_password, input_userimage_url, input_mediumimage_url, input_user_id, input_user_name,input_snap_title, input_created_at){
		if(!Ti.Network.online){	  	
			noNetworkAlert();
		}
			
		//progresslavel.text = 'Wait...';
		//Ti.App.fireEvent('show_indicator',{title:'Wait...'});
		
		var xhr = Ti.Network.createHTTPClient();
		(function() {
			var deferred = new Deferred();
			xhr.onload = function()
			{
                            Ti.API.info('comment:onload');		
			    var json = this.responseText;
			    var data = JSON.parse(json);
			    if (data.status == 200)
			    {
		            //Titanium.API.info(data.response);
		            //progresslavel.text = 'Done';
			    }
			    else
			    {
				    //Titanium.API.info(data.response);
				    //progresslavel.text = 'Error';
					Ti.App.fireEvent('hide_indicator',{});    
			    }
				deferred.call();
			};
			xhr.onerror = function()	
			{
                                Ti.API.info('comment:onerror');
				var json = this.responseText;
			    var data = JSON.parse(json);
				//progresslavel.text = 'Error';
				Ti.App.fireEvent('hide_indicator',{});
			};		
			var url = 'https://handuplist.com/comment.json';
			xhr.onsendstream = function(e){
		      Ti.API.info(e.progress);
		    };			
			xhr.open('POST',url);
                        Ti.API.info('comment:' + url);
			postjson = {
				email: input_email,
				password: input_password,
				comment: {
					snap_id: input_snap_id,
					content: input_comment
				}
			};				
			xhr.setRequestHeader("Content-Type","application/json");
                        //Ti.API.info('111');		
		    xhr.send(JSON.stringify(postjson));
			return deferred;
		})().next(function(){
			
			Ti.App.fireEvent('hide_indicator',{});
			
            //Ti.App.fireEvent('show_snap',{
			//	userimage_url:input_userimage_url, 
			//	mediumimage_url:input_mediumimage_url, 
			//	snap_id:input_snap_id, 
			//	user_id:input_user_id, 
			//	user_name:input_user_name,
			//	snap_title:input_snap_title, 
			//	created_at:input_created_at});	
		
								
		});    
		
	};
};
