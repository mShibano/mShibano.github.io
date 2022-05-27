"use strict";
exports.__esModule = true;
var phaser_1 = require("phaser");
//import Preloader from "./scenes/Preloader";
var Game_1 = require("./scenes/Game");
var Preloader_1 = require("./scenes/Preloader");
var Hospital_1 = require("./scenes/Hospital");
var Maze_1 = require("./scenes/Maze");
var Shop_1 = require("./scenes/Shop");
var Home_1 = require("./scenes/Home");
var Scan_1 = require("./scenes/Puzzles/Scan");
var Atlantis_1 = require("./scenes/Buildings/Atlantis");
var ScanBackground_1 = require("./scenes/puzzles/ScanBackground");
var TitleScreen_1 = require("./scenes/TitleScreen");
var ending_1 = require("./scenes/ending");
var start_1 = require("./scenes/start");
// import GameUI from "./scenes/GameUI";
exports["default"] = new phaser_1["default"].Game({
    type: phaser_1["default"].AUTO,
    width: 1600,
    height: 1600,
    physics: {
        "default": "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        Preloader_1["default"],
        Game_1["default"],
        Home_1["default"],
        Hospital_1["default"],
        Shop_1["default"],
        Maze_1["default"],
        Scan_1["default"],
        Atlantis_1["default"],
        TitleScreen_1["default"],
        ScanBackground_1["default"],
        ending_1["default"],
        start_1["default"],
    ],
    scale: {
        zoom: 3
    }
});
