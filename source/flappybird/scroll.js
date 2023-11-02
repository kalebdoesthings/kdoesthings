pc.script.attribute('startEvent', 'string', 'start');
pc.script.attribute('stopEvent', 'string', 'stop');
pc.script.attribute('resetEvent', 'string', 'reset');
pc.script.attribute('cycleEvent', 'string', 'cycle');
pc.script.attribute('startX', 'number', 1);
pc.script.attribute('endX', 'number', -1);
pc.script.attribute('speed', 'number', 1);
pc.script.attribute('frozen', 'boolean', false);

pc.script.create('scroll', function (app) {
    // Creates a new Scroll instance
    var Scroll = function (entity) {
        this.entity = entity;
        this.initialPos = null;
        this.initialRot = null;
        this.frozen = false;
        this.paused = false;
    };

    Scroll.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.initialPos = this.entity.getPosition().clone();
            this.initialRot = this.entity.getRotation().clone();

            app.on(this.resetEvent, function () {
                this.entity.setPosition(this.initialPos);
                this.entity.setRotation(this.initialRot);
            }, this);
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
                var pos = this.entity.getLocalPosition();
                if (pos.x < this.endX) {
                    this.entity.setLocalPosition(this.startX, pos.y, pos.z);
                    app.fire(this.cycleEvent);
                }
                this.entity.translate(this.speed, 0, 0);
            }
        }
    };

    return Scroll;
});