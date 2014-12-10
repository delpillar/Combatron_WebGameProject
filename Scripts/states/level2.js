/// <reference path="../objects/button.js" />
/// <reference path="../objects/laser.js" />
/// <reference path="../objects/coin.js" />
/// <reference path="../objects/enemy.js" />
/// <reference path="../objects/label.js" />
/// <reference path="../objects/space.js" />
/// <reference path="../objects/plane.js" />
/// <reference path="../objects/scoreboard.js" />
/// <reference path="../managers/collision.js" />

var states;
var count, constants;
(function (states) {
    function level2State() {
        space.update();
        plane.update();
        
        for (count = 0; count < plane.bullets.length; count++) {
            plane.bullets[count].update();
        }
        
        var interval = window.setInterval(function () {
            window.clearInterval(interval);
            coin.update();
        
            for (count = 0; count < constants.ENEMY_NUM; count++) {
                    enemies[count].update();
            }
            
            collision.update();
            scoreboard.update();
        }, 1000);
        
        if (scoreboard.lives <= 0) {
            stage.removeChild(game);
            plane.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        }
    }
    states.level2State = level2State;

    // level2 state Function
    function level2() {
        
        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        space = new objects.Space(stage, game);
        coin = new objects.Coin(stage, game);
        enemy = new objects.Enemy(stage, game);
        plane = new objects.Plane(stage, game);
        
        // Show Cursor
        stage.cursor = "none";

        for (var count = 0; count < constants.ENEMY_NUM; count++) {
            enemies[count] = (new objects.Enemy(stage, game));    
        }

        // Display Scoreboard
        scoreboard = new objects.Scoreboard(stage, game);

        // Instantiate Collision Manager
        collision = new managers.Collision(plane, coin, lasers, scoreboard, enemies, plane.bullets);
        window.addEventListener("keydown", plane.pressKey);
        window.addEventListener("keyup", plane.releaseKey);
        stage.addChild(game);
    }
    states.level2 = level2;
})(states || (states = {}));
