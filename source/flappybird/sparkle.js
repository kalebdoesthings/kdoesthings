pc.script.attribute('radius', 'number', 1);

pc.script.create('sparkle', function (app) {
    // Creates a new Sparkle instance
    var Sparkle = function (entity) {
        this.entity = entity;
        this.initialPos = null;
    };

    Sparkle.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.initialPos = this.entity.getLocalPosition().clone();

            app.on('ui:sparkle', function () {
                var angle = Math.random() * Math.PI * 2;
                var x = Math.cos(angle) * this.radius * Math.random();
                var y = Math.sin(angle) * this.radius * Math.random();
                this.entity.setLocalPosition(this.initialPos.x + x, this.initialPos.y + y, this.initialPos.z);
            }, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Sparkle;
});