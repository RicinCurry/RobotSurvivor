import TitleScreen from './scenes/TitleScreen';
import MainGameScene from './scenes/MainGameScene';
import BootScene from './scenes/BootScene';
import GameSkeleton from './scenes/GameSkeleton';

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		},
	},
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        BootScene,
        TitleScreen,
        GameSkeleton,
        MainGameScene,
    ]
};
const game = new Phaser.Game(config);

