var level1Sound;

class Story extends Phaser.Scene {
    constructor() {
        super('Story');
    }
    
    create() {
        
        //sounds
        level1Sound = this.sound.add('level1', {
            loop: true
        });
        
        //text
        this.add.text(config.width/2.9 , config.height - 120, 'press Enter to start', {
            font: '20px monospace',
            fill: '#FFFFFF'
        });
        //control
        this.control =  {
            enter: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
        }
        //text
        this.storyText()
    }
    
    update() {
        //skip story
        if(Phaser.Input.Keyboard.JustDown(this.control.enter)) {
            level1Sound.play();
            this.scene.start('Level1');
        }
        
    }
    
    //Story Text animation
    storyText() {
        this.myText = "The village was attacked by evil viruses, so Doctor X decided to  invent the drug and eliminate viruses all over the village.".split('');
        this.counter = -1;
        this.myTextX = 50;
        this.myTextY = 160;
        this.line = 1;
        this.time.addEvent({
                delay: 40,
                callback: this.nextWord,
                callbackScope: this,
                loop: true
            });
    }
    //Story Text (go to the next word)
    nextWord() {
        this.counter++;
        this.myTextX += 10
        if(250+ this.counter *8.5 >= (config.width) * this.line) {
            this.line += 1;
            this.myTextX = 50;
            this.myTextY += 50;
        }
        this.myTextW = this.myText[this.counter]
        this.add.text(this.myTextX, this.myTextY, this.myTextW, {
            font: '20px monospace',
            fill: '#FFFFFF'
        });
    }
}