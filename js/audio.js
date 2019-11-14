// Audio
// http://ionden.com/a/plugins/ion.sound/en.html
// http://ionden.com/a/plugins/ion.sound/demo.html

/**
 * Ion.Sound
 * version 3.0.7 Build 89
 * © Denis Ineshin, 2016
 *
 * Project page:    http://ionden.com/a/plugins/ion.sound/en.html
 * GitHub page:     https://github.com/IonDen/ion.sound
 *
 * Released under MIT licence:
 * http://ionden.com/a/plugins/licence-en.html
 */

const allowAudio = false;
if (!allowAudio) {
	document.getElementById('audioButton').style.display = 'none';
}

function initAudio(tis) {
	// Audio for mobile must be initiated with user input hence the button
	document.getElementById('audioButton').style.display = 'none';

	ion.sound({
	    sounds: [
	        {
	            name: "bell_ring",
	            multiplay: false,
	            volume: 0.5
	        },
	        //{
	        //    name: "_landing_2",
	        //    volume: 0.2
	        //}
	    ],
	    volume: 0.5,
	    path: "audio/",
	    preload: true
	});
}

// Call sound with
// ion.sound.play('bell_ring');
