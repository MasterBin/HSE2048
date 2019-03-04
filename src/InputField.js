export default class InputField {
    constructor (mainScene) {
        this.mainScene = mainScene;
        
        this.inputField = document.getElementById("textinput");
        this.gameCanvas = document.getElementById("hse2048_canvas");

        this.inputField.onclick = () => {
            this._inputOnClick(this.mainScene);
        };
        this.gameCanvas.onclick = () => {
            this._canvasOnClick(this.inputField, this.mainScene);
        };
    }

    getText () {
       return this.inputField.value;
    }

    setText(text) {
        this.inputField.value = text;
        this.mainScene.storage.putToStorage(text, 'name');
    }

    _inputOnClick(scene){
        scene.fieldManager.pause();
    }

    _canvasOnClick(field, scene){
        scene.fieldManager.resume();
        field.blur();
        // сохраняем ник в кеш браузера
        this.mainScene.storage.putToStorage(this.inputField.value, 'name');
    }
}