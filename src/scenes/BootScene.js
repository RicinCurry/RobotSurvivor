import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super('BootScene');
    }

    preload() {
        // Load all necessary assets
        this.load.image('background', 'assets/images/background.png');
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('startButton', 'assets/images/startbutton.png');
        this.load.image('Player', 'assets/images/mk4.png');
        this.load.image('Goop', 'assets/images/goop.png');
        this.load.image('Scoop', 'assets/images/scoop.png');
        this.load.image('Droop', 'assets/images/droop.png');
        
        this.load.spritesheet('experience', 'assets/images/exp-Sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        
        this.load.spritesheet('flameshotBullets', 'assets/images/flameshotbullet-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        
        this.load.spritesheet('missles', 'assets/images/misslelaunchermissle-Sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        
        this.load.spritesheet('nailBullets', 'assets/images/nailgunbullet-Sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        
        this.load.spritesheet('upgrades', 'assets/images/upgrades-Sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    create() {
        // Switch to TitleScreen after preloading is done
        this.scene.start('TitleScreen');
    }
}