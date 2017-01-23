var board = [{'cellNum':'b1','value':0, 'player':''},
{'cellNum':'b2','value':0, 'player':''},
{'cellNum':'b3','value':0, 'player':''},
{'cellNum':'b4','value':0, 'player':''},
{'cellNum':'b5','value':0, 'player':''},
{'cellNum':'b6','value':0, 'player':''},
{'cellNum':'b7','value':0, 'player':''},
{'cellNum':'b8','value':0, 'player':''},
{'cellNum':'b9','value':0, 'player':''}];

var turn = 'user';
var count = 0 ;
var valueForUse = [1,2,3,4,5,6,7,8,9];
var cellForUse = ["b1","b2","b3","b4","b5","b6","b7","b8","b9"];
var thePlayer = 'user'; 
var winner = '';
var currentRadio = 0;
var userName ='';

//to get a user name from popup when window is loaded
function setUserNameFromPopup(popup_userName){
	 userName = popup_userName;
}


function playGame(cellID){
var radioGroup = document.getElementsByName('radioNum');
var isRadioValid = validatRadio(radioGroup);


		if(isRadioValid){
			if(count<9){
				setValueToCell(cellID);
			}
			else{
				alert('Tied!!!');
				resetAll();
			}//end else
		}
		else{
			Result.render('alert', '<p><span style="font-weight:bold color:red">Please select a value!</span></p>');
			return false;
		}
	
}

function validatRadio(obj){
	//alert('validatRadio');
	var result = 0;
	for(var i=0; i<obj.length; i++){
		if(obj[i].checked==true && obj[i].value!=currentRadio){
			result = 1;
		}
	}
	//alert('validatRadio '+ result);
	return result	
}

//This function will be called after findTheWinner function
function setPlayerToComp(){
	//alert('setPlayerToComp');
	var cellID = getCompCell();
	var comPickValue  = getCompValue();
	setValueToCell(cellID, comPickValue);
}


//to get a computer selected value
function getCompValue(){
	//to get a computer selected value
	var comValueIndex = Math.floor((Math.random() * valueForUse.length));//return a number between the range of avaiable value array length
	var comPickValue = valueForUse[comValueIndex];
	return comPickValue;
}
//to get a computer selected cell
function getCompCell(){
	var comCellIndex = Math.floor((Math.random() * cellForUse.length)); //return a number between the range of avaiable cells array length
	var comPickCell = cellForUse[comCellIndex];
	return comPickCell;

}

function setValueToCell(cellID, cellValueParam){
	console.log('cellValueParam '+ cellValueParam);
	 var boardCell = document.getElementById(cellID);
	 var radioGroup = document.getElementsByName('radioNum');
	 var cellValue;

	boardCell.disabled = true;//disable a cell on the board

	//assign style to a cell depended on a player	
	if(turn == 'comp'){
		boardCell.className += "comp";
	}
	if(turn == 'user'){
		boardCell.className += "user";
	}

	//User's input will fall in this condition
	if (cellValueParam === undefined) {
		//alert('cellValueParam === undefined');
		cellValue = 0;
        //var radioArr =[];
        for(var i=0; i < radioGroup.length ;i++ ){
        	if (radioGroup[i].checked) {
	 			cellValue = radioGroup[i].value; //it return as a string
	 			prevRadio = radioGroup[i].value;  // to store the value for validating a user input
	 			radioGroup[i].className += "invisible";
	 			currentRadio  = parseInt(cellValue);
	 			//alert('cellValueParam currentRadio ' +currentRadio);
	 			break;
	 		}
	 	}
	 }
    //Computer's input will fall in this condition
    else{
    	cellValue = cellValueParam;
    	radioGroup[cellValueParam-1].className += "invisible";
    }

    boardCell.innerHTML = cellValue; // to set the selected value to the cell on the board

	//mimic the Value UI available choice for comp
	var position = valueForUse.indexOf(parseInt(cellValue));
	valueForUse.splice(position,1);
	//console.log('valueForUse '+valueForUse);
	
	//Set value on board
	for(var index in board){
		if(cellID == board[index].cellNum){
			board[index].value = parseInt(cellValue);
			board[index].player = turn; // set athe user to  player value
			
		}

	}//end for

	//mimic the Cell UI available choices for comp
	var cellIndex = cellForUse.indexOf(cellID);
	cellForUse.splice(cellIndex,1);
	count++;
	if(count < 3){ 
		changeTurn();
	}
	else{
		findWinner(turn);
	}	

}//end setValueToCell

function changeTurn(){
	//alert('changeTurn');
	if(winner == ''){
		if(turn == 'user'){
			turn = 'comp';
			setPlayerToComp();
		}
		else{
			turn = 'user';
			radioChange = false;		
		}
	}	
}

//for defering computer choice
function sleep(ms)
{
    var dt = new Date();
    dt.setTime(dt.getTime() + ms);
    while (new Date().getTime() < dt.getTime());
       
}


function findWinner(thePlayer){
	//alert('findWinner');
	var winner = '';
	
	console.log(' findWinner board: ', board);
	if(returnTheWinner(thePlayer, board[0], board[1], board[2])){
		winner = turn;
	}
	if(returnTheWinner(thePlayer, board[3], board[4], board[5])){
		winner = turn;
	}
	if(returnTheWinner(thePlayer, board[6], board[7], board[8])){
		winner = turn;
	}
	if(returnTheWinner(thePlayer, board[0], board[4], board[8])){
		winner = turn;
	}
	if(returnTheWinner(thePlayer, board[2], board[4], board[6])){
		winner = turn;
	}
	if(returnTheWinner(thePlayer, board[0], board[3], board[6])){
		winner = turn;
	}
	if(returnTheWinner(thePlayer, board[1], board[4], board[7])){
		winner = turn;
	}
	if(returnTheWinner(thePlayer, board[2], board[5], board[8])){
		winner = turn;
	}
	
	if(winner != ''){
		endGame(winner);			
	}
	else if(count == 9){
		Result.render('tied','Tied!' );
		//disableAll();	
	}
	else{ changeTurn();}
}//end function

function returnTheWinner(aPlayer, cell1,cell2,cell3){
	if( (cell1.player == aPlayer) && (cell2.player == aPlayer)&& (cell3.player == aPlayer) ){
		var sum = cell1.value + cell2.value + cell3.value;
		if( sum == 15){
			return true;
		}
	}
}//end function returnTheWinner

function endGame(winner) {
	disableAll();	
	if(winner === 'user'){

		if (userName == ''){
			Result.render('winner','The winner is YOU!');
			
		}
		else{ 
			var msg = 'The winner is '+ userName;
			Result.render('winner',msg);					
		}
		
	}
	else{
		Result.render('loser','The winner is a Computer!!!');		
	}		
}

function resetAll(){
	location.reload();
}

function disableAll(){
	for(var i = 1 ;i <10 ; i++){
		var cellID='b'+ i;
		var boardCell = document.getElementById(cellID);
		boardCell.disabled = true;

		var r_ID='r'+ i;
		var r_button =document.getElementById(r_ID)
		r_button.disabled = true;
	}
}