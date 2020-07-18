class Bullets extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.scene.physics.add.collider(this, walls, this.des);
        oneShoot = 0;
        score -= 5;
        scoreScene.makeScore.text = 'SCORE ' + scoreScene.zeros(score, 6);
        this.shootTimer();
        this.moving();
        this.desTimer();
        //this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.moving, this);
        
    }
    
    //shooting
    moving() {
        if(side == 1) {
            this.setFlipX(false);
            this.body.setVelocityX(600);
        } else if(side == -1) {
            this.setFlipX(true);
            this.body.setVelocityX(-600);
        }
        
    }
    //this timer to destroy the bullet
    desTimer() {
        this.scene.time.addEvent({
            delay: 700,
            callback: this.desB,
            callbackScope: this,
            loop: false
        });
    }
    //destroy the bullet when collide
    des(bullets) {
        bullets.destroy();
    }
    //destroy the bullet after the timer
    desB() {
        this.destroy();
    }
    //shoot timer (next bullet)
    shootTimer() {
        this.scene.time.addEvent({
            delay: 400,
            callback: this.reShoot,
            callbackScope: this,
            loop: false
        });
    }
    reShoot() {
        oneShoot = 1
    }
}