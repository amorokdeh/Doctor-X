var music;
var tileset;
var mapBegin;
var mapEnd;
var map;
var walls;
var player;
var monsters;
var bullets;
var level;
var coins;
var winSound;

class Main_menu extends Phaser.Scene {
    constructor() {
        super('Main_menu');
    }
        
    create() {
        //music
        music = this.sound.add('main', {
            loop: true
        });
        music.play();
        
        //background color
        this.mBG = this.add.tileSprite(0, 0, config.width, config.height, 'mbg').setOrigin(0, 0);
        
        //add Start button
        this.start_button = this.add.image(config.width /2, config.height *0.50, 'button').setDepth(4);
        this.startText = this.add.text(config.width /2 - 30, config.height *0.50 - 12, 'Start', {
            font: '22px monospace',
            fill: '#FFF300'
        }).setDepth(4);
        
        //add About button
        this.about_button = this.add.image(config.width /2, config.height *0.64, 'button').setDepth(1);
        this.add.text(config.width /2 - 30, config.height *0.64 - 12, 'About', {
            font: '22px monospace',
            fill: '#FFF300'
        }).setDepth(1);
        
        //add Cursor
        this.select_cursor = this.add.image(this.start_button.x, this.start_button.y, 'select').setDepth(4);
        //make it invisible
        this.select_cursor.setVisible(true);
        //if cursor can move
        this.moveable = true;
        //if cursor ready to click
        this.cursorkReady = false;
        this.blink();
        this.i = 1;
        //button situation
        this.button_situation = 1;
        //interactive (over start button)
        this.start_button.setInteractive();
        
        //over Start button
        this.start_button.on('pointerover', ()=>{
            if(this.i == true){
                this.select_cursor.x = this.start_button.x;
                this.select_cursor.y = this.start_button.y;
                this.blink();
                this.sound.play('butt_move');
                this.button_situation = 1;
                this.cursorkReady = true;
            }
        });
        //out Start
        this.start_button.on('pointerout', ()=>{
                this.stopBlink();
                this.button_situation = 0;
                this.cursorkReady = false;
        });
        
        //interactive (over About button)
        this.about_button.setInteractive();
        //over About
        this.about_button.on('pointerover', ()=>{
            if(this.moveable == true){
                this.blink();
                this.select_cursor.x = this.about_button.x;
                this.select_cursor.y = this.about_button.y;
                this.sound.play('butt_move');
                this.button_situation = 2;
                this.cursorkReady = true;
            }
        });
        
        //out About
        this.about_button.on('pointerout', ()=>{
            if(this.moveable == true) {
                this.stopBlink();
                this.button_situation = 0;
                this.cursorkReady = false;
            }
        });
        
        //add the keys
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.Enter_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        //when press UP
        this.up_key.on('down', ()=> {
            if(this.moveable == true){
                this.blink();
                this.select_cursor.x = this.start_button.x;
                this.select_cursor.y = this.start_button.y;
                this.sound.play('butt_move');
                this.button_situation = 1;
            }
        });
        
        //when press Down
        this.down_key.on('down', ()=> {
            if(this.moveable == true){
                this.blink();
                this.select_cursor.x = this.about_button.x;
                this.select_cursor.y = this.about_button.y;
                this.sound.play('butt_move');
                this.button_situation = 2;
            }
        });
    }
    
    update() {
        
        //background
        this.mBG.tilePositionY += 0.5;
        this.mBG.tilePositionX -= 0.5;
        //press Enter on a button
        if(Phaser.Input.Keyboard.JustDown(this.Enter_key)) {
            switch(this.button_situation) {
                case 1:
                    if(this.i == 1) {
                        this.i = 0;
                        console.log('Start');
                        this.startEvent();
                    }
                    break;
                case 2:
                    this.button_situation = 3;
                    this.moveable = false;
                    console.log('About');
                    this.aboutBox();
                    this.aboutText();
                    this.start_button.y =460;
                    this.startText.y = this.start_button.y - 12;
                    this.select_cursor.y = this.start_button.y;
                    break;
                case 3:
                    if(this.i == 1) {
                        this.i = 0;
                        console.log('Start Game');
                        this.startEvent();
                    }
                    break;
            }
        };
        //click on a button
        if(this.game.input.mousePointer.isDown && this.cursorkReady == true && this.i == 1 && !(this.button_situation == 3)) {
            switch(this.select_cursor.y) {
                //click on start
                case this.start_button.y:
                    console.log('Start');
                    this.i = 0;
                    this.startEvent();
                    break;
                //click on about
                case this.about_button.y:
                    console.log('About');
                    this.button_situation = 3;
                    this.moveable = false;
                    this.aboutBox();
                    this.aboutText();
                    this.start_button.y =460;
                    this.startText.y = this.start_button.y - 12;
                    this.select_cursor.y = this.start_button.y;
                    break;
            }

        }
        
    }
    //after the break
    timeEvent() {
        music.resume('main');
        this.scene.start('Story');
    }
    //when pressed or clicked on Start button (making a break)
    startEvent() {
        this.moveable = false;
        this.startblink = 3;
        this.select_cursor.destroy();
        music.pause('main');
        this.sound.play('start');
        this.time.addEvent({
            delay: 3000,
            callback: this.timeEvent,
            callbackScope: this,
            loop: false
        });
    }
    //About Box Graphics
    aboutBox() {
        var aboutBox = this.add.graphics().setDepth(3);
        aboutBox.fillStyle(0x000000, 1);
        aboutBox.fillRoundedRect(240, 150, 320, 350);
        var border = this.add.graphics().setDepth(3);
        border.lineStyle(4, 0xFF2BCE, 4);
        border.strokeRoundedRect(240, 150, 320, 350);
        //text
        this.add.text(250, 260, 'move: Up, Down, Left, Right', {
            font: '20px monospace',
            fill: '#FF2BCE'
        }).setDepth(4);
        //text
        this.add.text(250, 300, 'run: Shift', {
            font: '20px monospace',
            fill: '#FF2BCE'
        }).setDepth(4);
        //text
        this.add.text(250, 340, 'shoot: Space', {
            font: '20px monospace',
            fill: '#FF2BCE'
        }).setDepth(4);
    }
    //About Text animation
    aboutText() {
        this.myText = "this is game's control".split('');
        this.counter = -1;
        this.time.addEvent({
                delay: 40,
                callback: this.nextWord,
                callbackScope: this,
                loop: true
            });
    }
    //About Text (go to the next word)
    nextWord() {
        this.counter++;
        this.myTextX = 250 + this.counter *8.5;
        this.myTextY = 160;
        this.myTextW = this.myText[this.counter]
        this.add.text(this.myTextX, this.myTextY, this.myTextW, {
            font: '20px monospace',
            fill: '#FF2BCE'
        }).setDepth(4);
    }
    //blink cursor
    blink() {
        //fix and rest blink
        if(this.startblink == 0 || this.startblink == 1) {
            this.stopBlink();
        }
        this.select_cursor.setVisible(true);
        this.startblink = 1;
        //timer
        this.tt = this.time.addEvent({
            delay: 300,
            callback: this.checkBlink,
            callbackScope: this,
            loop: true
        });
    }
    checkBlink() {
        if(this.startblink == 0) {
            this.select_cursor.setVisible(true);
            this.startblink = 1;
        } else if(this.startblink == 1) {
            this.select_cursor.setVisible(false);
            this.startblink = 0;
        } else if(this.startblink == 3) {
            this.select_cursor.setVisible(false);
        }
    }
    stopBlink() {
        this.select_cursor.setVisible(false);
        this.startblink = 3;
        this.tt.destroy();
    }
    
}