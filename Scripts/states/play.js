/// <reference path="../objects/button.js" />
/// <reference path="../objects/laser.js" />
/// <reference path="../objects/coin.js" />
/// <reference path="../objects/enemy.js" />
/// <reference path="../objects/label.js" />
/// <reference path="../objects/space.js" />
/// <reference path="../objects/plane.js" />
/// <reference path="../objects/bullet.js" />
/// <reference path="../objects/scoreboard.js" />
/// <reference path="../managers/collision.js" />

var states;
(function (states) {
    function playState() {
        
        space.update();
        plane.update();
        for (count = 0; count < plane.bullets.length; count += 1) {
            bullets[count].update();
        }
        
        
        var interval = window.setInterval(function(){
            window.clearInterval(interval);
            coin.update();
            for (var count = 0; count < constants.CLOUD_NUM; count++) {
                lasers[count].update();
            }
            collision.update();
            scoreboard.update();
            
        },1000);
        
        if (scoreboard.score >= 1000){
            stage.removeChild(game);
            plane.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.LEVEL2_STATE;
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
    states.playState = playState;
   
    // play state Function
    function play() {
    
        // Declare new Game Container
        game = new createjs.Container();
        window.addEventListener("mousedown", plane.pressKey);
        window.addEventListener("mouseup", plane.releaseKey);
        // Instantiate Game Objects
        space = new objects.Space(stage, game);
        coin = new objects.Coin(stage, game);
        enemy = new objects.Enemy(stage, game);
        plane = new objects.Plane(stage, game);
        // Show Cursor
        stage.cursor = "none";

        for (var count = 0; count < constants.CLOUD_NUM; count++) {
            lasers[count] = new objects.Laser(stage, game);
        }
        
        for (var count = 0; count < constants.ENEMY_NUM; count++) {
                
                enemies.push(new objects.Enemy(stage, game));    
        }

        // Display Scoreboard
        scoreboard = new objects.Scoreboard(stage, game);

        //Instantiate Collision Manager
        collision = new managers.Collision(plane, coin, lasers, scoreboard);

        stage.addChild(game);
    }
    states.play = play;
})(states || (states = {}));
