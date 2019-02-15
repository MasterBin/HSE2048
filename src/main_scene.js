import FieldManager from "./FieldManager.js";
import KeyHandler from "./KeyHandler.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");

        this._moveHandler = (x, y) => {
            this.tile.x += x;
            this.tile.y -= y;
            console.log(this.tile.x + " "+ this.tile.y);
        };

        this._addNewTile() = () => {
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

        this.tile = this.add.sprite(50, 50, 'tile');
    }
    
    //update() {}

        
}
