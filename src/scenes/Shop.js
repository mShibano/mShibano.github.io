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
var helper_1 = require("../utils/helper");
var craftsman_json_1 = require("../../public/tiles/craftsman.json");
var shopExits = [
    { x: 733, y: 533, name: "maze" },
    { x: 574, y: 72, name: "shop" },
    { x: 356, y: 449, name: "game" },
    { x: 416, y: 150, name: "dupedoor" },
    { x: 192, y: 150, name: "dupedoor" },
    { x: 687, y: 150, name: "dupedoor" },
];
var dialogue = [
    {
        x: 418,
        y: 159,
        properties: [
            {
                name: "message",
                value: "FINALLY! Whew! I'm finally out! Still no one in sight. Honestly, I'd rather not meet the guy who designed this place anyway. What a creepy memento I found."
            },
        ],
        hasAppeared: false,
        mazeExit: true
    },
    {
        x: 194,
        y: 159,
        properties: [
            {
                name: "message",
                value: "FINALLY! Whew! I'm finally out! Still no one in sight. Honestly, I'd rather not meet the guy who designed this place anyway. What a creepy memento I found."
            },
        ],
        hasAppeared: false,
        mazeExit: true
    },
    {
        x: 684,
        y: 157,
        properties: [
            {
                name: "message",
                value: "FINALLY! Whew! I'm finally out! Still no one in sight. Honestly, I'd rather not meet the guy who designed this place anyway. What a creepy memento I found."
            },
        ],
        hasAppeared: false,
        mazeExit: true
    },
    {
        x: 350,
        y: 420,
        properties: [
            {
                name: "message",
                value: "Hello? Mr. Neighbor? Huh.. no one here. I should scope out the place."
            },
        ],
        hasAppeared: false
    },
];
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        return _super.call(this, "shop") || this;
    }
    Game.prototype.preload = function () {
        this.load.image("shop", "tiles/RPGW_HousesAndInt_v1.1/interiors.png");
        this.load.image("props", "tiles/RPGW_HousesAndInt_v1.1/decorative_props.png");
        this.load.image("decore", "tiles/RPGW_HousesAndInt_v1.1/furniture.png");
        //Load data (collisions, etc) for the map.
        this.load.tilemapTiledJSON("craftsman", "tiles/craftsman.json");
        //Load keyboard for player to use.
        this.cursors = this.input.keyboard.createCursorKeys();
    };
    Game.prototype.create = function () {
        var _this = this;
        //Create tile sets
        var map = this.make.tilemap({ key: "craftsman" });
        var crafthouseTileSet = map.addTilesetImage("crafthouse", "shop");
        var decorationsTileSet = map.addTilesetImage("decorations", "decore");
        var propsTileSet = map.addTilesetImage("props", "props");
        var shopTileSets = [crafthouseTileSet, decorationsTileSet, propsTileSet];
        //building layers
        map.createLayer("black", crafthouseTileSet);
        map.createLayer("ground", crafthouseTileSet);
        var wallsLayer = map.createLayer("walls", shopTileSets);
        var decoreLayer = map.createLayer("decore", shopTileSets);
        var decorationsLayer = map.createLayer("decorations", shopTileSets);
        //const decoreLayer = map.createLayer('decore', shopTileSet);
        this.spawn();
        (0, helper_1.setPlayer)(this.player);
        (0, helper_1.createAnims)(this.anims);
        //Adds collisions
        wallsLayer.setCollisionByProperty({ collides: true });
        decoreLayer.setCollisionByProperty({ collides: true });
        decorationsLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.player, decoreLayer);
        this.physics.add.collider(this.player, decorationsLayer);
        // let music = this.sound.add("music");
        // let musicConfig = {
        //   mute: false,
        //   volume: 0.5,
        //   rate: 1,
        //   detune: 0,
        //   seek: 0,
        //   loop: true,
        //   delay: 0,
        // };
        // music.play(musicConfig);
        this.message = this.add.text(800, 750, "", {
            color: "#FFF5EE",
            fontFamily: "Tahoma",
            backgroundColor: "#708090",
            fontSize: "17px",
            align: "center",
            baselineX: 0,
            baselineY: 0,
            padding: 0,
            wordWrap: { width: 350 }
        });
        this.sound.add("item");
        // Hit spacebar to interact with objects.
        this.cursors.space.on("down", function () {
            console.log(craftsman_json_1["default"]);
            (0, helper_1.interact)(_this.message, _this.player, craftsman_json_1["default"].layers[5].objects, _this.sound.add("item"));
        }),
            // Hit shift to view Inventory.
            this.cursors.shift.on("down", function () {
                (0, helper_1.displayInventory)(_this.message, _this.player);
            });
        // debugDraw(wallsLayer, this);
        // debugDraw(decoreLayer, this);
        // debugDraw(decorationsLayer, this);
    };
    Game.prototype.update = function (t, dt) {
        this.playDialogue();
        this.exits();
        this.cameras.main.scrollX = this.player.x - 400;
        this.cameras.main.scrollY = this.player.y - 300;
        var speed = this.message.text ? 0 : 120;
        (0, helper_1.movePlayer)(this.player, speed, this.cursors);
    };
    Game.prototype.exits = function () {
        var nextToTarget = (0, helper_1.isItClose)(this.player, shopExits);
        if (nextToTarget) {
            if (nextToTarget.name === "dupedoor") {
                this.sound.play("door");
                this.player.setPosition(242, 289);
                return;
            }
            localStorage.setItem("from", "shop");
            this.scene.stop("shop");
            this.scene.start(nextToTarget.name);
        }
    };
    Game.prototype.playDialogue = function () {
        var dialogueSpot = (0, helper_1.isItClose)(this.player, dialogue);
        if (dialogueSpot && !dialogueSpot.hasAppeared) {
            if (this.message.text)
                this.message.text = "";
            if (dialogueSpot.mazeExit) {
                if (localStorage["from"] !== "maze") {
                    return;
                }
                (0, helper_1.updateText)(this.player, dialogueSpot, this.message);
                localStorage.removeItem("from");
                dialogueSpot.hasAppeared = true;
            }
            else {
                (0, helper_1.updateText)(this.player, dialogueSpot, this.message);
                dialogueSpot.hasAppeared = true;
            }
        }
    };
    Game.prototype.spawn = function () {
        if (localStorage["from"] === "mazeWin") {
            localStorage.removeItem("from");
            var doors = [
                [416, 173],
                [192, 173],
                [687, 173],
            ];
            var chanceDoor = doors[Math.floor(Math.random() * doors.length)];
            this.player = this.physics.add.sprite(chanceDoor[0], chanceDoor[1], "player", "doc-walk-down-0");
        }
        else if (localStorage["from"] === "mazeFail") {
            localStorage.removeItem("from");
            this.player = this.physics.add.sprite(644, 533, "player", "doc-walk-side-0");
        }
        else {
            localStorage.removeItem("from");
            this.player = this.physics.add.sprite(350, 420, "player", "doc-walk-up-0");
        }
    };
    return Game;
}(phaser_1["default"].Scene));
exports["default"] = Game;
