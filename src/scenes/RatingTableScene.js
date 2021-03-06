import Button from "../Button.js";

export default class RatingTableScene extends Phaser.Scene {

    constructor() {
        super("RatingTableScene");
    }

    init(mainScene) {
        this.mainScene = mainScene;
    }

    create() {
        this.mainScene.events.on('onRatingRecived', this._reciveTableHandler, this);
        this.add.image(500, 800, 'rating');

        this.loadingtext = this.add.text(420, 290, 'Loading...', {
            font: "bold 32px Ayuthaya",
            align: "center",
            color: "white"
        });

        this.names = [];
        this.scores = [];
        for (let i = 0; i < 10; ++i) {
            this.names.push(this.add.text(330, 430 + i * 100, '', {
                font: "bold 48px Ayuthaya",
                color: "#E3F2FD",
                align: "center",
                backgroundColor: "#00A3F7",
                padding: { right: 6 }
            }).setOrigin(0.5));

            this.scores.push(this.add.text(700, 430 + i * 100, '', {
                font: "bold 48px Ayuthaya",
                color: "black",
                align: "center",
                lineSpacing: 40
            }).setOrigin(0.5));
        }

        this.closeButton = new Button('closeButton', 871, 255, this);

        this.closeButton.Up = () => {
            this.mainScene.fieldManager.resume();
            this.scene.resume('MainScene');
            this.scene.sleep();
        }

    }

    _reciveTableHandler(table) {
        this.loadingtext.setVisible(false);
        for (let i = 0; i < table.length; ++i) {
            this.names[i].setText(`${table[i].name}`);
            this.scores[i].setText(`${table[i].score}`);
        }
    }

    _reset() {
        for (let i = 0; i < 10; ++i) {
            this.names[i].setVisible(false);
            this.scores[i].setVisible(false);
        }
    }
}

//TODO: add animation on launch