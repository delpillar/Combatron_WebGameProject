/// <reference path="../objects/laser.js" />
/// <reference path="../objects/enemy.js" />
/// <reference path="../objects/bullet.js" />
/// <reference path="../objects/coin.js" />
/// <reference path="../objects/plane.js" />
/// <reference path="../objects/scoreboard.js" />

var managers;
(function (managers) {
    // Collision Manager Class
    var Collision = (function () {
        function Collision(plane, coin, laser, scoreboard, enemy, bullet) {
            this.plane = plane;
            this.coin = coin;
            this.enemy = enemy;
            this.laser = laser;
            this.scoreboard = scoreboard;
            this.bullet = bullet;
        }
        // Utility method - Distance calculation between two points
        Collision.prototype.distance = function (p1, p2) {
            var result = 0;
            var xPoints = 0;
            var yPoints = 0;

            xPoints = p2.x - p1.x;
            xPoints = xPoints * xPoints;

            yPoints = p2.y - p1.y;
            yPoints = yPoints * yPoints;

            result = Math.sqrt(xPoints + yPoints);

            return result;
        };

        // check collision between plane and any laser object
        Collision.prototype.planeAndLaser = function (laser) {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = this.plane.image.x;
            p1.y = this.plane.image.y;
            p2.x = laser.image.x;
            p2.y = laser.image.y;
            if (this.distance(p1, p2) < ((this.plane.height / 2) + (laser.height / 2))) {
                createjs.Sound.play("shipHit");
                this.scoreboard.lives -= 1;
                laser.reset();
            }
        };
        
        Collision.prototype.bulletAndEnemy = function(bullet, enemy) {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = bullet.image.x;
            p1.y = bullet.image.y;
            p2.x = enemy.image.x;
            p2.y = enemy.image.y;
            if (this.distance(p1, p2) < ((bullet.height / 2) + (enemy.height / 2))) {
                createjs.Sound.play("shipHit");
                this.scoreboard.score += 100;
                //enemy.reset();
                enemy.reset();
                bullet.destroy();
            }
            
        }
        
        // check collision between plane and enemy
        Collision.prototype.planeAndEnemy = function (enemy) {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = this.plane.image.x;
            p1.y = this.plane.image.y;
           
            
            p2.x = enemy.image.x;
            p2.y = enemy.image.y;
            
            if (this.distance(p1, p2) < ((this.plane.height / 2) + (enemy.height / 2))) {
                createjs.Sound.play("shipHit");
                this.scoreboard.lives -= 1;
                enemy.reset();
            }
        };

        // check collision between plane and coin
        Collision.prototype.planeAndCoin = function () {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = this.plane.image.x;
            p1.y = this.plane.image.y;
            p2.x = this.coin.image.x;
            p2.y = this.coin.image.y;
            if (this.distance(p1, p2) < ((this.plane.height / 2) + (this.coin.height / 2))) {
                createjs.Sound.play("coinSound");
                this.scoreboard.score += 100;
                this.coin.reset();
            }
        };

        // Utility Function to Check Collisions
        Collision.prototype.update = function () {
            if(currentState == 1){
                for (var count = 0; count < constants.CLOUD_NUM; count++) {
                    this.planeAndLaser(this.laser[count]);
                }
            }
            if(currentState == 4){
                for (var count = 0; count < constants.ENEMY_NUM; count++) {
                    this.planeAndEnemy(this.enemy[count]);
                }
                
                for (var count = 0; count < this.bullet.length; count++) {
                    for(var i = 0; i < this.enemy.length; i++){
                        this.bulletAndEnemy(this.bullet[count], this.enemy[i]);
                    }
                }
                    
            }
            this.planeAndCoin();
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
