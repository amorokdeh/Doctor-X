var config = {
    pixelArt: true,
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Loading, Main_menu, Story, Level1, Level2, Level3, Level4, Level5],
    physics:{
        default: 'arcade',
        arcade:{
            //gravity: {y: 300},
            debug: false
        }
    },
    //framerate
    fps: {
    target: 60,
    forceSetTimeOut: true
    }
}

let game = new Phaser.Game(config);