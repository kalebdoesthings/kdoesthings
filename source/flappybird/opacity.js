pc.script.attribute('event', 'string', 'ui:fade');
pc.script.attribute('startOpacity', 'number', 0);
pc.script.attribute('endOpacity', 'number', 1);
pc.script.attribute('fadeTime', 'number', 0.25);

pc.script.create('opacity', function (app) {
    // Creates a new Opacity instance
    var Opacity = function (entity) {
        this.entity = entity;
        this.timer = 0;
    };

    Opacity.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            app.on(this.event, function () {
                this.timer = this.fadeTime;
            }, this);
        },
        
        setOpacity: function (opacity) {
            var material = this.entity.model.material;
            material.opacity = opacity;
            material.update();
        },

        onEnable: function () {
            this.setOpacity(this.startOpacity);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (this.timer > 0) {
                this.timer = pc.math.clamp(this.timer - dt, 0, this.fadeTime);
                var opacity = pc.math.lerp(this.startOpacity, this.endOpacity, 1 - this.timer / this.fadeTime);
                this.setOpacity(opacity);
            }
        }
    };

    return Opacity;
});