import { gameState } from "./FieldManager.js"

export default class FieldAnimation {
    
    constructor (field, mainScene) {
        this.field = field;
        this.mainScene = mainScene;
        this.tilesToMove = []
        this.tween;
        this.tweenNew;
    }

    addMovement (movement) {
        this.tilesToMove.push(movement);
    }
    
    doMove () {
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
                field._redraw();
                field.sendScore();
            }
        });
    }


    doIncrease(){
        this.tween = this.mainScene.tweens.add({
            targets: this.tilesToMove,

            scaleX: function(a){
                return 1 + a.num * 0.05;
            },
            scaleY: function(a){
                return 1 + a.num * 0.05;      
            },

            yoyo: true,
            ease: 'Quart.easeInOut',
            duration: this.field.sceneConfig.movingSpeed / 2,

            onStartParams: [ this.field ],
            onStart: function(tween, targets, field){
                field.canMove = true;
            },

            onCompleteParams: [ this.field ],
            onComplete: function(tween, targets, field){
                for(let i = 0; i < targets.length; i++){
                    targets[i].scaleX = 1;
                    targets[i].scaleY = 1;
                }
                field.animation.tilesToMove = []
                field.canAnimate = true;
                field.toIncrease = 0;
            }
        });
    }


    doApperance(sprite){
        this.tweenNew = this.mainScene.tweens.add({
            targets: sprite,

            scaleX: 1,
            scaleY: 1,
            ease: 'Expo.easeIn',    
            duration: this.field.sceneConfig.movingSpeed,

            onStartParams: [ this.field ],
            onStart: function(tween, targets, field){
                targets[0].scaleX = 0;
                targets[0].scaleY = 0;
                targets[0].visible = true;
                if(field.toIncrease == 0){
                    field.canMove = true;
                }
            },

            onCompleteParams: [ this.field ],
            onComplete: function(tween, targets, field){
                targets[0].scaleX = 1;
                targets[0].scaleY = 1;
                if (field.state == gameState.LOSE){
                    field.GameLose();
                }
                else if (field.state == gameState.WIN){
                    field.GameWin();
                }
                if (field.toIncrease == 0){
                    field.canAnimate = true;
                }
            }
        });
    }

    
    stop () {
        if (this.tween && this.tween.isPlaying()){
            this.field.canAnimate = false;
            this.tween.complete();
        }
        if (this.tweenNew && this.tweenNew.isPlaying()){
            this.field.canAnimate = false;
            this.tweenNew.complete();
        }
    }
}