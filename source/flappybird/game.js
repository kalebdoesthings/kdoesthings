pc.script.create('game', function (app) {
    var black = new pc.Color(0, 0, 0);
    var white = new pc.Color(1, 1, 1);

    // The correct way to verify the availability of the local storage API taken from:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API    
    function storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    
    // Creates a new Game instance
    var Game = function (entity) {
        this.entity = entity;
        this.score = 0;
        this.bestScore = 0;
        if (storageAvailable('localStorage')) {
            this.bestScore = localStorage.getItem('Flappy Bird Best Score');
            if (this.bestScore === null) {
                this.bestScore = 0;
            }
        }
    };

    Game.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            app.on('game:menu', function () {
                var camera = app.root.findByName('Camera');
                camera.script.screenTint.transition(black, 0.25);
                setTimeout(function () {
                    app.root.findByName('Game').findByName('Bird').enabled = false;
                    app.fire('pipes:reset');
                    app.fire('ground:start');

                    app.root.findByName('Game Over Screen').enabled = false;
                    app.root.findByName('Menu Screen').enabled = true;

                    camera.script.screenTint.transition(white, 0.25);
                }, 250);
            }, this);

            app.on('game:getready', function () {
                this.score = 0;
                app.fire('ui:score', this.score);

                var camera = app.root.findByName('Camera');
                camera.script.screenTint.transition(black, 0.25);
                setTimeout(function () {
                    app.root.findByName('Menu Screen').enabled = false;
                    app.root.findByName('Game Screen').enabled = true;
                    camera.script.screenTint.transition(white, 0.25);

                    var bird = app.root.findByName('Game').findByName('Bird');
                    bird.enabled = true;
                    bird.script.bird.reset();
                }, 250);
            }, this);

            app.on('game:play', function () {
                app.fire('pipes:start');
                app.fire('ui:fadegetready');
            }, this);

            app.on('game:pause', function () {
                app.root.findByName('Pause Button').enabled = false;
                app.root.findByName('Play Button').enabled = true;
            }, this);

            app.on('game:unpause', function () {
                app.root.findByName('Pause Button').enabled = true;
                app.root.findByName('Play Button').enabled = false;
            }, this);

            app.on('game:gameover', function () {
                app.root.findByName('Game Screen').enabled = false;
                app.root.findByName('Game Over Screen').enabled = true;
                app.root.findByName('New').enabled = this.score > this.bestScore;
                this.bestScore = Math.max(this.score, this.bestScore);
                if (storageAvailable('localStorage')) {
                    localStorage.setItem('Flappy Bird Best Score', this.bestScore.toString());
                }
                app.fire('pipes:stop');
                app.fire('ground:stop');
                app.fire('ui:fade');
                app.fire('game:audio', 'Swoosh');
                setTimeout(function () {
                    app.fire('ui:showscoreboard', this.score);
                    app.fire('ui:current', this.score);
                    app.fire('ui:best', this.bestScore);
                    app.fire('game:audio', 'Swoosh');
                }.bind(this), 500);
                setTimeout(function () {
                    app.fire('ui:setmedal', this.score);
                }.bind(this), 1000);
            }, this);

            app.on('game:addscore', function () {
                this.score++;
                app.fire('game:audio', 'Point');
                app.fire('ui:score', this.score);
            }, this);
            
            app.on('game:share', function () {
                var left = (screen.width / 2) - (640 / 2);
                var top = (screen.height / 2) - (380 / 2);

                var shareText = encodeURIComponent("I scored " + this.score + " in Flappy Bird! Beat that! http://flappybird.playcanvas.com/ Powered by @playcanvas #webgl #html5");
                var shareUrl = "https://twitter.com/intent/tweet?text=" + shareText;

                var popup = window.open(shareUrl, 'name', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + 640 + ', height=' + 380 +', top=' + top + ', left=' + left);
                if (window.focus && popup)
                    popup.focus();
            }, this);
            
            app.on('game:audio', function (slot) {
                this.entity.sound.play(slot);
            }, this);
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            // We have to update the tween.js engine somewhere once a frame.
            // Here's as good a place as any.
            TWEEN.update();
        }
    };

    return Game;
});