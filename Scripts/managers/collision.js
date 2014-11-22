/// <reference path="../objects/laser.js" />
/// <reference path="../objects/coin.js" />
/// <reference path="../objects/plane.js" />
/// <reference path="../objects/scoreboard.js" />
var managers;
(function (managers) {
    // Collision Manager Class
    var Collision = (function () {
        function Collision(plane, coin, laser, scoreboard) {
            this.laser = [];
            this.plane = plane;
            this.coin = coin;
            this.laser = laser;
            this.scoreboard = scoreboard;
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
        /*Collision.prototype.planeAndLaser = function (laser) {
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
*/
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
            /*for (var count = 0; count < constants.CLOUD_NUM; count++) {
                this.planeAndLaser(this.laser[count]);
            }*/
            this.planeAndCoin();
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
