export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
	preload() {
        this.load.image('tile', 'assets/minisquare.png');
        this.load.image('field',"assets/field.png");
	}
	create() {
        let field = this.add.image(250,250,'field');
        ball = this.add.image(65, 68, 'tile');
    }
	//update() {}
}
let ball;