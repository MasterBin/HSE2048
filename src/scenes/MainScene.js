import FieldManager from "../FieldManager.js";
import KeyHandler from "../KeyHandler.js";
import BackEnd from "../BackEnd.js";
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
    }

    winHandler(bscore) {
        this.loadSceneOver('WinScene');
        //TODO: сделать что-то с этим ужасом
        this.backend.sendBestScore(this.ui.inputField.getText(), this.fieldManager.score);
    }

    // TODO: вместо bestscore - наибольшее значение ячейки
    loseHandler(bscore) {
        this.loadSceneOver('LoseScene');
        this.backend.sendBestScore(this.ui.inputField.getText(), bscore);
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
    }
}
