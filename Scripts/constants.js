var constants;
(function (constants) {
    // State Machine Constants
    constants.MENU_STATE = 0;
    constants.PLAY_STATE = 1;
    constants.GAME_OVER_STATE = 2;
    constants.INSTRUCTION_STATE = 3;
    constants.LEVEL2_STATE = 4;

    // Game Constants
    constants.CLOUD_NUM = 8;
    constants.ENEMY_NUM = 5;
    constants.LABEL_FONT = "20px Wallpoet";
    constants.LABEL_COLOUR = "#FF7B16";
    constants.PLANE_LIVES = 5;
})(constants || (constants = {}));
