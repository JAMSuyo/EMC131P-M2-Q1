export default class EndScene extends Phaser.Scene {

    constructor() {
        super('EndScene');
    }

    preload(){
        this.load.image( 'gameoverbg', '../assets/background/gameoverbg.png' );
        this.load.image( 'menuicon', '../assets/menu/menu.png' );
        this.load.image( 'retryicon', '../assets/menu/retry.png' );
    }

    create() {

        this.add.image( 0, 0, 'gameoverbg' ).setOrigin( 0, 0 );

        let menuIcon = this.add.image( 300, 450, 'menuicon' );
        menuIcon.setInteractive({ useHandCursor: true });
        menuIcon.on( 'pointerdown', () => this.menuButton());

        let retryIcon = this.add.image( 550, 450, 'retryicon' );
        retryIcon.setInteractive({ useHandCursor: true });
        retryIcon.on( 'pointerdown', () => this.gameButton());

    }

    menuButton() {
        this.scene.start( 'MainMenuScene' );
    }

    gameButton() {
        this.scene.start( 'GameScene' );
    }

}