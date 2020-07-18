var loseSound;

class Monsters extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        
        this.scene.add.existing(this);
        //animation
        this.scene.anims.create({
            key: 'monster_anim',
            frames: this.scene.anims.generateFrameNumbers('monster', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.play('monster_anim');
        loseSound = this.scene.sound.add('lose', {
            loop: false
        });
        this.scene.physics.world.enable(this);
        //collide monsters with walls
        this.scene.physics.add.collider(this, walls);
        this.moving();
        //this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.moving, this);
    }
    
    preUpdate (time, delta) {
        super.preUpdate(time, delta);
        this.scene.physics.add.overlap(this, bullets, this.desM);
        this.scene.physics.add.overlap(this, player, this.rePlayer);
        this.flipMonster();
    }
    
    moving() {
        this.body.velocity.x = 70;
        this.body.setBounceX(1);
        //gravity
        this.body.setGravityY(600);
    }
    
    flipMonster(){
        //flip Monster image
        if(this.body.velocity.x > 0) {
            this.setFlipX(true);
        }
        if(this.body.velocity.x < 0) {
            this.setFlipX(false);
        }
        
    }
    
    desM(monsters) {
        level.monsterDown = level.add.sprite(monsters.x, monsters.y, 'monster').setScale(0.7);
        level.physics.world.enable(level.monsterDown);
        level.monsterDown.setFlipY(true);
        level.monsterDown.alpha = 0.5;
        monsters.destroy();
        level.time.addEvent({
            delay: 1000,
            callback: function() {
                level.monsterDown.destroy();
            },
            callbackScope: this,
            loop: false
        });
        
        bullets.destroy();
        score += 10;
        scoreScene.makeScore.text = 'SCORE ' + scoreScene.zeros(score, 6);
    }
    rePlayer() {
        loseSound.play();
        level.playerDown = level.add.sprite(player.x, player.y, 'player').setScale(1);
        level.physics.world.enable(level.playerDown);
        level.playerDown.alpha = 0.8;
        level.playerDown.body.setGravityY(600);
        level.playerDown.body.setVelocityY(-500);
        level.playerDown.setFlipY(true);
        player.destroy();
        level.time.addEvent({
            delay: 2500,
            callback: function() {
                level.playerDown.destroy();
                if(score >= 10) {
                    score -= 10;
                } else {
                    score = 0;
                }
                level.scene.restart();
            },
            callbackScope: this,
            loop: false
        });
    }
    
}
