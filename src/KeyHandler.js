export default class KeyHandler {

    constructor (game) {
        game.input.keyboard.on("keydown", this.onKeyPressed, this);
    }

    onKeyPressed (key) {
        
        switch (key.code) {
            case "KeyW":
            case "ArrowUp":
                console.log("up");
                break;

            case "KeyA":
            case "ArrowLeft":
                console.log("left");
                break;

            case "KeyS":
            case "ArrowDown":
                console.log("down");
                break;

            case "KeyD":
            case "ArrowRight":
                console.log("right");
                break;
        }
    }
    

}

//TODO: на keyUp ускорять анимацию чтобы плавно было усе
