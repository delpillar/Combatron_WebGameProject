/// <reference path="../managers/asset.js" />
var objects, createjs, managers, game;
var laserSound, constants;
(function (objects) {
    'use strict';
    // Laser class
    var Laser = (function () {
        function Laser(stage, game) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Bitmap(managers.Assets.loader.getResult("laser"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();

            game.addChild(this.image);
        }
        Laser.prototype.update = function () {
            this.image.x += this.dx;
            if (this.image.x > this.stage.canvas.width + this.width) {
                this.reset();
            }
            
        };

        Laser.prototype.reset = function () {
            this.image.y = Math.floor(Math.random() * this.stage.canvas.height);
            this.dx = Math.floor(Math.random() * constants.LASER_MIN_SPEED + constants.LASER_MAX_SPEED);
            this.image.x = -this.width;
        };

        Laser.prototype.destroy = function () {
            game.removeChild(this.image);
        };
        return Laser;
    })();
    objects.Laser = Laser;
})(objects || (objects = {}));

