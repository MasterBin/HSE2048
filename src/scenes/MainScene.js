import FieldManager from "../FieldManager.js";
import KeyHandler from "../KeyHandler.js";
import BackEnd from "../BackEnd.js";
import RatingTableScene from "./RatingTableScene.js";

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
        

        // Add first two tiles on the field.
        this.fieldManager.addNewTile();
        this.fieldManager.addNewTile();

        //TODO:
        // let be = new BackEnd();
        // be.reciveRaiting();
        //let scene = new RatingTableScene(this);
        //this.scene.launch("RatingTableScene", scene);
        //this.scene.stop();
    }   
}
