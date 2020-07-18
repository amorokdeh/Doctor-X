class Level4 extends Phaser.Scene {
    constructor() {
        super('Level4');
    }
    
    create() {
        console.log('Level4');
        //sounds
        music.stop();
        winSound = this.sound.add('winner', {
            loop: false
        });
        
        level = this;
        //background color
        this.BG = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0, 0);
        this.BG.alpha = 0.8;
        this.BG.setScrollFactor(0);
        
        //add the map
        map = this.make.tilemap({ key: 'map4' });
        tileset = map.addTilesetImage('tiled', 'tileset');
        this.layer = map.createStaticLayer('ground', tileset, 0, 200);
        
        //walls (with ground and more objecs)
        walls = this.layer.setCollisionByExclusion(-1, true);
        
        //map size
        mapBegin = 25;
        mapEnd = 6400; //4800
        
        //score
        let scores = new Scores({scene: this,
                                 x: 20,
                                 y: 220
                                });
        //door (end the level)
        this.door = this.physics.add.sprite(mapEnd - 300, 200, 'door').setScale(2);
        //fix position
        this.door.setGravityY(100);
        this.physics.add.collider(this.door, walls);
        //animation
        this.anims.create({
            key: 'door_anim',
            frames: this.anims.generateFrameNumbers('door'),
            frameRate: 10,
            repeat: 0
        });
        //add player from class
        this.player = new Player({scene: this,
                                 x: 200,
                                 y: 550,
                                 key: 'player'
                                }).setScale(1);
        //make player global (for another classes)
        player = this.player;
        //reshoot
        oneShoot = 1;
        
        //add monsters group
        var monster = this.physics.add.group();
        //load monsters from JSON map
        monster.addMultiple(map.createFromObjects('enemy', 'enemy', {key: 'enemy'}));
        //make monsters from Monsters class (in the same position on the map)
        monster.getChildren().forEach(function(enemy) {
            monsters = new Monsters({scene: this,
                                         x: enemy.x,
                                         y: enemy.y + 100,
                                         key: 'monster'
                                        }).setScale(0.7);
            enemy.setVisible(false);
        }, this);
        
        //add coins
        var coin = this.physics.add.group();
        //load coin from JSON map
        coin.addMultiple(map.createFromObjects('coin', 'coin', {key: 'coin'}));
        //make coin from Coin class (in the same position on the map)
        coin.getChildren().forEach(function(coin) {
            coins = new Coins({scene: this,
                                         x: coin.x - 15,
                                         y: coin.y + 220,
                                         key: 'coin'
                                        }).setScale(0.7);
            coin.setVisible(false);
        }, this);
        
        //collide with player
        this.physics.add.overlap(this.door, player, this.playerWin);
        
        //camera
        this.camera = this.cameras.main.setBounds(0, 0, mapEnd, 808);
        this.camera.startFollow(this.player);
        
    }
    update() {
        this.BG.tilePositionX = this.camera.scrollX * 0.2;
    }
    
    //player win
    playerWin() {
        player.destroy();
        winSound.play();
        level.door.play('door_anim', true);
        level1Sound.pause();
        level.playerWin = level.add.sprite(player.x, player.y, 'player').setScale(1);
        level.physics.world.enable(level.playerWin);
        level.playerWin.alpha = 0.8;
        level.time.addEvent({
            delay: 2500,
            callback: function() {
                level.playerWin.destroy();
                level1Sound.resume();
                level.scene.start('Level5');
            }
        })
    }
}