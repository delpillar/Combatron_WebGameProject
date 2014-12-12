var __extends = this.__extends || function (d, b) {
    'use strict';
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../constants.js" />
/// <reference path="../managers/asset.js" />
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(x, y, buttonIDString, scaleIn, scaleOut) {
            _super.call(this, managers.Assets.atlas, buttonIDString);
            this.regX = this.getBounds().width / 2;
            this.regY = this.getBounds().height / 2;
            this.shadow = new createjs.Shadow("#000000", 2, 3, 10);
            this.x = x;
            this.y = y;
            this.scaleIn = scaleIn;
            this.scaleOut = scaleOut;
            this.setButtonListeners();
        };
        
        Button.prototype.setButtonListeners = function () {
            this.cursor = 'pointer';
            this.on('rollover', this.onButtonOver);
            this.on('rollout', this.onButtonOut);
        };

        Button.prototype.onButtonOver = function () {
            this.alpha = 0.9;
            this.scaleX = this.scaleIn;
            this.scaleY = this.scaleIn;
            this.shadow = new createjs.Shadow("#000000", 10, 10, 10);
        };

        Button.prototype.onButtonOut = function () {
            this.alpha = 1;
            this.scaleX = this.scaleOut;
            this.scaleY = this.scaleOut;
            this.shadow = new createjs.Shadow("#000000", 2, 3, 10);
        };
        return Button;
    })(createjs.Sprite);
    objects.Button = Button;
})(objects || (objects = {}));
