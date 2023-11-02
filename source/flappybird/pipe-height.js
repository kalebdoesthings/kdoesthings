pc.script.create('pipe_height', function (app) {
    // Creates a new PipeHeight instance
    var PipeHeight = function (entity) {
        this.entity = entity;
        this.heights = [];
    };

    PipeHeight.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.pipe1 = app.root.findByName('Pipe 1');
            this.pipe2 = app.root.findByName('Pipe 2');
            this.pipe3 = app.root.findByName('Pipe 3');

            this.heights.push((Math.random() - 0.5) * 0.75);
            this.heights.push((Math.random() - 0.5) * 0.75);
            this.heights.push((Math.random() - 0.5) * 0.75);
            this.setPipeHeights();
            
            app.on('pipes:cycle', function () {
                this.heights.shift();
                this.heights.push((Math.random() - 0.5) * 0.75);
                this.setPipeHeights();
            }, this);
        },
        
        setPipeHeights: function () {
            var pos;
            pos = this.pipe1.getLocalPosition();
            this.pipe1.setLocalPosition(pos.x, this.heights[0], pos.z);
            pos = this.pipe2.getLocalPosition();
            this.pipe2.setLocalPosition(pos.x, this.heights[1], pos.z);
            pos = this.pipe3.getLocalPosition();
            this.pipe3.setLocalPosition(pos.x, this.heights[2], pos.z);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return PipeHeight;
});