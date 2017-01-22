var StartUp = new CustomAlert();
var Prompt = new CustomPrompt();



document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

function theDomHasLoaded(e) {
	StartUp.render('');
   
}
 

function CustomAlert(){
	this.render = function(dialog){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('start_popupOverlay');
	    var start_popupBox = document.getElementById('start_popupBox');
		start_popupOverlay.style.display = "block";
	    start_popupOverlay.style.height = winH+"px";
		//start_popupBox.style.left = (winW/2) - (550 * .5)+"px";
	    start_popupBox.style.top = "100px";
	    start_popupBox.style.display = "block";
		document.getElementById('start_popupBoxHead').innerHTML = '<button onclick="StartUp.ok()">Play</button>';
	    document.getElementById('start_popupBoxBody').innerHTML = 'make it 15';
		//document.getElementById('start_popupBoxFooter').innerHTML = 
	}
	this.ok = function(){
		document.getElementById('start_popupBox').style.display = "none";
		document.getElementById('start_popupOverlay').style.display = "none";
		Prompt.render('Please enter you name:'); // this will call CustomPrompt()
	}
}


//for entering a user name when the game starts
function CustomPrompt(){
	this.render = function(dialog){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var popupOverlay = document.getElementById('popupOverlay');
	    var popupBox = document.getElementById('popupBox');
		popupOverlay.style.display = "block";
	    popupOverlay.style.height = winH+"px";
		//popupBox.style.left = (winW/2) - (550 * .5)+"px";
	    popupBox.style.top = "100px";
	    popupBox.style.display = "block";
		document.getElementById('popupBoxHead').innerHTML = "Welcome to Make It 15 Game";
	    document.getElementById('popupBoxBody').innerHTML = dialog;
		document.getElementById('popupBoxBody').innerHTML += '<br><input id="userName">';
		document.getElementById('popupBoxFooter').innerHTML = '<button onclick="Prompt.ok()">OK</button> <button onclick="Prompt.cancel()">Cancel</button>';
		//document.getElementById('popupBoxFoot').innerHTML = '<button onclick="Prompt.ok(\''+func+'\')">OK</button> <button onclick="Prompt.cancel()">Cancel</button>';
	}
	this.cancel = function(){
		document.getElementById('gameTitle').innerHTML = "MAKE IT 15";
		document.getElementById('popupBox').style.display = "none";
		document.getElementById('popupOverlay').style.display = "none";
	}
	this.ok = function(){
		document.getElementById('gameTitle').innerHTML = "MAKE IT 15";
		userName = document.getElementById('userName').value;
		window['setUserNameFromPopup'](userName);
		document.getElementById('popupBox').style.display = "none";
		document.getElementById('popupOverlay').style.display = "none";
	}

}

