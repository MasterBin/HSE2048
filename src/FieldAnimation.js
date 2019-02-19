const State = {
    RECORD : 0,
    LOADING: 1,
    COMPLETED: 2
};

export default class FieldAnimation {
    
    constructor (mainScene) {
        this.mainScene = mainScene;
        this.state = State.RECORD;
    }

    addMovement (movement) {
        if (this.state != State.RECORD)
            return;

    }
    
    doMove () {
        if (this.state != State.RECORD)
            return;
    }
    
    stop () {
        if (this.state != State.LOADING)
            return;
    }
}