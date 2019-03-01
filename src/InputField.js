export default class InputField {
    constructor (mainScene) {
        this.mainScene = mainScene;
        
        this.inputField = document.getElementById("textinput");
        this.gameCanvas = document.getElementById("hse2048_canvas");

        // this.inputField.style.width = "300px";
        // this.inputField.style.height = "50px";



        this.inputField.onclick = () => {
            this._inputOnClick(this.mainScene);
        };
        this.gameCanvas.onclick = () => {
            this._canvasOnClick(this.inputField, this.mainScene);
        };

        
        // this.inputField.style.top = "1820px";
        // this.inputField.style.left = "725px";
        // this.inputField.style.border = "0px";
        // this.inputField.style.fontSize = "40px";
        // this.inputField.style.background = "#86bcc5";


    }

    getText () {
       return this.inputField.value;
    }

    setText(text) {
        this.inputField.value = text;
    }

    _inputOnClick(scene){
        scene.fieldManager.pause();
    }

    _canvasOnClick(field, scene){
        scene.fieldManager.resume();
        field.blur();
    }
}