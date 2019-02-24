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

const shareConfig = {
    title: "ssas",
    text: "asasasa",
    url: window.location.href
}

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

    init_Scores() {
        this.scoreText = this.make.text(scoreConfig);
        this.events.on('onScoreChanged', this.scoreChanged, this);
        this.bestScoreText = this.make.text(bestScoreConfig);
        this.events.on('onBestScoreChanged', this.bestScoreChanged, this);
    }

    init_Buttons()
    {
        //RATING BUTTON
        this.ratingButton = new Button('ratingButton', 810, 318, this);
        this.ratingButton.Up = () => {
            this.scene.launch("RatingTableScene", this); 
            this.scene.pause('MainScene');
            this.fieldManager.pause();
            this.backend.reciveRating();
        };

        //RESTART BUTTON
        this.restartButton = new Button('restartButton', 926, 318, this);
        this.restartButton.Up = () => {
            this.fieldManager.restart();
        };

        //FACEBOOK BUTTON
        this.facebookButton = new Button('facebookButton', 64, 1455, this);
        this.facebookButton.Up = () => {
            let url  = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]='     + encodeURIComponent(shareConfig.title);
		    url += '&p[summary]='   + encodeURIComponent(shareConfig.text);
		    url += '&p[url]='       + encodeURIComponent(sceneConfig.url);
		    // url += '&p[images][0]=' + encodeURIComponent(pimg);
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        };
        //VK BUTTON
        this.vkButton = new Button('vkButton', 64+100, 1455, this);
        this.vkButton.Up = () => {
            let url  = 'http://vk.com/share.php?';
		    url += 'url='          + encodeURIComponent(shareConfig.url);
		    url += '&title='       + encodeURIComponent(shareConfig.title);
		    url += '&description=' + encodeURIComponent(shareConfig.text);
		    //url += '&image='       + encodeURIComponent();
            url += '&noparse=true';
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        };
        //TWITTER BUTTON
        this.twitterButton = new Button('twitterButton', 64+200, 1455, this);
        this.twitterButton.Up = () => {
            let url  = 'http://twitter.com/share?';
		    url += 'text='      + encodeURIComponent(shareConfig.text);
		    url += '&url='      + encodeURIComponent(shareConfig.url);
            url += '&counturl=' + encodeURIComponent(shareConfig.url);
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        };
        //TELEGRAM BUTTON
        this.telegramButton = new Button('telegramButton', 64+300, 1455, this);
        this.telegramButton.Up = () => {
            let url = 'https://t.me/share/url?';
            url += 'url=' + encodeURIComponent(shareConfig.url);
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        }
    }
    
	create() {
        this.fieldManager = new FieldManager(this, sceneConfig);
        this.keyHandler = new KeyHandler(this, this.fieldManager);
        this.backend = new BackEnd(this);

        this.init_Scores();
        this.init_Buttons();
        
        this.fieldManager.start();
    }
}
