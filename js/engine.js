// GAME ENGINE
// Create the canvas
var c = document.getElementById('canvas');
var ctx = c.getContext('2d', {alpha: false});

var BROWSER = browserDetect();
c.width = (BROWSER.mobile) ? window.innerWidth : 450;
c.height = (BROWSER.mobile) ? window.innerHeight : 580;


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
  		  window.webkitRequestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	      window.msRequestAnimationFrame ||
	      window.oRequestAnimationFrame ||
          function(callback) {
            	window.setTimeout(callback, 1000 / 60);
          };
})();

/* Update game objects and render them */
// ======================================
function gameLoop() {
  	window.requestAnimFrame(gameLoop);

  	handleInput();
  	gameUpdate();
  	gameRender();
}

/* Called every frame and updates all game entity objects */
// =========================================================
function gameUpdate() {
	// Update and/or remove background
	for (let i=0; i<bgArr.length; i+=1) {
		bgArr[i].pos[1] -= gameSpeed;

		if (bgArr[i].pos[1] <= -bgArr[i].h) {
			bgArr.push(new Bg(0, (c.height*2)-100));
			bgArr.splice(i, 1);
		}
	}

	// Update/remove check collision for all game objects
	for (let i=0; i<gameEntities.length; i+=1) {
		gameEntities[i].sprite.update();
		checkCollision(gameEntities[i]);
		if (!gameEntities[i].render) {
			gameEntities.splice(i, 1);
		}
	}
}


/* Draw all game entity objects */
// ===============================
function gameRender() {
	// Clear screen
  	ctx.clearRect(0, 0, c.width, c.height);
	// Render Backgrounds
	for (let i=0; i<bgArr.length; i+=1) {
		renderBg(bgArr[i]);
	}
	// Render Game Objects
	for (let i=0; i<gameEntities.length; i+=1) {
		renderEntity(gameEntities[i]);
	}
}

function renderEntity(entity) {
	ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

function renderBg(bg) {
    bg.draw();
}


/* Update player position and sprite based on user input */
// ========================================================
function handleInput() {
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += player.speed;
    }
    if (input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= player.speed;
    }
    if (input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= player.speed;
        player.sprite.sy = 139;
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += player.speed;
        player.sprite.sy = 80;
    }
} 

/* Collision function */
// =====================
function checkCollision(obj) {
	if (obj.name !== 'player') {
		if (
			player.pos[0]+player.hitOffset < obj.pos[0]+obj.w && 
			player.pos[0]+player.w-player.hitOffset > obj.pos[0] &&
			player.pos[1]+player.hitOffset < obj.pos[1]+obj.h && 
			player.pos[1]+player.h-player.hitOffset > obj.pos[1]
		) {
			obj.render = false;
		}
	}
}
