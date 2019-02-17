import MainScene from "./MainScene.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

	preload() {
        this.load.image('field','assets/field.png');
        this.load.image('rating','assets/rating_background.png');
        this.load.spritesheet("tiles", "assets/tiles.png", {
            frameWidth: 115,
            frameHeight: 115
        });
    }
    
	create() {
        this.scene.start('MainScene');
    }
}
