/// <reference path="../managers/asset.js" />
var objects;
(function (objects){
    //Enemy class
    var Enemy = (function (){
        function Enemy(stage, game){
            this.stage = stage;
            this.game = game;
            this.idle = new createjs.Sprite(managers.Assets.ship,"idle");
            this.up = new createjs.Sprite(managers.Assets.ship,"up");
            this.down = new createjs.Sprite(managers.Assets.ship,"down");
            this.explode = new createjs.Sprite(managers.Assets.ship,"explode");
            this.image = this.idle;
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.image.scaleX = 1.8;
            this.image.scaleY = 1.8;
            this.reset();
            
            this.dx = constants.ENEMY_MIN_SPEED;
            this.dy = constants.ENEMY_MIN_SPEED;
            
            game.addChild(this.image);
        }
        
        Enemy.prototype.update = function () {
            this.image.x += this.dx;
            this.image.y += this.dy;
            
            if (this.image.x > this.stage.canvas.width + this.width){
                this.reset();
            }
            if (this.image.y <= 0 + this.height /2){
                this.dy *= -1;
            }
            if (this.image.y >= this.stage.canvas.height - this.height/2) {
                this.dy *= -1;
            }
        };
        
        Enemy.prototype.reset = function () {
            this.dx = Math.floor(Math.random() * (10 - 3) + 3);
            this.image.x = -this.width;
            this.image.y = Math.floor(Math.random() * ((this.stage.canvas.height - this.image.getBounds().height/2)- this.image.getBounds().height) + this.image.getBounds().height);
            
        };
        
        Enemy.prototype.destroy = function () {
            game.removeChild(this.image);
        }
        return Enemy;
    })();
    objects.Enemy = Enemy;
})(objects || (objects = {}));