/// <reference path="constants.js" />
/// <reference path="managers/asset.js" />
/// <reference path="objects/laser.js" />
/// <reference path="objects/coin.js" />
/// <reference path="objects/enemy.js" />
/// <reference path="objects/space.js" />
/// <reference path="objects/plane.js" />
/// <reference path="objects/scoreboard.js" />
/// <reference path="objects/label.js" />
/// <reference path="objects/button.js" />
/// <reference path="objects/bullet.js" />
/// <reference path="managers/collision.js" />
/// <reference path="states/play.js" />
/// <reference path="states/level2.js" />
/// <reference path="states/level3.js" />
/// <reference path="states/menu.js" />
/// <reference path="states/gameover.js" />
/// <reference path="states/instructions.js" />

// Combatron - Added basic state machine structure - Added Button and Label classes
var stage, game, space, bullet, plane, coin, enemy;
var lasers = [], enemies = [],  explosions = [], console, optimizeForMobile;
var scoreboard, collision, tryAgain, playButton, currentState;
var currentStateFunction, constants, changeState, createjs, progressText, managers;
var handleFileLoad, handleFileProgress, loadError, init, gameLoop, states, background, progressBar;
// Preload function - Loads Assets and initializes game;
function preload() {
    'use strict';
    currentState = constants.LOADING;
    changeState(currentState);
    
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(30);
    
    background = new createjs.Shape();
    background.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.addChild(background);
    progressText = new createjs.Text(" ", "20px Arial", constants.LABEL_COLOUR);
    progressText.x = stage.canvas.width / 2.3 - progressText.getMeasuredWidth() / 2;
    progressText.y = stage.canvas.height / 1.3;
    progressText.text = "0 % Loaded";
    stage.addChild(progressText);
    progressBar = new createjs.Shape();
    stage.addChild(progressBar);
    
    managers.Assets.init();
    managers.Assets.loader.on("progress", handleFileProgress);
    managers.Assets.loader.on("complete", init);
    
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
}

function handleFileProgress(event) {
    'use strict';
    progressText.text = (managers.Assets.loader.progress * 100 | 0) + " % Loaded";
    progressBar.graphics.beginFill("#FF" + Math.floor(Math.random() * 100).toString() + "B10").drawRect(100, stage.canvas.height / 1.2, 500 * managers.Assets.loader.progress, 50);
}

// init called after Assets have been loaded.
function init() {
    'use strict';
    stage.removeAllChildren();
    optimizeForMobile();
    currentState = constants.MENU_STATE;
    changeState(currentState);
}

// Add touch support for mobile devices
function optimizeForMobile() {
    'use strict';
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
}

// Game Loop
function gameLoop(event) {
    'use strict';
    currentStateFunction();
    stage.update();
}

function changeState(state) {
    'use strict';
    switch (state) {
    case constants.MENU_STATE:
        // instantiate menu screen
        currentStateFunction = states.menuState;
        states.menu();
        break;

    case constants.PLAY_STATE:
        // instantiate play screen
        currentStateFunction = states.playState;
        states.play();
        break;

    case constants.GAME_OVER_STATE:
        currentStateFunction = states.gameOverState;
        // instantiate game over screen
        states.gameOver();
        break;

    case constants.INSTRUCTION_STATE:
        currentStateFunction = states.instructionState;
        //instantiate instructions screen
        states.instructions();
        break;

    case constants.LEVEL2_STATE:
        currentStateFunction = states.level2State;
        //instantiate level2 screen
        states.level2();
        break;

    case constants.LOADING:
        currentStateFunction = handleFileProgress;
        break;
            
    case constants.LEVEL3_STATE:
        currentStateFunction = states.level3State;
        //instantiate level3 screen
        states.level3();
        break;
    }
}