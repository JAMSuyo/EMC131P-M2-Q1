export default class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('logo', '');
    }

    create() {
        this.scene.start("PreloadScene")
    }

}