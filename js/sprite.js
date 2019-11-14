// Sprite
const debug = true;

function Sprite(options) {
	var s = {},
	frameIndex = 0,
	tickCount = 0,
	ticksPerFrame = options.ticksPerFrame || 0,
	numberOfFrames = options.numberOfFrames || 1

	//console.log(options.sx, options.sy, options.sx, options.sy, options.width, options.height)
	
	s.sx = options.sx;
	s.sy = options.sy;
	s.width = options.width;
	s.height = options.height;
	s.image = options.image;
	
	s.update = function () {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
			tickCount = 0;
            if (frameIndex < numberOfFrames - 1) {
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };
	
	s.render = function () {
		// Draw the animation
		ctx.drawImage(
		    s.image,								// image
		    frameIndex * s.width/numberOfFrames,	// x where to clip image
		    s.sy,									// y where to clip image
		    s.width/numberOfFrames,					// width clip image
		    s.height,								// height clip image
		    0,										// x coord to draw image (gets translated)
		    0,										// y coord to draw image (gets translated)
		    s.width/numberOfFrames,					// width to draw
		    s.height								// height to draw
		);
		if (debug) {
			ctx.beginPath();
			ctx.rect(0, 0, s.width / numberOfFrames, s.height);
			ctx.stroke();
		}
	};
	return s;
}


// Create sprite sheet
spriteImage = new Image();	
spriteImage.src = 'img/sprite.png';

bgImage = new Image();	
bgImage.src = 'img/snowfield.png';