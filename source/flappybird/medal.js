pc.script.attribute('blank', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('bronze', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('silver', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('gold', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('platinum', 'asset', null, { type: 'material', max: 1 });

pc.script.create('medal', function (app) {
    // Creates a new Medal instance
    var Medal = function (entity) {
        this.entity = entity;
        this.materials = {};
    };

    Medal.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.materials.platinum = app.assets.get(this.platinum).resource;
            this.materials.gold = app.assets.get(this.gold).resource;
            this.materials.silver = app.assets.get(this.silver).resource;
            this.materials.bronze = app.assets.get(this.bronze).resource;
            this.materials.blank = app.assets.get(this.blank).resource;

            app.on('ui:setmedal', function (score) {
                if (score >= 40) {
                    this.entity.model.material = this.materials.platinum;
                } else if (score >= 30) {
                    this.entity.model.material = this.materials.gold;
                } else if (score >= 20) {
                    this.entity.model.material = this.materials.silver;
                } else if (score >= 10) {
                    this.entity.model.material = this.materials.bronze;
                } else {
                    this.entity.model.material = this.materials.blank;
                }
                
                app.root.findByName('Sparkle').enabled = (score >= 10);
            }, this);
        },

        onEnable: function () {
            app.root.findByName('Sparkle').enabled = false;
            this.entity.model.material = this.materials.blank;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Medal;
});