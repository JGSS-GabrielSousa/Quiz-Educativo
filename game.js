const left_arrow_keycode = 37;
const up_arrow_keycode = 38;
const right_arrow_keycode = 39;
const a_keycode = 65;
const w_keycode = 87;
const d_keycode = 68;

let player1 = {
	x: 200,
	y: 200,
	x_velocity: 0,
	y_velocity: 0,
	jump : true,
	height: 20,
	width: 20
};

let player2 = player1;

// The status of the arrow keys
let keys1 = {
	right: false,
	left: false,
	up: false,
};
let keys2 = keys1;

// The friction and gravity to show realistic movements
const gravity = 0.6;
const friction = 0.7;

let platforms = [];

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.height = window.screen.height*0.5;
ctx.canvas.width = window.screen.width*0.5;


function rendercanvas(){
	ctx.fillStyle = "#F0F8FF";
	ctx.fillRect(0, 0, 500, 500);
}

function renderplayer(){
	ctx.fillStyle = "#FF1111";
	ctx.fillRect((player1.x)-20, (player1.y)-20, player1.width, player1.height);
	
	ctx.fillStyle = "#1111FF";
	ctx.fillRect((player2.x)-20, (player2.y)-20, player2.width, player2.height);
}

function createPlatform(){
	for(i = 0; i < 4; i++) {
		platforms.push(
			{
				x: 100 * i,
				y: 200 + (30 * i),
				width: 150,
				height: 15
			}
		);
	}
}

// Function to render platforms
function renderplat(){
	ctx.fillStyle = "#45597E";
	
	for (let i = 0; i < platforms.length; i++) {
		ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);	
	}
}

// This function will be called when a key on the keyboard is pressed
function keydown(e) {
	if(e.keyCode == left_arrow_keycode) {
		keys1.left = true;
	}
	if(e.keyCode == up_arrow_keycode) {
		if(player1.jump == false) {
			player1.y_velocity = -10;
		}
	}
	if(e.keyCode == right_arrow_keycode) {
		keys1.right = true;
	}

	if(e.keyCode == a_keycode) {
		keys2.left = true;
	}
	if(e.keyCode == w_keycode) {
		if(player2.jump == false) {
			player2.y_velocity = -10;
		}
	}
	if(e.keyCode == d_keycode) {
		keys2.right = true;
	}
}

// This function is called when the pressed key is released
function keyup(e) {
	if(e.keyCode == left_arrow_keycode) {
		keys.left = false;
	}
	if(e.keyCode == up_arrow_keycode) {
		if(player.y_velocity < -2) {
		player.y_velocity = -3;
		}
	}
	if(e.keyCode == right_arrow_keycode) {
		keys.right = false;
	}
}

function restart_game(){
	if(player.y < 0 ||
	   player.y > ctx.canvas.height ||
	   player.x < 0 ||
	   player.x > ctx.canvas.width
	){
		location.reload();
	}
}

function colisions(){
	let i = -1;

	for (let i = 0; i < platforms.length; i++) {
		const element = array[i];
	}

	if(platforms[0].x < player.x && player.x < platforms[0].x + platforms[0].width &&
	platforms[0].y < player.y && player.y < platforms[0].y + platforms[0].height){
		i = 0;
	}
	if(platforms[1].x < player.x && player.x < platforms[1].x + platforms[1].width &&
	platforms[1].y < player.y && player.y < platforms[1].y + platforms[1].height){
		i = 1;
	}
	if (i > -1){
		player.jump = false;
		player.y = platforms[i].y;    
	}
}

function game_loop() {
	restart_game();

	// If the player is not jumping apply the effect of frictiom
	if(player.jump == false) {
		player.x_velocity *= friction;
	} else {
		// If the player is in the air then apply the effect of gravity
		player.y_velocity += gravity;
	}
	player.jump = true;
	// If the left key is pressed increase the relevant horizontal velocity
	if(keys.left) {
		player.x_velocity = -2.5;
	}
	if(keys.right) {
		player.x_velocity = 2.5;
	}
	// Updating the y and x coordinates of the player
	player.y += player.y_velocity;
	player.x += player.x_velocity;
	
	// A simple code that checks for collions with the platform
	colisions();

	// Rendering the canvas, the player and the platforms
	rendercanvas();
	renderplayer();
	renderplat();
}

function game_bootstrap(){
	canvas.style.display = "block";
	document.getElementById("main-menu").style.display = "none";

	createPlatform();

	// Adding the event listeners
	document.addEventListener("keydown",keydown);
	document.addEventListener("keyup",keyup);
	setInterval(game_loop,22);
}