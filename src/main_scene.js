import FieldManager from "./FieldManager.js";
import KeyHandler from "./KeyHandler.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
        this.tile;
    }

	preload() {
        this.load.image('tile', 'assets/minisquare.png');
        this.load.image('field',"assets/field.png");
    }
    
	create() {
        
        this.keyHandler = new KeyHandler(this, this.moveHandler);
        //this.fieldManager = new FieldManager(this);

        //delete it a
        tile = this.add.image(50,50, 'tile');

        
    }

    moveHandler (x, y) {
        console.log(x + " "+ y);
        tile.x += x*10;
        tile.y -= y*10;
    }
	//update() {}
}

let tile;
