/// <reference path="../managers/asset.js" />
/// <reference path="../managers/plane.js" />
var objects, createjs, managers, game, plane;
var BulletSound, constants;
(function (objects) {
    'use strict';
    // Bullet class
    var Bullet = (function () {
        function Bullet(stage, game, x, y, index) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Bitmap(managers.Assets.loader.getResult("laser"));
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.image.scaleX = 0.25;
            this.image.scaleY = 0.5;
            this.image.x = x;
            this.dx = constants.BULLET_SPEED;
            this.image.y = y;
            this.index = index;
            //this.reset();

            game.addChild(this.image);
        }
        Bullet.prototype.update = function () {
            //console.log("pew");
            this.image.x += this.dx;
            if (this.image.x > this.stage.canvas.width + this.width) {
                this.destroy();
            }
            
        };

        Bullet.prototype.reset = function () {
            this.image.y = Math.floor(Math.random() * this.stage.canvas.height);
            //this.dx = Math.floor(Math.random() * 5 + 10);
            this.image.x = -this.width;
        };

        Bullet.prototype.destroy = function () {
            game.removeChild(this.image);
            plane.bullets.shift();
        };
        return Bullet;
    })();
    objects.Bullet = Bullet;
})(objects || (objects = {}));

