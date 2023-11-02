pc.script.attribute('event', 'string', 'tween');
pc.script.attribute('duration', 'number', 1);
pc.script.attribute('startPos', 'vector', [0, 0, 0]);
pc.script.attribute('endPos', 'vector', [0, 0, 0]);
pc.script.attribute('startScale', 'vector', [1, 1, 1]);
pc.script.attribute('endScale', 'vector', [1, 1, 1]);
pc.script.attribute('easing', 'enumeration', 1, {
    enumerations: [{
       name: 'Linear',
       value: 0
    }, {
       name: 'Quadratic',
       value: 1
    }, {
       name: 'Cubic',
       value: 2
    }, {
       name: 'Quartic',
       value: 3
    }, {
       name: 'Quintic',
       value: 4
    }, {
       name: 'Sinusoidal',
       value: 5
    }, {
       name: 'Exponential',
       value: 6
    }, {
       name: 'Circular',
       value: 7
    }, {
       name: 'Elastic',
       value: 8
    }, {
       name: 'Back',
       value: 9
    }, {
       name: 'Bounce',
       value: 10
    }]
});
pc.script.attribute('inOut', 'enumeration', 0, {
    enumerations: [{
       name: 'In',
       value: 0
    }, {
       name: 'Out',
       value: 1
    }, {
       name: 'InOut',
       value: 2
    }]
});

pc.script.create('tween', function (app) {
    var easingFuncs = [
        [TWEEN.Easing.Linear.None, TWEEN.Easing.Linear.None, TWEEN.Easing.Linear.None],
        [TWEEN.Easing.Quadratic.In, TWEEN.Easing.Quadratic.Out, TWEEN.Easing.Quadratic.InOut],
        [TWEEN.Easing.Cubic.In, TWEEN.Easing.Cubic.Out, TWEEN.Easing.Cubic.InOut],
        [TWEEN.Easing.Quartic.In, TWEEN.Easing.Quartic.Out, TWEEN.Easing.Quartic.InOut],
        [TWEEN.Easing.Quintic.In, TWEEN.Easing.Quintic.Out, TWEEN.Easing.Quintic.InOut],
        [TWEEN.Easing.Sinusoidal.In, TWEEN.Easing.Sinusoidal.Out, TWEEN.Easing.Sinusoidal.InOut],
        [TWEEN.Easing.Exponential.In, TWEEN.Easing.Exponential.Out, TWEEN.Easing.Exponential.InOut],
        [TWEEN.Easing.Circular.In, TWEEN.Easing.Circular.Out, TWEEN.Easing.Circular.InOut],
        [TWEEN.Easing.Elastic.In, TWEEN.Easing.Elastic.Out, TWEEN.Easing.Elastic.InOut],
        [TWEEN.Easing.Back.In, TWEEN.Easing.Back.Out, TWEEN.Easing.Back.InOut],
        [TWEEN.Easing.Bounce.In, TWEEN.Easing.Bounce.Out, TWEEN.Easing.Bounce.InOut]
    ];
    
    // Creates a new Tween instance
    var Tween = function (entity) {
        this.entity = entity;
        this.tween = this;
    };

    Tween.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var e = this.entity;

            this.initialPos = this.entity.getPosition().clone();
            this.initialScl = this.entity.getLocalScale().clone();
            
            app.on(this.event, function () {
                var startState = { 
                    px: this.startPos.x, py: this.startPos.y, pz: this.startPos.z,
                    sx: this.startScale.x, sy: this.startScale.y, sz: this.startScale.z 
                };
                var endState = {
                    px: this.endPos.x, py: this.endPos.y, pz: this.endPos.z,
                    sx: this.endScale.x, sy: this.endScale.y, sz: this.endScale.z 
                };
                this.tween = new TWEEN.Tween(startState)
                    .to(endState, Math.floor(this.duration * 1000) )
                    .easing(easingFuncs[this.easing][this.inOut])
                    .onUpdate(function () {
                        e.setPosition(this.px, this.py, this.pz);
                        e.setLocalScale(this.sx, this.sy, this.sz);
                    });
                this.tween.start();
            }, this);
        },
        
        onEnable: function () {
            this.entity.setPosition(this.initialPos);
            this.entity.setLocalScale(this.initialScl);
        },

        onAttributeChanged: function (name, oldValue, newValue) {
            app.fire(this.event);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Tween;
});