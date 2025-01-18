import Phaser from "phaser";
import BootScene from "./BootScene"; // Make sure the path is correct for your project structure

export default class TitleScreen extends Phaser.Scene {  // Fixed typo here
    constructor () {
        super("TitleScreen");
    }

    preload() {
        console.log("Preloading assets in TitleScreen...");
        // Load background and logo (in case they are not loaded in BootScene)
        this.load.image("background", "assets/images/background.png");
        this.load.image("logo", "assets/images/logo.png");
        this.load.image("startButton", "assets/images/startbutton.png"); // Add start button to ensure it"s preloaded
    }

    create() {
        console.log("Creating TitleScreen...");
        // Add the background and logo images to the scene
        this.add.image(640, 480, "background");
        this.add.image(480, 320, "logo").setScale(2);   

        // Add and make the start button interactive
        const playButton = this.add.image(480, 640, "startButton")
            .setScale(0.25)
            .setInteractive()
            .on("pointerdown", () => {
                this.startGame();
        });
        playButton.setOrigin(0.5);
    }   

    startGame() {
        console.log("Starting the game...");
        // Start the main game scene (replace "GameSkeleton" with your actual game scene)
        this.scene.start("GameSkeleton");
    }
}