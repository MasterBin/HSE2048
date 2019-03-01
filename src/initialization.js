import MainScene from './scenes/MainScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import RatingTableScene from './scenes/RatingTableScene.js';
import LoseScene from './scenes/LoseScene.js';
import WinScene from './scenes/WinScene.js';

const config = {
    width: 1000,
    height: 1520,
    type: Phaser.CANVAS,
    backgroundColor: 0x86bcc5,
    physics: Phaser.ARCADE,
    canvas: document.getElementById('hse2048_canvas'),
    scene: [ PreloadScene, MainScene, RatingTableScene, LoseScene, WinScene ]
};

function resize() {
    let canvas = document.getElementById('hse2048_canvas');
    let input = document.getElementById("textinput");
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
    input.style.top = (canvas.clientHeight * 0.941) + "px";
    input.style.left = (canvas.clientWidth * 0.575) + "px";
    input.style.height = (canvas.clientHeight * 0.031) + "px";
    input.style.width = (canvas.clientWidth * 0.30) + "px";
    input.style.fontSize = (canvas.clientHeight * 0.031) + "px";
}

var game;

window.onload = function () {
    game = new Phaser.Game(config);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
};

