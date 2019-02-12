import MainScene from './main_scene.js';

const config = {
    width: 480,
    height: 640,
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    physics: Phaser.ARCADE,
    scene: MainScene 
};

window.onload = function () {
    var game = new Phaser.Game(config);
};