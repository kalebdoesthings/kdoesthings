pc.script.attribute('center', 'boolean', false);
pc.script.attribute('name', 'string', 'score');
pc.script.attribute('zero', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('one', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('two', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('three', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('four', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('five', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('six', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('seven', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('eight', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('nine', 'asset', null, { type: 'material', max: 1 });
pc.script.attribute('blank', 'asset', null, { type: 'material', max: 1 });

pc.script.create('score', function (app) {
    function splitNumber(number) {
        var output = [];
        var numberStr = number.toString();

        for (var i = 0, len = numberStr.length; i < len; i++) {
            output.push(+numberStr.charAt(i));
        }
        return output;
    }
    
    // Creates a new Score instance
    var Score = function (entity) {
        this.entity = entity;
        this.materials = [];
    };

    Score.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'blank'];
            for (var i = 0, len = digits.length; i < len; i++) {
                var material = app.assets.get(this[digits[i]]).resource;
                this.materials.push(material);
            }

            app.on('ui:' + this.name, function (score) {
                var splitScore = splitNumber(score);
                var scoreLength = splitScore.length;
                var displayLength = this.entity.getChildren().length;

                while (splitScore.length < displayLength) {
                    splitScore.unshift(10);
                }
                
                for (var i = 0; i < displayLength; i++) {
                    var e = this.entity.findByName('Digit ' + i);
                    e.model.material = this.materials[splitScore[i]];
                }
            }, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Score;
});