import Button from "./Button.js";
import InputField from "./InputField.js";

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

export default class UI {
    constructor (mainScene) {
        this.mainScene = mainScene;
        this.inputField = new InputField(this.mainScene);
         
        this._init_Buttons();
        this._init_Scores();

        this.inputField = new InputField(this.mainScene);
        this.mainScene.events.on('onNameRecived', this._nameRecived, this);
        this.mainScene.backend.reciveName();
    }

    _nameRecived(name) {
        this.inputField.setText(name);
    }

    _init_Buttons() {

        // RANDOM NAME BUTTON
        this.randomNameButton = new Button('randomButton', 939, 1456, this.mainScene);
        this.randomNameButton.Up = () => {
            this.mainScene.backend.reciveName();
        };

        // RATING BUTTON
        this.ratingButton = new Button('ratingButton', 810, 318, this.mainScene);
        this.ratingButton.Up = () => {
            this.mainScene.loadSceneOver('RatingTableScene');
            this.mainScene.backend.reciveRating();
        };

        // RESTART BUTTON
        this.restartButton = new Button('restartButton', 926, 318, this.mainScene);
        this.restartButton.Up = () => {
            this.mainScene.fieldManager.restart();
        };

        // FACEBOOK BUTTON
        this.facebookButton = new Button('facebookButton', 64, 1455, this.mainScene);
        this.facebookButton.Up = () => {
            let url = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]=' + encodeURIComponent(shareConfig.title);
            url += '&p[summary]=' + encodeURIComponent(shareConfig.text);
            url += '&p[url]=' + encodeURIComponent(shareConfig.url);
            // url += '&p[images][0]=' + encodeURIComponent(pimg);
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        };
        
        // VK BUTTON
        this.vkButton = new Button('vkButton', 64 + 100, 1455, this.mainScene);
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
        this.twitterButton = new Button('twitterButton', 64 + 200, 1455, this.mainScene);
        this.twitterButton.Up = () => {
            let url = 'http://twitter.com/share?';
            url += 'text=' + encodeURIComponent(shareConfig.text);
            url += '&url=' + encodeURIComponent(shareConfig.url);
            url += '&counturl=' + encodeURIComponent(shareConfig.url);
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        };

        //TELEGRAM BUTTON
        this.telegramButton = new Button('telegramButton', 64 + 300, 1455, this.mainScene);
        this.telegramButton.Up = () => {
            let url = 'https://t.me/share/url?';
            url += 'url=' + encodeURIComponent(shareConfig.url);
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        }
    }

    _init_Scores() {
        this.scoreText = this.mainScene.make.text(scoreConfig).setOrigin(0.5);
        this.mainScene.events.on('onScoreChanged', this.scoreChanged, this);
        this.bestScoreText = this.mainScene.make.text(bestScoreConfig).setOrigin(0.5);
        this.mainScene.events.on('onBestScoreChanged', this.bestScoreChanged, this);
    }

    init_bestScore () {
        let bscore = null;
        bscore = this.mainScene.storage.getFromStorage("bestScore");
        this.mainScene.fieldManager.bestScore = (bscore == null ? 0 : bscore);
        this.bestScoreChanged(this.mainScene.fieldManager.bestScore);
    }

    scoreChanged(value) {
        this.scoreText.setText(value);
    }

    bestScoreChanged(value) {
        this.bestScoreText.setText(value);
    }
}