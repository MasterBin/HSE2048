import FieldManager from "./FieldManager.js";
import KeyHandler from "./KeyHandler.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
	preload() {
        this.load.image('tile', 'assets/minisquare.png');
        this.load.image('field',"assets/field.png");
	}
	create() {
        
        var fieldManager = new FieldManager(this);
        var keyHandler = new KeyHandler(this, this.moveHandler);
    }

    moveHandler (x, y) {
        console.log(x+ " " +y );
    }
	//update() {}
}
