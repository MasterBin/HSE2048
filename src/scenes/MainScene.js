import FieldManager from "../FieldManager.js";
import KeyHandler from "../KeyHandler.js";
import BackEnd from "../BackEnd.js";

const sceneConfig = {
    spacing: 16,
    tileSize: 230,
    fieldX: 394,
    movingSpeed: 100
};

const scoreConfig = {
    x: 78,
    y: 220,
    text: '       \n#######',
    style: {
        font: "bold 48px Ayuthaya",
        color: "#00A3F7",
        align: "center"
    }
};

const bestScoreConfig = {
    x: 430,
    y: 220,
    text: '       \n#######',
    style: { 
        font: "bold 48px Ayuthaya",
        color: "00A3F7",
        align: "center"
    }
};

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    scoreChanged (value) {
        this.scoreText.setText('       \n'+value);
    }

    bestScoreChanged (value) {

    }
    
	create() {
        this.fieldManager = new FieldManager(this, sceneConfig);
        this.keyHandler = new KeyHandler(this, this.fieldManager);
        this.backend = new BackEnd(this);

        this.scoreText = this.make.text(scoreConfig);
        this.bestScoreText = this.make.text(bestScoreConfig);
        
        this.events.on('onScoreChanged', this.scoreChanged, this);
        

        

        //this.scene.launch("RatingTableScene", this);
        //this.backend.reciveRating();
        //this.scene.stop();
        this.fieldManager.start();
        //this.fieldManager.pause();
    }
}
