pc.script.attribute('speed', 'number', 1);
pc.script.attribute('startEvent', 'string', 'start');
pc.script.attribute('stopEvent', 'string', 'stop');
pc.script.attribute('finishEvent', 'string', 'finish');

pc.script.create('spriteanim', function (app) {
    // Creates a new SpriteAnim instance
    var SpriteAnim = function (entity) {
        this.entity = entity;
        this.time = 0;
        this.frozen = false;
        this.paused = false;
        this.lastFrame = 0;
    };

    SpriteAnim.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            app.on(this.startEvent, function () {
                this.frozen = false;
            }, this);
            app.on(this.stopEvent, function () {
                this.frozen = true;
            }, this);
            app.on('game:pause', function () {
                this.paused = true;
            }, this);
            app.on('game:unpause', function () {
                this.paused = false;
            }, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (!this.frozen && !this.paused) {
                this.time += dt;
                var children = this.entity.getChildren();
                var currentFrame = Math.floor(this.time * this.speed) % children.length;

                for (var i = 0; i < children.length; i++) {
                    children[i].enabled = (currentFrame === i);
                }

                if ((currentFrame === 0) && (this.lastFrame === 0)) {
                    app.fire(this.finishEvent);
                }
                this.lastFrame = currentFrame;
            }
        }
    };

    return SpriteAnim;
});