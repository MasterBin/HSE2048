import FieldManager from "./FieldManager.js";
import KeyHandler from "./KeyHandler.js";

const sceneConfig = {
    spacing: 8,
    tileSize: 115,
    fieldSize: 500
};

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");

        this._moveHandler = (x, y) => {
            this.tile.x += (sceneConfig.tileSize+sceneConfig.spacing) * ((x < 0)? -1: ((x == 0)? 0 : 1));
            this.tile.y -= (sceneConfig.tileSize+sceneConfig.spacing) * ((y < 0)? -1: ((y == 0)? 0 : 1));
            console.log(this.tile.x + " "+ this.tile.y);

            this.fieldManager.addNewTile();
        };
    }

	preload() {
        this.load.image('tile', 'assets/minisquare.png');
        this.load.image('field','assets/field.png');
        this.load.image('ball' , 'assets/ball.png')
    }
    
	create() {
        
        this.keyHandler = new KeyHandler(this, this._moveHandler);
        this.fieldManager = new FieldManager(this, sceneConfig);


        //TODO: delete it
        this.tile = this.add.sprite(
            sceneConfig.tileSize/2 + sceneConfig.spacing, 
            sceneConfig.tileSize/2 + sceneConfig.spacing, 'ball');

        // Add first two tile on the field.
        this.fieldManager.addNewTile();
        this.fieldManager.addNewTile();
    }
    
    //update() {}
        
}

let tile;
