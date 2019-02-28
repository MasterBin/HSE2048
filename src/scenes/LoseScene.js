import Button from "../Button.js";

// font 32px maxsize = 192 characters

//TODO: смешные фразы
const losePhrases = [
    "Чутка не хватило, как и до твоей 35й",
    "Давай еще катку и потом вместе оформим иуп?",
    "Давай еще, все равно ко второй поедешь",
    "ИУП is coming",
    "Не быть ремонту в вашем корпусе"
    //"################################################################################################################################################################################################"
]


export default class LoseScene extends Phaser.Scene {
    constructor() {
        super("LoseScene");
    }

    init(mainScene) {
        this.mainScene = mainScene;
    }

    showText() {
        //TODO: не делать рандом
        let phrase = Phaser.Utils.Array.GetRandom(losePhrases);

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

    create() {
        this.add.image(500, 800, 'lose');

        this.loseButton = new Button('loseButton', 500, 1028, this);

        this.loseButton.Up = () => {
            this.mainScene.fieldManager.restart();
            this.scene.resume('MainScene');
            this.scene.sleep();
        };

        this.showText();
    }

}