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
var count, constants, console, scoreboard, button, laser, coin, enemy, label, space, plane, collision, enemies,
    stage, game, currentState, currentStateFunction, changeState, createjs, objects, managers, count, lasers, gameObjective;
(function (states) {
    'use strict';
    function level2State() {
        space.update();
        plane.update();
        scoreboard.update();
        setTimeout(function () {
            coin.update();
            collision.update();
            for (count = 0; count < constants.ENEMY_NUM; count += 1) {
                enemies[count].update();
            }
            game.removeChild(gameObjective);
        }, 2000);
        
        for (count = 0; count < plane.bullets.length; count += 1) {
            plane.bullets[count].update();
        }
        
        if (scoreboard.enemiesKilled >= constants.ENEMIESKILLED) {
            stage.removeChild(game);
            plane.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.LEVEL3_STATE;
            changeState(currentState);
        }
        
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
        for (count = 0; count < constants.ENEMY_NUM; count += 1) {
            enemies[count] = (new objects.Enemy(stage, game));
        }
        // Display Scoreboard
        scoreboard = new objects.Scoreboard(stage, game);
        // Instantiate Collision Manager
        collision = new managers.Collision(plane, coin, lasers, scoreboard, enemies, plane.bullets);
        gameObjective = new objects.Label(stage.canvas.width / 1.4, stage.canvas.height / 2, "Destroy " + constants.ENEMIESKILLED.toString() + " enemy ships!");
        gameObjective.font = "bold 40px Wallpoet";
        gameObjective.textAlign = "center";
        gameObjective.shadow = new createjs.Shadow("#000000", 5, 5, 5);
        game.addChild(gameObjective);
        stage.addChild(game);
    }
    states.level2 = level2;
}(states || (states = {})));