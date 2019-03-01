export default class InputField {
    constructor (mainScene) {
        this.mainScene = mainScene;
        
        this.inputField = document.getElementById("textinput");
        var wid = 380 + "px";
        this.inputField.style.width = wid;
        this.inputField.style.height = "50px";

        
        //this.inputField.style.top = "1820px";
        //this.inputField.style.left = "725px";
        //this.inputField.style.border = "0px";
        // this.inputField.style.fontSize = "40px";
        // this.inputField.style.background = "#86bcc5";


        //this.inputField.style.zIndex = 20;
        this.inputField.onclick = this._clicked;
    }

    getText () {
       return this.inputField.value;
    }

    setText(text) {
        this.inputField.value = text;
    }

    _clicked () {
        
    }

}