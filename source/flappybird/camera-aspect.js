pc.script.create('camera_aspect', function (app) {
    // Creates a new CameraAspect instance
    var CameraAspect = function (entity) {
        this.entity = entity;
        this.currentOrthoHeight = 1;
    };

    CameraAspect.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.currentOrthoHeight = this.entity.camera.orthoHeight;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var canvas = app.graphicsDevice.canvas;
            var aspect = canvas.width / canvas.height;
            var orthoHeight = pc.math.clamp(0.72 / aspect, 1, 1.28);
            if (orthoHeight !== this.currentOrthoHeight) {
                this.entity.camera.orthoHeight = orthoHeight;
                this.currentOrthoHeight = orthoHeight;
            }
        }
    };

    return CameraAspect;
});