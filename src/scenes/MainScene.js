import FieldManager from "../FieldManager.js";
import KeyHandler from "../KeyHandler.js";
import BackEnd from "../BackEnd.js";
import Button from "../Button.js";
import LocalStorageManager from "../LocalStorageManager.js";
import UI from "../UI.js";

const sceneConfig = {
    spacing: 16,
    tileSize: 230,
    fieldX: 394,
    movingSpeed: 100
};

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    loadSceneOver (sceneName) {
        if (!this.scene.isSleeping(sceneName))
                this.scene.launch(sceneName, this);
            else
                this.scene.wake(sceneName);

        this.scene.pause('MainScene');
        //this.fieldManager.pause();
    }

    winHandler(bscore) {
        this.loadSceneOver('WinScene');
        //TODO: сделать что-то с этим ужасом
        this.backend.sendBestScore("LOL", this.fieldManager.score);
    }

    // TODO: вместо bestscore - наибольшее значение ячейки
    loseHandler(bscore) {
        this.loadSceneOver('LoseScene');
        //TODO: nickname
        this.backend.sendBestScore("LOL", bscore);
    }

    create() {
        this.add.image(500, 760, 'field');
        this.fieldManager = new FieldManager(this, sceneConfig);
        this.keyHandler = new KeyHandler(this, this.fieldManager);
        this.backend = new BackEnd(this);
        this.storage = new LocalStorageManager();
        this.ui = new UI(this);

        this.events.on('onGameLose', this.loseHandler, this);
        this.events.on('onGameWin', this.winHandler, this);

        this.fieldManager.start();

        // this.input = new CanvasInput({
        //     canvas: document.getElementById('hse2048_canvas'),
        //     fontSize: 18,
        //     fontFamily: 'Arial',
        //     fontColor: '#212121',
        //     fontWeight: 'bold',
        //     width: 300,
        //     padding: 8,
        //     borderWidth: 1,
        //     borderColor: '#000',
        //     borderRadius: 3,
        //     boxShadow: '1px 1px 0px #fff',
        //     innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        //     placeHolder: 'Enter message here...'
        // });
        
        // this.textures.createCanvas("textInput", 300, 50);
        
        // this.input.focus();
    }

    // update() {
    //     this.input.render();
    // }
}
