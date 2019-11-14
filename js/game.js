// GAME
var now = new Date();
var gameSpeed = 2;

function Player(x, y) {
	this.pos = [x,y];
	this.speed = 5;
	this.name = 'player';
	this.w = 54;
	this.h = 54;
	this.hitOffset = 0;
	this.render = true;

	this.sprite = Sprite({
		sx: 0,
		sy: 80,
		width: 270,
		height: 54,
		image: spriteImage,
		numberOfFrames: 5,
		ticksPerFrame: 6
	})
}

function Coin(x, y) {
	this.pos = [x,y];
	this.speed = 0;
	this.name = 'coin';
	this.w = 40;
	this.h = 40;
	this.render = true;

	this.sprite = Sprite({
		sx: 0,
		sy: 0,
		width: 440,
		height: 40,
		image: spriteImage,
		numberOfFrames: 10,
		ticksPerFrame: 4
	})
}

function Bg(x, y) {
	this.pos = [x, y];
	this.speed = 3;
	this.name = 'bg';
	this.w = c.width;
	this.h = c.height;
	this.render = true;

	this.draw = function() {
		ctx.drawImage(
			bgImage,
			this.pos[0],
			this.pos[1],
			c.width,
			c.height
		)
	}
}

// Setup initial game objects
var player = new Player(100, 100);
var bgArr = [new Bg(0, 0), new Bg(0, c.height-50), new Bg(0, (c.height*2)-100)];
var gameEntities = [player, new Coin(c.width-44,0), new Coin(0,0), new Coin(0,c.height-40), new Coin(c.width-44,c.height-40)];


// Load sprite sheet and then start game
spriteImage.addEventListener('load', gameLoop);