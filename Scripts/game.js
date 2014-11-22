/// <reference path="constants.js" />
/// <reference path="managers/asset.js" />
/// <reference path="objects/laser.js" />
/// <reference path="objects/coin.js" />
/// <reference path="objects/space.js" />
/// <reference path="objects/plane.js" />
/// <reference path="objects/scoreboard.js" />
/// <reference path="objects/label.js" />
/// <reference path="objects/button.js" />
/// <reference path="objects/bullet.js" />
/// <reference path="managers/collision.js" />
/// <reference path="states/play.js" />
/// <reference path="states/menu.js" />
/// <reference path="states/gameover.js" />
/// <reference path="states/instructions.js" />

// Combatron - Added basic state machine structure - Added Button and Label classes

var stage;
var game;

var space;
var bullet;
var plane;
var coin;
var lasers = [];
var scoreboard;

var collision;

var tryAgain;
var playButton;

var currentState;
var currentStateFunction;

// Preload function - Loads Assets and initializes game;
function preload() {
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

// init called after Assets have been loaded.
function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(30);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
    optimizeForMobile();

    currentState = constants.MENU_STATE;
    changeState(currentState);
}

// Add touch support for mobile devices
function optimizeForMobile() {
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
}

// Game Loop
function gameLoop(event) {
    currentStateFunction();
    stage.update();
}

function changeState(state) {
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
    }
}