export default class MainMenuScene extends Phaser.Scene {
    
    constructor() {
        super('MainMenuScene');
    }

    preload() {
        this.load.image( 'menubg', '../assets/background/menubg.png' );
        this.load.image( 'starticon', '../assets/menu/start.png' );
        this.load.image( 'creditsicon', '../assets/menu/credits.png' );
        this.load.image( 'exiticon', '../assets/menu/exit.png' );
    }

    create() {
        this.add.image( 0, 0, 'menubg' ).setOrigin( 0, 0 );

        let start = this.add.image( 300, 450, 'starticon' );
        start.setInteractive({ useHandCursor: true });
        start.on( 'pointerdown', () => this.startButton() );

        let credits = this.add.image( 450, 450, 'creditsicon' );
        credits.setInteractive({ useHandCursor: true });
        credits.on( 'pointerdown', () => this.creditsButton() );

        let exit = this.add.image( 600, 450, 'exiticon' );
        exit.setInteractive({ useHandCursor: true });
        exit.on( 'pointerdown', () => this.exitButton() );

    }

    startButton() {
        this.scene.start( 'GameScene' );
    }

    creditsButton() {
        this.scene.start( 'CreditsScene' );
    }

    exitButton() {
        alert( 'You have exited the game. Thank you for playing!' );
    }
}