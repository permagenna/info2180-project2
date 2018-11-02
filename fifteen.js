

window.onload = function (){	
		setUpEvents();		
}


function setUpEvents(){
	let box = document.getElementById("puzzlearea").getElementsByTagName("div");
	for (var i = 0; i < box.length; i++){
		box[i].classList.add("puzzlepiece");



	}
	
	
}

document.getElementById('a1').style.backgroundPosition = '0px 0px';