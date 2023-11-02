//--------------- POST EFFECT DEFINITION------------------------//
pc.extend(pc.posteffect, function () {
    // Constructor - Creates an instance of our post effect
    var ScreenTintEffect = function (graphicsDevice) {
        // this is the shader definition for our effect
        this.shader = new pc.Shader(graphicsDevice, {
            attributes: {
                aPosition: pc.SEMANTIC_POSITION
            },
            vshader: [
                "attribute vec2 aPosition;",
                "",
                "varying vec2 vUv0;",
                "",
                "void main(void)",
                "{",
                "    gl_Position = vec4(aPosition, 0.0, 1.0);",
                "    vUv0 = (aPosition.xy + 1.0) * 0.5;",
                "}"
            ].join("\n"),
            fshader: [
                "precision " + graphicsDevice.precision + " float;",
                "",
                "uniform sampler2D uColorBuffer;",
                "uniform vec4 uTint;",
                "",
                "varying vec2 vUv0;",
                "",
                "void main() {",
                    "gl_FragColor = texture2D(uColorBuffer, vUv0) * uTint;",
                "}"
            ].join("\n")
        });

        this.color = new Float32Array(4);
    };

    // Our effect must derive from pc.posteffect.PostEffect
    ScreenTintEffect = pc.inherits(ScreenTintEffect, pc.posteffect.PostEffect);

    ScreenTintEffect.prototype = pc.extend(ScreenTintEffect.prototype, {
        // Every post effect must implement the render method which
        // sets any parameters that the shader might require and
        // also renders the effect on the screen
        render: function (inputTarget, outputTarget, rect) {
            var device = this.device;
            var scope = device.scope;

            // Set the input render target to the shader. This is the image rendered from our camera
            scope.resolve("uColorBuffer").setValue(inputTarget.colorBuffer);
            scope.resolve("uTint").setValue(this.color);

            // Draw a full screen quad on the output target. In this case the output target is the screen.
            // Drawing a full screen quad will run the shader that we defined above
            pc.posteffect.drawFullscreenQuad(device, outputTarget, this.vertexBuffer, this.shader, rect);
        }
    });

    return {
        ScreenTintEffect: ScreenTintEffect
    };
}());

//--------------- SCRIPT DEFINITION------------------------//
pc.script.attribute('color', 'rgb', [1, 1, 1]);

pc.script.create('screenTint', function (app) {

    var ScreenTint = function (entity) {
        this.entity = entity;
        // create an instance of our effect
        this.effect = new pc.posteffect.ScreenTintEffect(app.graphicsDevice);
        
        this.timer = 0;
        this.duration = 0;
        this.startColor = new pc.Color();
        this.endColor = new pc.Color();
        this.transitioning = false;
    };

    ScreenTint.prototype = {
        onEnable: function () {
            // when the script is enabled add our effect to the camera's postEffects queue
            this.entity.camera.postEffects.addEffect(this.effect, false);
        },

        onDisable: function () {
            // when the script is disabled remove our effect from the camera's postEffects queue
            this.entity.camera.postEffects.removeEffect(this.effect);
        },

        transition: function (color, duration) {
            this.startColor.copy(this.color);
            this.endColor.copy(color);
            this.timer = 0;
            this.duration = duration;
            this.transitioning = true;
        },

        update: function (dt) {
            if (this.transitioning) {
                this.timer = pc.math.clamp(this.timer + dt, 0, this.duration);

                var alpha = pc.math.smoothstep(0, 1, this.timer / this.duration);

                this.color.r = pc.math.lerp(this.startColor.r, this.endColor.r, alpha);
                this.color.g = pc.math.lerp(this.startColor.g, this.endColor.g, alpha);
                this.color.b = pc.math.lerp(this.startColor.b, this.endColor.b, alpha);

                if (this.timer === this.duration) {
                    this.transitioning = false;
                }
            }

            this.effect.color = this.color.data;
        }
    };

    return ScreenTint;
});