/// <reference path="../constants.js" />
/// <reference path="../objects/button.js" />
/// <reference path="../objects/laser.js" />
/// <reference path="../objects/coin.js" />
/// <reference path="../objects/label.js" />
/// <reference path="../objects/space.js" />
/// <reference path="../objects/plane.js" />
/// <reference path="../objects/scoreboard.js" />
var states;
var finalScore;
(function (states) {
    function gameOverState() {
        space.update();
        finalScore.color = "#FF" + Math.floor(Math.random() * 10).toString() + "B10";
    }
    states.gameOverState = gameOverState;

    // Restart Game when Try Again Button is clicked
    function tryAgainClicked(event) {
        createjs.Sound.stop();
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    states.tryAgainClicked = tryAgainClicked;

      function mainMenuButtonClicked(event){
        createjs.Sound.play("startBtnSound");
        
        interval = window.setInterval(function(){
            stage.removeChild(game);
            window.clearInterval(interval);
            plane.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.MENU_STATE;
            changeState(currentState);
        }, 750);
    }
    states.mainMenuButtonClicked = mainMenuButtonClicked;
    
    // Game Over Scene
    function gameOver() {
        var gameOverLabel;
        var finalScoreLabel;
        
        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        space = new objects.Space(stage, game);
        
        //play game over sound
        createjs.Sound.play('gameOver', createjs.Sound.INTERRUPT_NONE, 0, 1500, -1, 1, 0);
        stage.addChild(game);
        var interval = window.setInterval(function(){
            window.clearInterval(interval);
        

            // Show Cursor
            stage.cursor = "default";
        
             // Display Game Over
            gameOverLabel = new objects.Label(stage.canvas.width / 2 + 80, 40, "GAME OVER");
            gameOverLabel.font = "60px Wallpoet";
            gameOverLabel.textAlign = "center";
            gameOverLabel.shadow = new createjs.Shadow("#000000", 5, 5, 5)
            game.addChild(gameOverLabel);

            // Display Final Score Label
            finalScoreLabel = new objects.Label(stage.canvas.width / 2 + 80, 120, "FINAL SCORE");
            finalScoreLabel.font = "50px Wallpoet";
            finalScoreLabel.textAlign = "center";
            finalScoreLabel.shadow = new createjs.Shadow("#232323", 5, 5, 5)
            game.addChild(finalScoreLabel);

            // Display Final Score
            finalScore = new objects.Label(stage.canvas.width / 2 + 40, finalScoreLabel.y + 50, scoreboard.score.toString());
            finalScore.font = "50px Audiowide";
            finalScore.textAlign = "center";
            game.addChild(finalScore);

            // Display Try Again Button
            tryAgain = new objects.Button(stage.canvas.width / 2, 300, "tryAgainButton", 1.2, 1);
            game.addChild(tryAgain);
            tryAgain.addEventListener("click", tryAgainClicked);
            
            // Display Main Menu Button
            mainMenuButton = new objects.Button(stage.canvas.width / 2 , tryAgain.y + 100, "mainMenuButton", 1.2, 1);
            game.addChild(mainMenuButton);
            mainMenuButton.addEventListener("click", mainMenuButtonClicked);


            
        },2500);
    }
    states.gameOver = gameOver;
})(states || (states = {}));
