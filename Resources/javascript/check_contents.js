var baseurl = "https://snapamigo.com/";

var download = function(path, callback) {
	Titanium.API.info("download!");
	//Double check we have network
	if(!Ti.Network.online){	  	
		noNetworkAlert();
	}
    var xhr = Ti.Network.createHTTPClient({		
        onload: function(e){
            try {
				Titanium.API.info("onload");
                if(xhr.status==200) {
                    var file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, path);
                    file.write(xhr.responseData);
					Ti.API.info('200 ' + path);
                    if(callback) {
                        callback();
                    }
                }
            } catch (x) {
				Titanium.API.info("onload error");
            }
        },
		onerror: function(e){
			Titanium.API.info("onerror");
		}		
    });
    xhr.open("GET", baseurl+path);
    xhr.send({
			email:Ti.App.Properties.getString('email'),
		    password:Ti.App.Properties.getString('password')
	});
};

var update_snaps = function() {
    download("homefeed.json", function() {
        Titanium.App.fireEvent('update_snaps');
    });
	Titanium.API.info("Update snaps");
};

var check_contents = function() {
	Ti.App.fireEvent('show_indicator');
    update_snaps();
    Titanium.API.info("Checking udpate");
};
check_contents();

Ti.App.addEventListener('download', function() {
	check_contents();
	Titanium.API.info("download complete!");
});

if(Ti.Platform.osname == 'android') {
   Ti.Android.currentActivity.addEventListener('resume', function(e) {
       Ti.API.info('Caught resume event');  
       check_contents();
   });
}
else if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
    Ti.App.addEventListener('resume', function(e) {
        Ti.API.info('Caught resume event');  
        check_contents();
    });
}