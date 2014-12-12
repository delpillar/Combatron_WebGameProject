/// <reference path="../constants.js" />
/// <reference path="../objects/scoreboard.js" />
/// <reference path="../objects/plane.js" />
/// <reference path="../objects/space.js" />
/// <reference path="../objects/coin.js" />
/// <reference path="../objects/laser.js" />
/// <reference path="../objects/button.js" />
/// <reference path="../objects/label.js" />
var states, createjs, stage, game, plane, space, instructionButton, currentState, constants, changeState,
    gameNameLabel, currentState, objects, playButton;
(function (states) {
    'use strict';
    function playButtonClicked(event) {
        createjs.Sound.play("startBtnSound");
        setTimeout(function () {
            stage.removeChild(game);
            plane.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.PLAY_STATE;
            changeState(currentState);
        }, 500);
    }
    states.playButtonClicked = playButtonClicked;
    
    function instructionButtonClicked(event) {
        createjs.Sound.play("startBtnSound");
        
        stage.removeChild(game);
        plane.destroy();
        game.removeAllEventListeners();
        currentState = constants.INSTRUCTION_STATE;
        changeState(currentState);
    }
    states.instructionButtonClicked = instructionButtonClicked;
    
    function menuState() {
        space.update();
        plane.image.y = stage.canvas.height / 2;
        plane.image.x = 460;
        gameNameLabel.color = "#FF" + Math.floor(Math.random() * 10).toString() + "B10";
        
    }
    states.menuState = menuState;

    function menu() {

        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        space = new objects.Space(stage, game);
        plane = new objects.Plane(stage, game);

        // Show Cursor
        stage.cursor = "default";

        // Display Game Name
        gameNameLabel = new objects.Label(stage.canvas.width / 2 + 80, 100, "COMBATRON");
        gameNameLabel.font = "bold 60px Wallpoet";
        gameNameLabel.textAlign = "center";
        gameNameLabel.shadow = new createjs.Shadow("#ffffff", 5, 5, 5);
        game.addChild(gameNameLabel);

        // Display Play Button
        playButton = new objects.Button(stage.canvas.width / 2, stage.canvas.height / 2, "playButton", 1.1, 1);
        game.addChild(playButton);
        playButton.addEventListener("click", playButtonClicked);
        
        // Display Play Button
        instructionButton = new objects.Button(stage.canvas.width / 2, playButton.y + 100, "instructionsButton", 1.1, 1);
        game.addChild(instructionButton);
        instructionButton.addEventListener("click", instructionButtonClicked);

        stage.addChild(game);
    }
    states.menu = menu;
}(states || (states = {})));