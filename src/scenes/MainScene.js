import FieldManager from "../FieldManager.js";
import KeyHandler from "../KeyHandler.js";
import BackEnd from "../BackEnd.js";

const sceneConfig = {
    spacing: 8,
    tileSize: 115,
    fieldSize: 500
};

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
    
	create() {
        
        this.fieldManager = new FieldManager(this, sceneConfig);
        this.keyHandler = new KeyHandler(this, this.fieldManager);
        this.backend = new BackEnd(this);

        // Add first two tiles on the field.

        

        //TODO:
        
        //this.scene.launch("RatingTableScene", this);
        //this.backend.reciveRating();
        //this.scene.stop();
        this.fieldManager.start();
        //this.fieldManager.pause();
    }
}
