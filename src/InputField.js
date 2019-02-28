

export default class InputField {
    constructor (mainScene) {
        this.mainScene = mainScene;
        this.mainScene.events.on('onNameRecived', this._nameRecived, this);
    }

    getName () {
        //TODO: return name;
       return "";
    }

    setRandomName() {
        this.mainScene.backend.reciveName();
    }

    _nameRecived(name) {
        //TODO: set text to name
    }
}