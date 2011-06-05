if(Ti.Platform.osname == 'android') {
  Ti.include('/javascript/application.js');
} else {
  Ti.include('../javascript/application.js');
}
var cc ={win:Ti.UI.currentWindow};
var tab = cc.win.tab;

cc.win.layout = 'vertical';
//cc.win.backgroundImage = '../images/graph.png';
cc.win.orientationModes = [
	Ti.UI.PORTRAIT,
	Ti.UI.UPSIDE_PORTRAIT
];
//Titanium.UI.orientation = Titanium.UI.PORTRAIT;

var alertDialog = Titanium.UI.createAlertDialog({
    title: 'System Message',
    buttonNames: ['OK']
});

//Profile
var profilelabel = Titanium.UI.createLabel({
	color:'#999',
	text:'Profile',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	width:'auto',
	height:30,
	top:10,
	left:20
});
cc.win.add(profilelabel);

var profiletableData=[];
cc.editrow = Ti.UI.createTableViewRow({
    title: 'Edit Profile',
	color: '#666666'
});
profiletableData[0] = cc.editrow;
cc.profiletable = Titanium.UI.createTableView({
	data: profiletableData,
	borderWidth:1,
	top:10,
	left:20
});
cc.win.add(cc.profiletable);

//Misc
var misclabel = Titanium.UI.createLabel({
	color:'#999',
	text:'Misc',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	width:'auto',
	height:30,
	top:10,
	left:20
});
cc.win.add(misclabel);

var misctableData=[];
cc.logoutrow = Ti.UI.createTableViewRow({
    title: 'Logout',
	color: '#666666'
});
cc.aboutrow = Ti.UI.createTableViewRow({
    title: 'About',
	color: '#666666'
});
misctableData[0] = cc.aboutrow;
misctableData[1] = cc.logoutrow;
cc.misctable = Titanium.UI.createTableView({
	data: misctableData,
	borderWidth:1,
	top:10,
	left:20
});
cc.win.add(cc.misctable);

cc.editrow.addEventListener('click', function (e) {
});

cc.aboutrow.addEventListener('click', function (e) {
});

cc.logoutrow.addEventListener('click', function (e) {
});
