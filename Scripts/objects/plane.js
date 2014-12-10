/// <reference path="../managers/asset.js" />
/// <reference path="bullet.js" />
var objects;
var mx, my;
var bullet;
var shots = 0;
var bullets = [];
(function (objects) {
    // Plane Class
    var Plane = (function () {
        function Plane(stage, game) {
            this.stage = stage;
            this.game = game;
            this.idle = new createjs.Sprite(managers.Assets.ship,"idle");
            this.up = new createjs.Sprite(managers.Assets.ship,"up");
            this.down = new createjs.Sprite(managers.Assets.ship,"down");
            this.explode = new createjs.Sprite(managers.Assets.explode,"explode");
            this.image = this.idle;
            this.image.x = this.stage.mouseX;
            this.image.y = this.stage.mouseY;
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.bullets = bullets;
            this.isPressed = false;
            this.isShooting = false;
            this.engineSound = createjs.Sound.play('gameMusic', createjs.Sound.INTERRUPT_NONE, 0, 1500, -1, 1, 0);
            game.addChild(this.image);
            
        }
        Plane.prototype.releaseKey = function(e){
            if (e.keyCode == 32) {
            this.isShooting = false;
            }
        }
        Plane.prototype.pressKey = function(e){
            if(e.keyCode == 32) {
                if(!this.isShooting) {
                    bullet = new objects.Bullet(this.stage,
                       this.game,
                       this.plane.image.x + this.plane.width,
                       this.plane.image.y,
                       shots++);
                    bullets.push(bullet);
                    this.isShooting = true;
                }
            }
        };
        Plane.prototype.update = function () {
            this.image.y = this.stage.mouseY;
            this.image.x = this.stage.mouseX;
            //bullet.update();
            window.setInterval(function(){
                mx = this.stage.mouseX;    
                my = this.stage.mouseY;
            }, 1000);
            
            if(this.image.y < my ){
                game.removeChild(this.image);
                this.image = this.up;
                this.image.regX = this.width / 2;
                this.image.regY = this.height / 2;
                this.image.y = this.stage.mouseY;
                this.image.x = this.stage.mouseX;
                this.image.gotoAndPlay(this.up);
                game.addChild(this.image);
            }
            else if(this.image.y > my){
                game.removeChild(this.image);
                this.image = this.down;
                this.image.regX = this.width / 2;
                this.image.regY = this.height / 2;
                this.image.y = this.stage.mouseY;
                this.image.x = this.stage.mouseX;
                this.image.gotoAndPlay(this.down);
                game.addChild(this.image);
            }
            else{
                game.removeChild(this.image);
                this.image = this.idle;
                this.image.regX = this.width / 2;
                this.image.regY = this.height / 2;
                this.image.y = this.stage.mouseY;
                this.image.x = this.stage.mouseX;
                this.image.gotoAndPlay(this.explode);
                game.addChild(this.image);
            }
        };

        Plane.prototype.destroy = function () {
            this.engineSound.stop();
            game.removeChild(this.image);
        };
        return Plane;
    })();
    objects.Plane = Plane;
})(objects || (objects = {}));

