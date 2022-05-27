"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var phaser_1 = require("phaser");
var Preloader = /** @class */ (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        return _super.call(this, "preloader") || this;
    }
    Preloader.prototype.preload = function () {
        //Load player sprite into game.
        this.load.atlas("player", "NPC_Characters_v1/Male4.png", "NPC_Characters_v1/MaleSprites.json");
        this.load.audio("music", ["audio/2.mp3"]);
        this.load.audio("item", ["audio/sounds/item.mp3"]);
        this.load.audio("race", ["audio/Chopin-Maze.mp3"]);
        this.load.audio("wind", ["audio/sounds/wind1.mp3"]);
        this.load.audio("waterfall", ["audio/sounds/waterfall.mp3"]);
        this.load.audio("lights", ["audio/sounds/lights.mp3"]);
        this.load.audio("menu", ["audio/sounds/menu.mp3"]);
        this.load.audio("door", ["audio/sounds/door.mp3"]);
    };
    Preloader.prototype.create = function () {
        if (localStorage["Heart"]) {
            window.scrollTo(250, 600);
            this.scene.start("home");
        }
        else {
            this.scene.start("titlescreen");
        }
    };
    return Preloader;
}(phaser_1["default"].Scene));
exports["default"] = Preloader;
