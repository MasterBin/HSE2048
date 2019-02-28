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
        this.backend.sendBestScore(this.UI.inputField.getName(), this.fieldManager.score);
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




        // var lol = document.getElementById("textinput");
        // var wid = 380 + "px";
        // lol.style.width = wid;
        // lol.style.height = "50px";
        // lol.style.top = "1820px";
        // lol.style.left = "725px";
        // lol.style.border = "0px";
        // lol.style.fontSize = "40px";
        // lol.style.background = "#86bcc5";


        // // lol.style.zIndex = 20;
        // console.log(lol);
    }
}
