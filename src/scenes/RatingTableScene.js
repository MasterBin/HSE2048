export default class RatingTableScene extends Phaser.Scene {
    constructor (game) {
        super ("RatingTableScene");

        if (!game)
            console.log("game is " + game);

        this.game = game;
    }

    preload() {
        console.log("RATING_TABLE preload");
    }

    create() {
        this.add.image(250, 250, 'rating');
    }
}