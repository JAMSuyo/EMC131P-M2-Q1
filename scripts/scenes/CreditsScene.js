export default class CreditsScene extends Phaser.Scene {

    constructor() {
        super('CreditsScene')
    }

    preload() {
        this.load.image( 'creditsbg', '../assets/background/creditsbg.png' );
        this.load.image( 'menuicon', '../assets/menu/menu.png' );
    }

    create() {
        
        this.add.image( 0, 0, 'creditsbg' ).setOrigin( 0, 0 );

        let menuIcon = this.add.image( 450, 450, 'menuicon' );
        menuIcon.setInteractive({ useHandCursor: true });
        menuIcon.on( 'pointerdown', () => this.menuButton());
    }

    menuButton() {
        this.scene.start( 'MainMenuScene' );
    }
}