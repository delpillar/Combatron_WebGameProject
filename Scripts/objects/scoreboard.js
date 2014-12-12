var objects, constants, createjs, game;
(function (objects) {
    'use strict';
    // Scoreboard Class
    var Scoreboard = (function () {
        function Scoreboard(stage, game) {
            this.labelText = "";
            this.stage = stage;
            this.game = game;
            this.lives = constants.PLANE_LIVES;
            this.score = 0;
            this.enemiesKilled = 0;
            this.label = new createjs.Text(this.labelText, constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.update();
            this.coinsCollected = 0;
            this.width = this.label.getBounds().width;
            this.height = this.label.getBounds().height;
            game.addChild(this.label);
        }
        Scoreboard.prototype.update = function () {
            this.labelText = "Lives: " + this.lives.toString() + "      Score: " + constants.SCORE.toString();
            this.label.text = this.labelText;
        };

        Scoreboard.prototype.destroy = function () {
            game.removeChild(this.label);
        };
        return Scoreboard;
    })();
    objects.Scoreboard = Scoreboard;
})(objects || (objects = {}));

