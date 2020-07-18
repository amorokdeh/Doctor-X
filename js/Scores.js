var score = 25;
var scoreBG;
var scoreScene;

class Scores extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        //score
        scoreBG = this.scene.add.graphics();
        scoreBG.fillStyle(0x000000, 1);
        scoreBG.beginPath();
        scoreBG.moveTo(10, 214);
        scoreBG.lineTo(170, 214);
        scoreBG.lineTo(170, 243);
        scoreBG.lineTo(10, 243);
        scoreBG.closePath();
        scoreBG.fillPath();
        this.makeScore = this.scene.add.bitmapText(20, 220, 'pixelFont', 'SCORE ' + this.zeros(score, 6), 30);
        //score move with camera
        this.makeScore.setScrollFactor(0, 0);
        scoreBG.setScrollFactor(0, 0);
        scoreScene = this;
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.TColor, this);
    }
    
    //to make score 6 zeros
    zeros(number, size) {
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)) {
            stringNumber = '0' + stringNumber;
        }
        return stringNumber;
    }
    //change color
    TColor() {
        if(score <= 10) {
            this.makeScore.tint = 0xB22222;
        } else if(score <= 100) {
            this.makeScore.tint = 0xE88B0C;
        } else if(score <= 200) {
            this.makeScore.tint = 0xFFFFFF;
        } else {
            this.makeScore.tint = 0x3CE001;
        }
        
    }
    
}