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
        this.backEnd = new BackEnd(this);

        // Add first two tiles on the field.
        this.fieldManager.addNewTile();
        this.fieldManager.addNewTile();

        //TODO:
        
        // be.reciveRaiting();
        this.scene.launch("RatingTableScene", this, this.backEnd);
        this.backEnd.reciveRaiting();
        //this.scene.stop();
    }
}
