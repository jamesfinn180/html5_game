// Controls
(function() {
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        // KEYBOARD
        if (event.type.indexOf('key') > -1) {
            switch(code) {
                case 32:
                    key = 'SPACE'; break;
                case 37:
                    key = 'LEFT'; break;
                case 38:
                    key = 'UP'; break;
                case 39:
                    key = 'RIGHT'; break;
                case 40:
                    key = 'DOWN'; break;
                default:
                    // Convert ASCII codes to letters
                    // for WASD key input
                    key = String.fromCharCode(code);
            }
            event.preventDefault();
        }
        // MOBILE TOUCH
        else if (event.type.indexOf('touch') > -1) {
            for (var i=0; i<event.targetTouches.length; i+=1) {
                var t = event.targetTouches[i];

                if (t.clientX < 200) {
                    key = 'LEFT';
                    pressedKeys['RIGHT'] = false;
                }
                if (t.clientX >= 200) {
                    key = 'RIGHT';
                    pressedKeys['LEFT'] = false;
                }
            }
        }
        pressedKeys[key] = status;
    }


    document.addEventListener('keydown', function(e) {
        e.preventDefault();
        setKey(e, true);
    });
    document.addEventListener('touchstart', function(e) {
        e.preventDefault();
        setKey(e, true);
    }, {passive: false});
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
        setKey(e, true);
    }, {passive: false});


    document.addEventListener('keyup', function(e) {
        e.preventDefault();
        setKey(e, false);
    });
    document.addEventListener('touchend', function(e) {
        e.preventDefault();
        pressedKeys = {};
    }, {passive: false});


    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();
