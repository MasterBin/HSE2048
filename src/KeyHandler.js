
// represents onMoved event with two args: "x" and "y" 
export default class KeyHandler {

    constructor(mainScene, fieldManager) {
        this.mainScene = mainScene;
        mainScene.input.keyboard.on("keydown", this.keyPressedHandler, this);
    }

    keyPressedHandler(key) {
        switch (key.code) {
            case "KeyW":
            case "ArrowUp":
                this.mainScene.events.emit("onMoved", 0, -1);
                break;

            case "KeyA":
            case "ArrowLeft":
                this.mainScene.events.emit("onMoved", -1, 0);
                break;

            case "KeyS":
            case "ArrowDown":
                this.mainScene.events.emit("onMoved", 0, 1);
                break;

            case "KeyD":
            case "ArrowRight":
                this.mainScene.events.emit("onMoved", 1, 0);
                break;
        }
    }
    

}

//TODO: add swipes

