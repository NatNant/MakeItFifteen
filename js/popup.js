var StartUp = new CustomAlert();
var Prompt = new CustomPrompt();
var Rule = new DisplayHowto();
var howToPlayString = '<ul><li>You will play against a computer.</li><li>Your input is <span style="color:red">RED.</span></li><li>Computer input is <span style="color:blue">BLUE.</span></li><li>Who makes the sum of 15 first is the <span style="font-weight:bold">WINNER!!!.</span></li></ul>'
var Result = new CustomResultPopup();



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
		document.getElementById('start_popupBoxHead').innerHTML = '<button onclick="StartUp.ok()">Play</button></br><button onclick="StartUp.howto()">How to</button>';
	    document.getElementById('start_popupBoxBody').innerHTML = 'make it 15';
		
	}
	this.ok = function(){
		document.getElementById('start_popupBox').style.display = "none";
		document.getElementById('start_popupOverlay').style.display = "none";
		Prompt.render('Please enter you name:'); // this will call CustomPrompt()
	}
	this.howto = function(){
		document.getElementById('start_popupBox').style.display = "none";
		document.getElementById('start_popupOverlay').style.display = "none";
		Rule.render(); // this will call CustomPrompt()
	}
}

function DisplayHowto(){
	this.render = function(){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('howto_popupOverlay');
	    var howto_popupBox = document.getElementById('howto_popupBox');
		howto_popupOverlay.style.display = "block";
	    howto_popupOverlay.style.height = winH+"px";
		//howto_popupBox.style.left = (winW/2) - (550 * .5)+"px";
	    howto_popupBox.style.top = "100px";
	    howto_popupBox.style.display = "block";
		document.getElementById('howto_popupBoxHead').innerHTML = '<h1>How to Play:</h1>';
	    document.getElementById('howto_popupBoxBody').innerHTML = howToPlayString;
		document.getElementById('howto_popupBoxFooter').innerHTML = '<button onclick="Rule.ok()">I got it!</button>';
	}
	this.ok = function(){
		document.getElementById('howto_popupBox').style.display = "none";
		document.getElementById('howto_popupOverlay').style.display = "none";
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
		window['setUserNameFromPopup'](userName);//to send avalue to board.js
		document.getElementById('popupBox').style.display = "none";
		document.getElementById('popupOverlay').style.display = "none";
	}

}


function CustomResultPopup(){
	this.render = function(imgName,msg){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var result_popupOverlay = document.getElementById('result_popupOverlay');
	    var result_popupBox = document.getElementById('result_popupBox');
		result_popupOverlay.style.display = "block";
	    result_popupOverlay.style.height = winH+"px";
		//howto_popupBox.style.left = (winW/2) - (550 * .5)+"px";
	    result_popupBox.style.top = "100px";
	    result_popupBox.style.display = "block";
	  
		document.getElementById('result_popupBoxHead').innerHTML = '<img src="img/'+imgName+'.png" alt="'+imgName+'">'
	    document.getElementById('result_popupBoxBody').innerHTML = msg;
		document.getElementById('result_popupBoxFooter').innerHTML = '<button onclick="Result.ok(\''+imgName+'\')">ok</button>';
	}
	this.ok = function(imgName){
		document.getElementById('result_popupBox').style.display = "none";
		document.getElementById('result_popupOverlay').style.display = "none";
		if(imgName != 'alert'){
			location.reload();
		}
	}
}

