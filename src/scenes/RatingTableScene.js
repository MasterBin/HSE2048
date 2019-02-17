export default class RatingTableScene extends Phaser.Scene {
    constructor () {
        super ("RatingTableScene");

        this.ratingText = [];
    }

    init (mainScene) {
        mainScene.events.on('onRatingRecived', this.reciveTableHandler, this);
    }

    create() {
        this.add.image(250, 250, 'rating');

        this.loadingtext = this.add.text(190, 230, 'Loading...', {
            font: "bold 32px Arial",
            align: "center",
            color: "black"
        });

        for (let i = 0; i < 10 ; ++i) {
            this.ratingText.push(this.add.text(100, 100+i*35, '', {
                font: "bold 16px Arial",
                color: "black"
            }));
        }
    }

    reciveTableHandler (table) {
        this.loadingtext.setText('');
        for (let i = 0 ; i< table.length; ++i) {
            this.ratingText[i].setText(`${i+1}. ${table[i].name}   ${table[i].score}`);
        }
    }   

    _reset() {
        for (let i = 0; i < 10 ; ++i) {
            this.ratingText[i].setText('');
        }
    }
}