pc.script.attribute('flapVelocity', 'number', 1);
pc.script.attribute('gravity', 'number', 5);
pc.script.attribute('lowestHeight', 'number', -0.25);
pc.script.attribute('radius', 'number', 0.068);

pc.script.create('bird', function (app) {
    // Creates a new Bird instance
    var Bird = function (entity) {
        this.entity = entity;
        this.flapListener = null;
        this.velocity = 0;
        this.state = 'ready';
        this.pipes = [];
        this.initialPos = null;
        this.initialRot = null;
    };

    Bird.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.initialPos = this.entity.getPosition().clone();
            this.initialRot = this.entity.getRotation().clone();

            var pipe = app.root.findByName('Pipes').findByName('Pipe 1');
            this.pipes.push(pipe.findByName('Pipe Up'));
            this.pipes.push(pipe.findByName('Pipe Down'));
            pipe = app.root.findByName('Pipes').findByName('Pipe 2');
            this.pipes.push(pipe.findByName('Pipe Up'));
            this.pipes.push(pipe.findByName('Pipe Down'));
            
            app.on('game:pause', function () {
                this.state = 'paused';
            }, this);
            app.on('game:unpause', function () {
                this.state = 'play';
            }, this);
        },

        onEnable: function () {
            this.flapListener = this.flap.bind(this);
            window.addEventListener('mousedown', this.flapListener, false);
            window.addEventListener('touchstart', this.flapListener, false);
            this.state = 'getready';
        },

        onDisable: function () {
            window.removeEventListener('mousedown', this.flapListener, false);
            window.removeEventListener('touchstart', this.flapListener, false);
        },
        
        reset: function () {
            this.velocity = 0;
            this.state = 'getready';
            this.entity.setPosition(this.initialPos);
            this.entity.setRotation(this.initialRot);
            app.fire('bird:flapstart');
        },

        flap: function () {
            if (this.state === 'getready') {
                app.fire('game:play');
                this.state = 'play';
            }

            if (this.state === 'play') {
                app.fire('game:audio', 'Flap');
                this.velocity = this.flapVelocity;
            }
        },

        die: function (hitPipe) {
            this.state = 'dead';
            app.fire('game:audio', 'Hit');
            app.fire('bird:flapstop');
            app.fire('game:gameover');
            if (hitPipe) {
                setTimeout(function () {
                    app.fire('game:audio', 'Die');
                }, 500);
            }
        },

        circleRectangleIntersect: function  (circle, rect) {
            var distX = Math.abs(circle.x - rect.x - rect.w / 2);
            var distY = Math.abs(circle.y - rect.y - rect.h / 2);

            if (distX > (rect.w / 2 + circle.r)) {
                return false;
            }
            if (distY > (rect.h / 2 + circle.r)) {
                return false;
            }

            if (distX <= (rect.w / 2)) {
                return true;
            }
            if (distY <= (rect.h / 2)) {
                return true;
            }

            var dx = distX - rect.w / 2;
            var dy = distY - rect.h / 2;
            return (dx * dx + dy * dy <= (circle.r * circle.r));
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (this.state === 'play') {
                if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
                    this.flap();
                }
            }

            var pos = this.entity.getPosition();
            if ((this.state === 'play') || (this.state === 'dead')) {
                if (pos.y >= this.lowestHeight) {
                    this.velocity -= this.gravity * dt;
                    this.entity.translate(0, this.velocity * dt, 0);

                    // Map range -0.75 to -2 to 22.5 to -90
                    var zrot = pc.math.clamp(this.velocity, -2, -0.75);
                    zrot += 1;
                    this.entity.setLocalEulerAngles(0, 0, zrot * 90);
                }
            }

            if (this.state === 'play') {
                // Check for collision with ground
                if (pos.y < this.lowestHeight) {
                    this.die(false);
                }

                // Check for collision with pipes
                var circle = { x: pos.x, y: pos.y, r: this.radius };
                var rect = {};
                for (var i = 0; i < this.pipes.length; i++) {
                    var pipe = this.pipes[i];
                    var aabb = pipe.model.model.meshInstances[0].aabb;
                    var min = aabb.getMin();
                    var max = aabb.getMax();
                    rect.x = min.x;
                    rect.y = min.y;
                    rect.w = max.x - min.x;
                    rect.h = (pipe.name === 'Pipe Down') ? 1000 : max.y - min.y;
                    
                    if (this.circleRectangleIntersect(circle, rect)) {
                        this.die(true);
                    }
                }
            }
        }
    };

    return Bird;
});