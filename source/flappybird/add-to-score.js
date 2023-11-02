pc.script.attribute('bird', 'entity');

pc.script.create('addToScore', function (app) {
    // Creates a new AddToScore instance
    var AddToScore = function (entity) {
        this.entity = entity;
        this.lastX = 0;
    };

    AddToScore.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.lastX = this.entity.getPosition().x;
        },
 
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var birdX = this.bird.getPosition().x;
            var pipeX = this.entity.getPosition().x;
            
            if ((pipeX <= birdX) && (this.lastX > birdX)) {
                app.fire('game:addscore');
            }
            
            this.lastX = pipeX;
        }
    };

    return AddToScore;
});