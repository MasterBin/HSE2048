import MainScene from './scenes/MainScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import RatingTableScene from './scenes/RatingTableScene.js';
import LoseScene from './scenes/LoseScene.js';
import WinScene from './scenes/WinScene.js';

const config = {
    width: 1000,
    height: 1520,
    type: Phaser.AUTO,
    backgroundColor: 0x86bcc5,
    physics: Phaser.ARCADE,
    scene: [ PreloadScene, MainScene, RatingTableScene, LoseScene, WinScene ]
};

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

var game;

window.onload = function () {
    game = new Phaser.Game(config);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
};

