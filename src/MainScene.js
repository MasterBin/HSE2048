import FieldManager from "./FieldManager.js";
import KeyHandler from "./KeyHandler.js";

const sceneConfig = {
    spacingHorizontal: 8,
    spacingVertical: 8,
    tileSize: 115,
    fieldSize: 500
};

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");


        this._moveHandler = (x, y) => {
            this.tile.x += (sceneConfig.tileSize+sceneConfig.spacingHorizontal) * ((x < 0)? -1: ((x == 0)? 0 : 1));
            this.tile.y -= (sceneConfig.tileSize+sceneConfig.spacingVertical) * ((y < 0)? -1: ((y == 0)? 0 : 1));
            console.log(this.tile.x + " "+ this.tile.y);

            this._addNewTile();
        };

        this._addNewTile = () => {
            //TODO:
        };
        
    }

	preload() {
        this.load.image('tile', 'assets/minisquare.png');
        this.load.image('field',"assets/field.png");
    }
    
	create() {
        
        this.keyHandler = new KeyHandler(this, this._moveHandler);
        this.fieldManager = new FieldManager(this);

        this.tile = this.add.sprite(
            sceneConfig.tileSize/2 + sceneConfig.spacingHorizontal, 
            sceneConfig.tileSize/2 + sceneConfig.spacingVertical, 'tile');
    }
    
    //update() {}
        
}

let tile;
