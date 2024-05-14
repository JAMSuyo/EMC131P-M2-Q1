export default class GameScene extends Phaser.Scene {
    
    constructor() {
        super('GameScene');
    }

    init() {

        //variables
        this.score = 0;
        this.starsCollected = 0;
        this.platforms;
        this.player;
        this.stars;
        this.scoreText;
        this.bombs;
        this.starsCollectedText;
        this.colors = [ '0xFFFFFF', '0xff0000', '0xffa500', '0xffff00', '0x00ff00', '0x0000ff', '0x4b0082', '0x9400d3' ];
        this.currentColor = 0;
        this.cursors;
        
    }


    preload() {
        this.load.image( 'layer1', '../assets/background/layer1.png' );
        this.load.image( 'layer2', '../assets/background/layer2.png' );
        this.load.image( 'layer3', '../assets/background/layer3.png' );
        this.load.image( 'layer4', '../assets/background/layer4.png' );
        this.load.image( 'layer5', '../assets/background/layer5.png' );
        this.load.image( 'layer6', '../assets/background/layer6.png' );
        this.load.image( 'ground', '../assets/background/ground.png' );
        this.load.image( 'ground2', '../assets/background/ground2.png' );
        this.load.image( 'star', '../assets/objects/coin.png' );
        this.load.image( 'bomb', '../assets/objects/trap.png' );
        this.load.spritesheet( 'dude', '../assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 } );
        this.load.spritesheet( 'wizard', '../assets/sprites/wizard.png', { frameWidth: 32, frameHeight: 48 } );
    }

    create() {
        this.add.image( 0, 0, 'layer1' ).setOrigin( 0, 0 ).setScale( 0.5 );
        this.add.image( 0, 0, 'layer2' ).setOrigin( 0, 0 ).setScale( 0.5 );
        this.add.image( 0, 0, 'layer3' ).setOrigin( 0, 0 ).setScale( 0.5 );
        this.add.image( 0, 0, 'layer4' ).setOrigin( 0, 0 ).setScale( 0.5 );
        this.add.image( 0, 0, 'layer5' ).setOrigin( 0, 0 ).setScale( 0.5 );
        this.add.image( 0, 0, 'layer6' ).setOrigin( 0, 0 ).setScale( 0.5 );


        this.platforms = this.physics.add.staticGroup();

        this.platforms.create( 450, 490, 'ground2' ).setScale( 0.5 ).refreshBody();

        this.platforms.create( 100, 280, 'ground' );
        this.platforms.create( 620, 350, 'ground' );
        this.platforms.create( 800, 220, 'ground' );


        this.player = this.physics.add.sprite( 100, 350, 'dude' );

        this.player.setBounce( 0.2 );
        this.player.setCollideWorldBounds( true );

        this.anims.create( {
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider( this.player, this.platforms );


        this.cursors = this.input.keyboard.createCursorKeys();


        this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 50, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.physics.add.collider(this.stars, this.platforms);

        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);


        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.starsCollectedText = this.add.text( 530, 16, 'Stars collected: 0', { fontSize: '32px', fill: '#000' });


        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

        function collectStar (player, star)
        {
            star.disableBody(true, true);
    
            this.score += 10;
            this.scoreText.setText( 'Score: ' + this.score );
    
            this.starsCollected += 1;
            this.starsCollectedText.setText( 'Stars collected: ' + this.starsCollected );
    
            if (this.starsCollected % 5 == 0) {
                this.player.setScale(this.player.scaleX + 0.1, this.player.scaleY + 0.1);
            }
    
            if ( this.currentColor < this.colors.length - 1 ) {
                this.currentColor++;
            } else {
                this.currentColor = 0;
            }
    
            this.player.setTint( this.colors[ this.currentColor ] );
    
            if (this.stars.countActive(true) === 0)
                {
                    this.stars.children.iterate(function (child) {
            
                        child.enableBody(true, child.x, 0, true, true);
            
                    });
            
                    // let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            
                    // let bomb = this.bombs.create(x, 16, 'bomb');
                    // bomb.setBounce(1);
                    // bomb.setCollideWorldBounds(true);
                    // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            
                }
    
            let x = Phaser.Math.Between( 0, 800 );
            let y = Phaser.Math.Between( 0, 100 );
            let newStar = this.stars.create( x, y, 'star' );
            newStar.setBounceY(Phaser.Math.FloatBetween( 0.4, 0.8 ));
    
            if ( this.starsCollected % 10 === 0 && this.starsCollected !== 0 ) {
                //spawnBomb();
                let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            
                let bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                
            }
        }
    
        function hitBomb (player, bomb)
        {
            this.physics.pause();
    
            player.setTint(0xff0000);
    
            player.anims.play('turn');
    
            alert( "Game over! A trap has caught you!" );
            player.disableBody( true, true );
    
    
            this.scene.start( 'EndScene' );
        }
    
        // function spawnBomb() {
        //     let x = Phaser.Math.Between( 0, 800 );
        //     this.bomb = this.bombs.create( x, 16, 'bomb' );
        //     this.bomb.setBounce( 1 );
        //     this.bomb.setCollideWorldBounds( true );
        //     this.bomb.setVelocity( Phaser.Math.Between( -200, 200 ), 20 );
        //     console.log('spawnbomb');
        // }

    }





update() {
    if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
        
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
        
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
        
            this.player.anims.play('turn');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
}
}