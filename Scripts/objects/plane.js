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
            this.image = this.idle;
            this.image.x = this.stage.mouseX;
            this.image.y = this.stage.mouseY;
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.bullets = bullets;
            this.engineSound = createjs.Sound.play('gameMusic', createjs.Sound.INTERRUPT_NONE, 0, 1500, -1, 1, 0);
            window.addEventListener("keypress", shoot);
            window.addEventListener("keydown", shoot);
            game.addChild(this.image);
            
        }
        function shoot(e){
            if(e.keyCode == 32){
                bullet = 
                    new objects.Bullet(this.stage,
                                       this.game,
                                       this.plane.image.x + this.plane.width*2
                                       ,this.plane.image.y
                                       ,shots++);
                bullets.push(bullet);    
            }
        };
        Plane.prototype.update = function () {
            //console.log("Bullets: " + plane.bullets.length);
            this.image.y = this.stage.mouseY;
            this.image.x = this.stage.mouseX;
            //bullet.update();
            window.setInterval(function(){
                mx = this.stage.mouseX;    
                my = this.stage.mouseY;
            },10);
            
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
                this.image.gotoAndPlay(this.idle);
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

