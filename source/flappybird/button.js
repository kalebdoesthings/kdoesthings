pc.script.attribute('diplacement', 'number', 0.00390625);
pc.script.attribute('event', 'string');

pc.script.create('button', function (app) {
    // Creates a new Button instance
    var Button = function (entity) {
        this.entity = entity;
        this.pressed = false;
        this.min = new pc.Vec3();
        this.max = new pc.Vec3();
    };

    Button.prototype = {
        checkForClick: function (x, y) {
            var cameraEntity = app.root.findByName('Camera');
            var aabb = this.entity.model.model.meshInstances[0].aabb;
            cameraEntity.camera.worldToScreen(aabb.getMin(), this.min);
            cameraEntity.camera.worldToScreen(aabb.getMax(), this.max);
            if ((x >= this.min.x) && (x <= this.max.x) &&
                (y >= this.max.y) && (y <= this.min.y)) {
                return true;
            }
            return false;
        },

        press: function (x, y) {
            if (this.checkForClick(x, y)) {
                this.pressed = true;
                this.entity.translate(0, -this.diplacement, 0);
            }
        },

        release: function () {
            if (this.pressed) {
                this.pressed = false;
                this.entity.translate(0, this.diplacement, 0);
                app.fire(this.event);
                app.fire('game:audio', 'Swoosh');
            }
        },

        onEnable: function () {
            this.mouseDownListener = function (e) {
                this.press(e.clientX, e.clientY);
            }.bind(this);
            this.mouseUpListener = function (e) {
                this.release();
            }.bind(this);
            window.addEventListener('mousedown', this.mouseDownListener, false);
            window.addEventListener('mouseup', this.mouseUpListener, false);

            this.touchStartListener = function (e) {
                var touch = e.changedTouches[0];
                this.press(touch.clientX, touch.clientY);
            }.bind(this);
            this.touchEndListener = function (e) {
                this.release();
            }.bind(this);
            window.addEventListener('touchstart', this.touchStartListener, false);
            window.addEventListener('touchend', this.touchEndListener, false);
        },

        onDisable: function () {
            this.pressed = false;
            window.removeEventListener('mousedown', this.mouseDownListener, false);
            window.removeEventListener('mouseup', this.mouseUpListener, false);
            window.removeEventListener('touchstart', this.touchStartListener, false);
            window.removeEventListener('touchend', this.touchEndListener, false);
        }
    };

    return Button;
});