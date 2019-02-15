import FieldManager from "./FieldManager.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }
	preload() {
        this.load.image('tile', 'assets/minisquare.png');
        this.load.image('field',"assets/field.png");
	}
	create() {
        
        var fieldManager = new FieldManager(this);
    }
	//update() {}
}
let ball;