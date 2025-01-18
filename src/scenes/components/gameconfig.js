export default class GameConfig extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'gameconfig');
        this.scene = scene
        //DIFFICULTY
        this.gameDifficulty = undefined;
        this.gameAllVeteran = false;
        this.gameIronManMode = false;
        //Configuration
        this.settingsMasterSounds = true;         //All sound
    }
}