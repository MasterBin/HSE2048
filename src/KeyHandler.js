
// represents onMoved event with two args: "x" and "y" 
export default class KeyHandler {

    constructor(mainScene, fieldManager) {
        this.mainScene = mainScene;
        mainScene.input.keyboard.on("keydown", this.keyPressedHandler, this);
        mainScene.input.on("pointerup", this.swipedHandler, this);
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

    swipedHandler(swp) {
        var swipeTime = swp.upTime - swp.downTime;
        var swipe = new Phaser.Geom.Point(swp.upX - swp.downX, swp.upY - swp.downY);
        var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
        if(swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)){
            
            if(swipeNormal.x > 0.8) {
                this.mainScene.events.emit("onMoved", 1, 0);
            }
            if(swipeNormal.x < -0.8) {
                this.mainScene.events.emit("onMoved", -1, 0);
            }
            if(swipeNormal.y > 0.8) {
                this.mainScene.events.emit("onMoved", 0, 1);
            }
            if(swipeNormal.y < -0.8) {
                this.mainScene.events.emit("onMoved", 0, -1);
            }
        }
    }
    

}

//TODO: add swipes

