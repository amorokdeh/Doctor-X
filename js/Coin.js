var coinSound;

class Coins extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        //animation
        this.scene.anims.create({
            key: 'coin_anim',
            frames: this.scene.anims.generateFrameNumbers('coin'),
            frameRate: 20,
            repeat: -1
        });
        
        //sound
        coinSound = this.scene.sound.add('coin', {
            loop: false
        });
        this.play('coin_anim');
        this.scene.physics.add.collider(this, player, this.desC);
    }
    
    desC(coins) {
        coins.destroy();
        score += 35;
        scoreScene.makeScore.text = 'SCORE ' + scoreScene.zeros(score, 6);
        coinSound.play();
    }
}