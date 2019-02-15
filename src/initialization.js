import MainScene from './main_scene.js';

const config = {
    width: 500,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    physics: Phaser.ARCADE,
    scene:  MainScene 
};

function resize() {
    //TODO:
}

window.onload = function () {
    var game = new Phaser.Game(config);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
};

