/// <reference path="../managers/asset.js" />
var objects;
(function (objects) {
    // Space Class
    var Space = (function () {
        function Space(stage, game) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Bitmap(managers.Assets.loader.getResult("stars"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width;
            
            this.reset();

            this.dx = 8;

            game.addChild(this.image);
        }
        Space.prototype.update = function () {
            this.image.x -= this.dx;
            if (this.image.x <= stage.canvas.width) {
                this.reset();
            }
        };

        Space.prototype.reset = function () {
            this.image.x = this.width;
        };

        Space.prototype.destroy = function () {
            game.removeChild(this.image);
        };
        return Space;
    })();
    objects.Space = Space;
})(objects || (objects = {}));

