//in this class we make loading scene and preload all game files
class Loading extends Phaser.Scene {
    constructor() {
        super('bootGame');
    }
    
    preload() {
        //create loading box Graphics
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x711087, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        //text(loading) with position
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#FF2BCE'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        //text(percent) with position
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#FFF300'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        //update the progress
        this.load.on('progress', function (value) {
        console.log(value);
        progressBar.clear();
        progressBar.fillStyle(0xFF00FF, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
        percentText.setText(parseInt(value * 100) + '%');
        });
        
        //read the progress
        this.load.on('progress', function (value) {
        console.log(value);
        });
        
        //when the progress ist complete
        this.load.on('complete', function () {
        console.log('complete');
            
        //Destroy and delete Loading objects
        progressBar.destroy();
        progressBox.destroy();  	
        loadingText.destroy();
        percentText.destroy();
        });
        
        
        
        //here preload all game files
        //images
        this.load.image('logo', 'logo.png');
        this.load.image('mbg', './assets/images/mainBG.png');
        this.load.image('bg', './assets/images/background.png');
        this.load.image('button', './assets/images/button.png');
        this.load.image('select', './assets/images/select.png');
        this.load.spritesheet('player', './assets/images/player.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('monster', './assets/images/monster.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image('fire', './assets/images/fire.png');
        
        this.load.spritesheet('coin', './assets/images/coin.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        
        this.load.spritesheet('door', './assets/images/door.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        
        
        //sounds
        this.load.audio('butt_move', './assets/sounds/butt_move.wav');
        this.load.audio('butt_click', './assets/sounds/butt_click.wav');
        this.load.audio('start', './assets/sounds/start.mp3');
        this.load.audio('main', './assets/sounds/main.ogg');
        this.load.audio('jump', './assets/sounds/jump.wav');
        this.load.audio('fire', './assets/sounds/fire.wav');
        this.load.audio('coin', './assets/sounds/coin.wav');
        this.load.audio('lose', './assets/sounds/lose.mp3');
        this.load.audio('winner', './assets/sounds/winner.wav');
        this.load.audio('level1', './assets/sounds/level1.wav');
        
        //font
        this.load.bitmapFont('pixelFont', './assets/font/pixelfont.png', './assets/font/pixelfont.xml');
        
        //maps
        this.load.image('tileset', './assets/maps/tilesets.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.tilemapTiledJSON('map1', './assets/maps/level1.json');
        this.load.tilemapTiledJSON('map2', './assets/maps/level2.json');
        this.load.tilemapTiledJSON('map3', './assets/maps/level3.json');
        this.load.tilemapTiledJSON('map4', './assets/maps/level4.json');
        this.load.tilemapTiledJSON('map5', './assets/maps/level5.json');
        
        for(var i = 0; i < 100; i++) {
            this.load.image('logo'+i, 'logo.png');
        }
    }
    
    create() {
        //to see Logo and press Enter
        this.add.image(config.width /2, config.height /2, 'logo').setScale(1);
        //to see text
        this.loadingText = this.add.bitmapText(config.width/3.2 , config.height - 120, 'pixelFont', 'press Enter or click to start').setScale(2);
        //counter (check visible or invisible)
        this.i = 1;
        //fix bugs (one click)
        this.j = 1;
        //click to start
        this.input.on('pointerdown', ()=> {
            if(this.j == 1){
                this.j = 0;
                this.tt.destroy();
                this.textEdit2();
                this.mainMenuTimer();
            }
        });
        //add Keys
        this.Enter_key = this.input.keyboard.addKey('ENTER');
        //press Enter to start
        this.Enter_key.on('down', ()=> {
            if(this.j == 1){
                this.j = 0;
                this.tt.destroy();
                this.textEdit2();
                this.mainMenuTimer();
            }
        });
        //make the text visible and invisible
        this.textEdit();
    }
    
    //text edit
    textEdit() {
        //timer
        this.tt =this.time.addEvent({
            delay: 700,
            callback: this.textCheck,
            callbackScope: this,
            loop: true
        });
    }
    //text edit 2 (faster)
    textEdit2() {
        this.sound.play('butt_click');
        //timer
        this.time.addEvent({
            delay: 90,
            callback: this.textCheck,
            callbackScope: this,
            loop: true
        });
    }
    
    //check text sitaution
    textCheck() {
        if(this.i == 0) {
            this.loadingText.setVisible(true);
            this.i = 1;
        } else if(this.i == 1) {
            this.loadingText.setVisible(false);
            this.i = 0;
        }
    }
    //main menu timer
    mainMenuTimer() {
        //timer
        this.time.addEvent({
            delay: 1000,
            callback: this.mainMenu,
            callbackScope: this,
            loop: false
        });
    }
    //go to main menu
    mainMenu() {
        this.scene.start('Main_menu');
    }
}