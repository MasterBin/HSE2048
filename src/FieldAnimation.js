const State = {
    RECORD : 0,
    LOADING: 1,
    COMPLETED: 2
};

export default class FieldAnimation {
    
    constructor (field, mainScene) {
        this.field = field;
        this.mainScene = mainScene;
        this.state = State.RECORD;
        this.tilesToMove = []
        this.tween;
    }

    addMovement (movement) {
        // if (this.state != State.RECORD)
        //     return;
        this.tilesToMove.push(movement);

    }
    
    doMove () {
        // if (this.state != State.RECORD)
        //     return;

        this.tween = this.mainScene.tweens.add({
            targets: this.tilesToMove,
            x: function(a){
                return a.destination.x;
            },
            y: function(a){
                return a.destination.y;
            },
            ease: 'Cubic.easeInOut',
            duration: this.field.sceneConfig.movingSpeed,

            onStartParams: [ this.field ],
            onStart: function(tween, targets, field){
                field.canMove = true;
            },

            onCompleteParams: [ this.field ],
            onComplete: function(tween, targets, field){
                field.animation.tilesToMove = []
                field.redraw();
            }
        });
    }
    
    stop () {
        // if (this.state != State.LOADING)
        //     return;
        if (this.tween && this.tween.isPlaying()){
            this.tween.stop();
            this.tilesToMove = [];
            this.field.redraw();
        }
    }
}