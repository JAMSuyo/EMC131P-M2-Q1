import CreditsScene from "./scenes/CreditsScene.js";
import EndScene from "./scenes/EndScene.js";
import GameScene from "./scenes/GameScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";


let endScene = new EndScene();
let gameScene = new GameScene();
let mainMenuScene = new MainMenuScene();
let creditsScene = new CreditsScene();


let config = {
    type: Phaser.AUTO,
    width: 900,
    height: 550,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    }
    // scene: {
    //     preload: preload,
    //     create: create,
    //     update: update
    // }
};

let game = new Phaser.Game( config );

//scene loading
game.scene.add( 'MainMenuScene', mainMenuScene );
game.scene.add( 'EndScene', endScene );
game.scene.add( 'GameScene', gameScene );
game.scene.add( 'CreditsScene', creditsScene );


game.scene.start("MainMenuScene");



