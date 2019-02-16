
// represents onMoved event with two args: "x" and "y" 
export default class KeyHandler {

    constructor (game, fieldManager) {
        this.game = game;
        game.input.keyboard.on("keydown", this.onKeyPressed, this);
        game.events.on("onMoved", fieldManager.moveHandler, fieldManager);
    }

    onKeyPressed (key) {
        
        switch (key.code) {
            case "KeyW":
            case "ArrowUp":
                this.game.events.emit("onMoved", 0, -1);
                break;

            case "KeyA":
            case "ArrowLeft":
                this.game.events.emit("onMoved", -1, 0);
                break;

            case "KeyS":
            case "ArrowDown":
                this.game.events.emit("onMoved", 0, 1);
                break;

            case "KeyD":
            case "ArrowRight":
                this.game.events.emit("onMoved", 1, 0);
                break;
        }
    }

    _test(text)
    {
        console.log(text);
    }
    

}

//TODO: add swipes
//TODO: на keyUp ускорять анимацию чтобы плавно было усе
