let empty_x = 300; //Keeps track of empty piece
let empty_y = 300;


window.onload = function(){
	grid ();
	shuffle();
	movePiece();
	pic();
}

//Change background picture
function pic(){

  var area = document.getElementById("controls");
  var i=0;
  var button = document.createElement("BUTTON");
  var text = document.createTextNode("Change background picture");
  button.appendChild(text);
  area.appendChild(button);
  var images= ["url('http://www4.pictures.zimbio.com/gi/Neymar+Brazil+v+Chile+Round+16+2014+FIFA+World+hpntXA-Tt8Tl.jpg')","url('https://i.dailymail.co.uk/i/pix/2017/12/13/11/473892B200000578-0-image-a-1_1513165531839.jpg')","url('https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/06/23/21/neymargoal.jpg?w968h681')","url('https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/08/02/13/neymar0208aaa.jpg')"];
  button.onclick= function(){
	i++;
	if(i>3){
	i=0;
	}
	
	let box = document.getElementById("puzzlearea").getElementsByTagName("div");
	for(let j = 0; j < box.length; j++){
		box[j].style.backgroundSize ="400px 400px"; 
		box[j].style.backgroundImage=images[i];
	}		
  }
}

//Set up the puzzle and background
function grid (){
	let box = document.getElementById("puzzlearea").getElementsByTagName("div");
	let shuffle_button = document.getElementById("shufflebutton");
	for(let i = 0; i < box.length; i++){
        box[i].style.backgroundSize ="400px 400px"; 
		box[i].className = "puzzlepiece";
		box[i].style.left = (i%4)*100 + "px";
		box[i].style.top = (Math.floor(i/4)*100) + "px";
		box[i].style.backgroundPosition= '-' + box[i].style.left + ' ' + '-' + box[i].style.top;
		box[i].addEventListener("mouseover",function(){
			let piece = {x : parseInt(box[i].style.left), y : parseInt(box[i].style.top)};
			let empty_piece = {x : empty_x, y : empty_y};
			if(moveable_piece(piece, empty_piece)){
				box[i].className = "puzzlepiece movablepiece";
			}else{
				box[i].className = "puzzlepiece";
			}
		});
			
	}
}
//Actual Piece movement
function move_piece(piece, empty_piece){
	let temp_piece = {x : empty_piece.x , y : empty_piece.y};
	empty_piece = {x : piece.x , y : piece.y};
	piece = {x : temp_piece.x , y : temp_piece.y};
	return [piece, empty_piece];
}

//Shuffles the puzzle
function shuffle(){
	let box = document.getElementById("puzzlearea").getElementsByTagName("div");
	let shuffle_button = document.getElementById("shufflebutton");
	for(let i = 0; i < box.length; i++){
		shuffle_button.addEventListener("click",function(){
			let move_piece_list = [];
			for(let j = 0; j < 5; j++){
				for(let i = 0; i < box.length; i++){
					let piece = {x : parseInt(box[i].style.left), y : parseInt(box[i].style.top)};
					let empty_piece = {x : empty_x, y : empty_y};
					if(moveable_piece(piece, empty_piece)){
						let result = move_piece_list.indexOf(box[i]);
						if(result === -1){
							move_piece_list.push(box[i]);
						}
					}else{
						let result = move_piece_list.indexOf(box[i]);
						if(result > -1){
							move_piece_list.splice(result,1);
						}
					}
				}
				let random_index = Math.floor(Math.random()*move_piece_list.length);
				let tile = {x : parseInt(move_piece_list[random_index].style.left), y : parseInt(move_piece_list[random_index].style.top)};
				let empty_tile = {x : empty_x, y : empty_y};
				let arr = move_piece(tile, empty_tile);
				move_piece_list[random_index].style.left = arr[0].x + "px";
				move_piece_list[random_index].style.top = arr[0].y + "px";
				empty_x = arr[1].x;
				empty_y = arr[1].y;
			}
		});
	}
}

//mOVES Piece
function movePiece (){
	let box = document.getElementById("puzzlearea").getElementsByTagName("div");
	for(let i = 0; i < box.length; i++){
		box[i].addEventListener("click",function(){
			let piece = {x : parseInt(box[i].style.left) , y : parseInt(box[i].style.top)};
			let empty_piece = {x : empty_x, y : empty_y};
			if(moveable_piece(piece, empty_piece)){
				let result = move_piece(piece, empty_piece);
				piece = {x : result[0].x , y : result[0].y};
				empty_piece = {x: result[1].x , y : result[1].y};
				box[i].style.left = piece.x + "px";
				box[i].style.top = piece.y + "px";
				empty_x = empty_piece.x;
				empty_y = empty_piece.y;
			}
		});
	}
}

//Checks to see if a piece can be moved
function moveable_piece(piece, empty_piece){
	if(piece.x === empty_piece.x){
		if(Math.abs(piece.y - empty_piece.y)<=100){
			return true;
		}
	}else{
		if(piece.y === empty_piece.y){
			if(Math.abs(piece.x - empty_piece.x)<=100){
				return true;
			}
		}else{
			return false;
		}
	}
	return false;
}