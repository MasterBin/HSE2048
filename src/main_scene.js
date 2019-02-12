class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }
	preload() {
        this.load.image('ball', 'assets/ball.png');
		this.load.image('hills',"assets/hills.png");
	}
	create() {
        let background = this.add.image(256,320,'hills').setScale(1,1);
         ball = this.add.image(50, 50, 'ball');
        //ball.body.gravity.y = 0;
		
    }
	update() {

        if (ball.y >= 256 || ball.y <= 0) {
            ball.x -= Math.random()*30;
        }
        if (ball.x >= 640  || ball.x <= 0) {
            ball.x -= Math.random()*30;
        }
        
        ++ball.x;
        ++ball.y;
	}
}
let ball;