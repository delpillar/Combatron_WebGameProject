/// <reference path="../managers/asset.js" />
var objects, createjs, managers, constants, game;
(function (objects) {
    'use strict';
    //Explosion class
    var Explosion = (function () {
        function Explosion(stage, game) {
            this.stage = stage;
            this.game = game;
            this.explode = new createjs.Sprite(managers.Assets.explode, "explode");
            this.image = this.explode;
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.image.scaleX = 1.8;
            this.image.scaleY = 1.8;
            this.dx = constants.ENEMY_MAX_SPEED;
            game.addChild(this.image);
        }
        
        Explosion.prototype.update = function () {
            this.image.x += this.dx;
            if (this.image.x > this.stage.canvas.width + this.width) {
                this.destroy();
            }
        };
        
        Explosion.prototype.destroy = function () {
            game.removeChild(this.image);
        };
        return Explosion;
    }());
    objects.Explosion = Explosion;
}(objects || (objects = {})));