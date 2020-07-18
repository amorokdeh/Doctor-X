var speed = 200;
var jump = 350;
//player side (right = 1, left = -1)
var side = 1;
//just one bullet
var oneShoot = 1;
var face = 1;
var jumpSound;
var fireSound;

class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        
        this.scene.add.existing(this);
        //player animation
        this.scene.anims.create({
            key: 'player_anim',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'playerJ_anim',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 8, end: 9 }),
            frameRate: 7,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'playerS_anim',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 10, end: 11 }),
            frameRate: 5,
            repeat: -1
        });
        //jump sound
        jumpSound = this.scene.sound.add('jump', {
            loop: false
        });
        fireSound = this.scene.sound.add('fire', {
            loop: false
        });
        this.scene.physics.world.enable(this);
        //collider player, bullets with walls
        this.scene.physics.add.collider(this, walls);
        
        //player side
        side = 1;
        
        //gravity
        this.body.setGravityY(600);
        this.angle = this.body.angle;
        //colliddr effect reflection (go back)
        this.body.setBounceX(0.1);;
        
        //control
        const { LEFT, RIGHT, UP, DOWN, SPACE, SHIFT } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({ left: LEFT,
                                                        right: RIGHT,
                                                        up: UP,
                                                        down: DOWN,
                                                        space: SPACE,
                                                        shift: SHIFT
                                                      });
        
    }
    
    preUpdate (time, delta) {
        super.preUpdate(time, delta);
        
        //fix bugs when move 
        this.body.setVelocityX(0);
        if(!(this.body.onFloor())) {
                this.play('playerJ_anim', true);
            }
        //move right
        if(this.keys.right.isDown && this.x < mapEnd - 20) {
            this.body.setVelocityX(speed);
            if(this.body.onFloor()) {
                this.play('player_anim', true);
            }
            side = 1;
        } 
        //move left
        else if(this.keys.left.isDown && this.x > mapBegin) {
            this.body.setVelocityX(-speed);
            if(this.body.onFloor()) {
                this.play('player_anim', true);
            }
            side = -1;
        }
        else if(!(this.body.onFloor())) {
            this.play('playerJ_anim', true);
        } else {
            this.play('playerS_anim', true);
        }
        //jump
        if(this.keys.up.isDown && this.body.onFloor()) {
            this.play('playerJ_anim', true);
            this.body.setVelocityY(-jump);
            jumpSound.play();
        }
        //fire
        if(Phaser.Input.Keyboard.JustDown(this.keys.space) && oneShoot == 1 && score > 0) {
            bullets = new Bullets({scene: level,
                                       x: player.x,
                                       y: player.y,
                                       key: 'fire'
                                      }).setScale(1);
            fireSound.play();
        }
        
        //speed
        if(this.keys.shift.isDown) {
            speed = 320;
        } 
        else {
            speed = 200;
        }
        
        //flip
        this.flipObject();
    }
    
    //flip when collide 
    flipObject() {
        
        //flip player image
        if(this.body.velocity.x > 0) {
            this.setFlipX(false);
            side = 1;
        }
        if(this.body.velocity.x < 0) {
            this.setFlipX(true);
            side = -1;
        }
    }
    
}