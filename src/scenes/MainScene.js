import FieldManager from "../FieldManager.js";
import KeyHandler from "../KeyHandler.js";
import BackEnd from "../BackEnd.js";
import Button from "../Button.js";

const sceneConfig = {
    spacing: 16,
    tileSize: 230,
    fieldX: 394,
    movingSpeed: 100
};

//TODO: font
const scoreConfig = {
    x: 139,
    y: 220,
    text: '       \n#######',
    style: {
        font: "bold 48px 'Fedra Sans'",
        color: "#00A3F7",
        align: "center"
    }
};

//TODO: font
const bestScoreConfig = {
    x: 446,
    y: 220,
    text: '       \n#######',
    style: { 
        font: "bold 48px 'Fedra Sans'",
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
        this.bestScoreText.setText('       \n'+value);
    }
    
	create() {
        this.fieldManager = new FieldManager(this, sceneConfig);
        this.keyHandler = new KeyHandler(this, this.fieldManager);
        this.backend = new BackEnd(this);

        this.scoreText = this.make.text(scoreConfig);
        this.events.on('onScoreChanged', this.scoreChanged, this);
        this.bestScoreText = this.make.text(bestScoreConfig);
        this.events.on('onBestScoreChanged', this.bestScoreChanged, this);
        
        this.ratingButton = new Button('ratingButton', 810, 318, this);
        this.ratingButton.Up = () => {
            this.scene.launch("RatingTableScene", this); 
            this.fieldManager.pause();
            this.backend.reciveRating();
        };

        this.restartButton = new Button('restartButton', 926, 318, this);
        this.restartButton.Up = () => {
            this.fieldManager.restart();
        };
        
        this.fieldManager.start();
    }
}
