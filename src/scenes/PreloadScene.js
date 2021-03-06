import MainScene from "./MainScene.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

	preload() {
        this.load.image('field','assets/field.png');
        this.load.image('rating','assets/rating.png');
        this.load.image('lose', 'assets/lose.png');
        this.load.image('win', 'assets/win.png');

        this.load.spritesheet('randomButton', 'assets/diceButton.png', {
            frameWidth: 80,
            frameHeight: 80
        });

        this.load.spritesheet('continueButton', 'assets/continuebutton.png', {
            frameWidth: 300,
            frameHeight: 80
        });
        this.load.spritesheet('endGameButton', 'assets/endgamebutton.png', {
            frameWidth: 300,
            frameHeight: 80
        });

        this.load.spritesheet('loseButton', 'assets/losebutton.png', {
            frameWidth: 360,
            frameHeight: 80
        });


        this.load.spritesheet('facebookButton', 'assets/facebook.png', {
            frameWidth: 86,
            frameHeight: 86
        });
        this.load.spritesheet('vkButton', 'assets/vk.png', {
            frameWidth: 86,
            frameHeight: 86
        });
        this.load.spritesheet('twitterButton', 'assets/twitter.png', {
            frameWidth: 86,
            frameHeight: 86
        });
        this.load.spritesheet('telegramButton', 'assets/telegram.png', {
            frameWidth: 86,
            frameHeight: 86
        });


        this.load.spritesheet('ratingButton', 'assets/ratingbutton.png', {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('restartButton', 'assets/restartbutton.png', {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet('closeButton', 'assets/closebutton.png', {
            frameWidth: 100,
            frameHeight: 100
        });


        this.load.spritesheet("tiles", "assets/tiles.png", {
            frameWidth: 230,
            frameHeight: 230
        });
    }
    
	create() {
        this.scene.start('MainScene');
    }
}
