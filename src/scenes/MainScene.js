import FieldManager from "../FieldManager.js";
import KeyHandler from "../KeyHandler.js";
import BackEnd from "../BackEnd.js";
import Button from "../Button.js";
import LocalStorageManager from "../LocalStorageManager.js";

const sceneConfig = {
    spacing: 16,
    tileSize: 230,
    fieldX: 394,
    movingSpeed: 100
};

const scoreConfig = {
    x: 181,
    y: 303,
    text: '0',
    style: {
        font: "bold 48px Ayuthaya",
        color: "#00A3F7"
    }
};

const bestScoreConfig = {
    x: 532,
    y: 303,
    text: '########',
    style: {
        font: "bold 48px Ayuthaya",
        color: "#00A3F7"
    }
};

const shareConfig = {
    title: "HSE2048",
    text: "Игра для настоящих вышкинцов!",
    url: window.location.href
}

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    winHandler() {
        this.add.text(250, 250, "WIN", {
            font: "bold 128px Arial",
            align: "center",
            color: "green"
        });
        this.fieldManager.resume();
    }

    loseHandler(bscore) {
        this.add.text(250, 250, "Lose, Please restart", {
            font: "bold 128px Arial",
            align: "center",
            color: "green"
        });
        // let current_best_score = parseInt(this.bestScoreText.text);
        // if (bscore > current_best_score) {
        //     this.bestScoreText.setText(bscore);
        //     //сохранение на локалку
        //     if (this.storage.localStorageSupported())
        //         this.storage.putToStarage(bscore, 'bestscore');
        //     //TODO: отправка на сервер
             this.backend.sendBestScore("LOL", bscore);
        // }
    }

    scoreChanged(value) {
        this.scoreText.setText(value);
    }

    bestScoreChanged(value) {
        this.bestScoreText.setText(value);
    }

    init_Scores() {
        this.scoreText = this.make.text(scoreConfig).setOrigin(0.5);
        this.events.on('onScoreChanged', this.scoreChanged, this);
        this.bestScoreText = this.make.text(bestScoreConfig).setOrigin(0.5);
        this.events.on('onBestScoreChanged', this.bestScoreChanged, this);
    }

    init_Buttons() {
        // RATING BUTTON
        this.ratingButton = new Button('ratingButton', 810, 318, this);
        this.ratingButton.Up = () => {
            if (!this.scene.isSleeping('RatingTableScene'))
                this.scene.launch("RatingTableScene", this);
            else
                this.scene.wake("RatingTableScene");
            this.scene.pause('MainScene');
            this.fieldManager.pause();
            this.backend.reciveRating();
        };

        // RESTART BUTTON
        this.restartButton = new Button('restartButton', 926, 318, this);
        this.restartButton.Up = () => {
            this.fieldManager.restart();
        };

        // FACEBOOK BUTTON
        this.facebookButton = new Button('facebookButton', 64, 1455, this);
        this.facebookButton.Up = () => {
            let url = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]=' + encodeURIComponent(shareConfig.title);
            url += '&p[summary]=' + encodeURIComponent(shareConfig.text);
            url += '&p[url]=' + encodeURIComponent(sceneConfig.url);
            // url += '&p[images][0]=' + encodeURIComponent(pimg);
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        };
        
        // VK BUTTON
        this.vkButton = new Button('vkButton', 64 + 100, 1455, this);
        this.vkButton.Up = () => {
            let url = 'http://vk.com/share.php?';
            url += 'url=' + encodeURIComponent(shareConfig.url);
            url += '&title=' + encodeURIComponent(shareConfig.title);
            url += '&description=' + encodeURIComponent(shareConfig.text);
            //url += '&image='       + encodeURIComponent();
            url += '&noparse=true';
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        };

        //TWITTER BUTTON
        this.twitterButton = new Button('twitterButton', 64 + 200, 1455, this);
        this.twitterButton.Up = () => {
            let url = 'http://twitter.com/share?';
            url += 'text=' + encodeURIComponent(shareConfig.text);
            url += '&url=' + encodeURIComponent(shareConfig.url);
            url += '&counturl=' + encodeURIComponent(shareConfig.url);
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        };

        //TELEGRAM BUTTON
        this.telegramButton = new Button('telegramButton', 64 + 300, 1455, this);
        this.telegramButton.Up = () => {
            let url = 'https://t.me/share/url?';
            url += 'url=' + encodeURIComponent(shareConfig.url);
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        }
    }

    init_bestScore () {
        let bscore = null;
        bscore = this.storage.getFromStorage("bestScore");
        console.log(bscore);

        this.fieldManager.bestScore = (bscore == null ? 0 : bscore);
        
        console.log(this.fieldManager.bestScore);

        this.bestScoreChanged(this.fieldManager.bestScore);
    }

    create() {
        this.fieldManager = new FieldManager(this, sceneConfig);
        this.keyHandler = new KeyHandler(this, this.fieldManager);
        this.backend = new BackEnd(this);
        this.storage = new LocalStorageManager();

        this.init_Scores();
        this.init_Buttons();

        this.events.on('onGameLose', this.loseHandler, this);
        this.events.on('onGameWin', this.winHandler, this);

        this.fieldManager.start();
    }
}
