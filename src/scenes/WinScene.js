import Button from "../Button.js";

const winPhrases = [
    "################################################################################################################################################################################################"
]

export default class WinScene extends Phaser.Scene {
    constructor () {
        super("WinScene");
    }

    init (mainScene) {
        this.mainScene = mainScene;
    }

    showText() {
        let phrase = Phaser.Utils.Array.GetRandom(winPhrases);

        this.make.text({
            x: 500,
            y: 800,
            text: phrase,
            origin: { x: 0.5 , y: 0.5 },
            style: {
                font: "bold 32px Ayuthaya",
                color: "#1E88E5",
                align: 'center',
                wordWrap: { width: 650, useAdvancedWrap: true }
            }
        });
    }

    create () {
        this.add.image(500,800, 'win');
        
        this.continueButton = new Button('continueButton', 340, 1028, this);
        
        this.continueButton.Up = () => {
            this.mainScene.fieldManager.resume();
            this.scene.resume('MainScene');
            this.scene.sleep();
        };

        this.endGameButton = new Button('endGameButton', 660, 1028, this);

        this.endGameButton.Up = () => {
            this.mainScene.fieldManager.restart();

            
            this.scene.resume('MainScene');
            this.scene.sleep();
        }

        this.showText();
    }
}