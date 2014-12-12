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
    stage, game, currentState, currentStateFunction, changeState, createjs, objects, managers, count, lasers, surviveText;
(function (states) {
    'use strict';
    function level3State() {
        space.update();
        plane.update();
        coin.update();
            
        var interval = window.setInterval(function () {
            window.clearInterval(interval);
            for (count = 0; count < constants.ENEMY_NUM; count += 1) {
                enemies[count].update();
            }
            for (count = 0; count < constants.CLOUD_NUM; count += 1) {
                lasers[count].update();
            }
            game.removeChild(surviveText);
            collision.update();
            scoreboard.update();
        }, 2000);
        
        for (count = 0; count < plane.bullets.length; count += 1) {
            plane.bullets[count].update();
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
    states.level3State = level3State;

    // level3 state Function
    function level3() {
        // Declare new Game Container
        game = new createjs.Container();
        // Instantiate Game Objects
        space = new objects.Space(stage, game);
        coin = new objects.Coin(stage, game);
        enemy = new objects.Enemy(stage, game);
        plane = new objects.Plane(stage, game);
        laser = new objects.Laser(stage, game);
        
        // Show Cursor
        stage.cursor = "none";
        for (count = 0; count < constants.ENEMY_NUM; count += 1) {
            enemies[count] = (new objects.Enemy(stage, game));
        }
        
        for (count = 0; count < constants.CLOUD_NUM; count += 1) {
            lasers[count] = new objects.Laser(stage, game);
        }
        // Display Scoreboard
        scoreboard = new objects.Scoreboard(stage, game);
        // Instantiate Collision Manager
        collision = new managers.Collision(plane, coin, lasers, scoreboard, enemies, plane.bullets);
        surviveText = new objects.Label(stage.canvas.width / 1.2, stage.canvas.height / 2, "Survive!");
        surviveText.font = "bold 40px Wallpoet";
        surviveText.textAlign = "center";
        surviveText.shadow = new createjs.Shadow("#000000", 5, 5, 5);
        game.addChild(surviveText);
        
        stage.addChild(game);
    }
    states.level3 = level3;
}(states || (states = {})));