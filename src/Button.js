export default class Button {

    constructor(spriteName, x, y, scene,
        handlerDown = null, handlerUp = null, handlerOver = null, handlerOut = null) {

        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, spriteName).setInteractive();

        this.handlerDown = handlerDown;
        this.handlerUp = handlerUp;
        this.handlerOver = handlerOver;
        this.handlerOut = handlerOut;

        this.sprite.on('pointerdown', this._onPointerDown, this);
        this.sprite.on('pointerup', this._onPointerUp, this);
        this.sprite.on('pointerover', this._onPointerOver, this);
        this.sprite.on('pointerout', this._onPointerOut, this);
    }

    _onPointerDown() {
        this.sprite.setFrame(1);
        if (this.handlerDown != null) {
            this.handlerDown();
        }
    }

    _onPointerUp() {
        this.sprite.setFrame(0);
        if (this.handlerUp != null) {
            this.handlerUp();
        }
    }

    _onPointerOver() {
        this.sprite.setFrame(2);
        if (this.handlerOver != null) {
            this.handlerOver();
        }
    }

    _onPointerOut() {
        this.sprite.setFrame(0);
        if (this.handlerOut != null) {
            this.handlerOut();
        }
    }

    set Down(handlerDown) {
        this.handlerDown = handlerDown;
    }

    set Up(handlerUp) {
        this.handlerUp = handlerUp;
    }

    set Over(handlerOver) {
        this.handlerOver = handlerOver;
    }

    set Out(handlerOut) {
        this.handlerOut = handlerOut;
    }
}