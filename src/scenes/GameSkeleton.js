import Phaser from 'phaser'
import Player from './components/player'
import Weapons from './components/weapons'
import Enemies from './components/enemies'
export default class GameSkeleton extends Phaser.Scene
{
    constructor () {
        super('GameSkeleton');
    }
    init() {
        this.gameHalfWidth = this.scale.width * 0.5;
        this.gameHalfHeight = this.scale.height * 0.5;
    
        // Score
        this.score = 0;
        this.scoreLabel = undefined;
    
        // GameTick
        this.gameTick = 0;
        this.gameTickRate = 60;
        this.gameTickLabel = undefined;
    
        // Clock
        this.gameTimer = 0;
        this.gameTimerLabel = undefined;
    
        // GameWorld
        this.gameMap = undefined;
    
        // GameSettings
        this.gameLevel = 1;
        this.gameSettingsDifficulty = undefined;
        this.gameSettingsLockToggle = false;
    
        // Controls
        this.keys = {
            keyW: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            keyA: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            keyS: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            keyD: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            keyEsc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
            key1: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
            key2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
            key3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
            keyI: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I),
            keyJ: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
            keyK: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            keyL: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        };
        this.bullets = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            runChildUpdate: true,
        });
    }
    
    preload()
    {
        this.load.image("goop", "assets/images/goop.png")
        this.load.image("stages", "assets/images/Stages.jpg");
    }
    create()
    {
        this.add.image(640, 480, "stages");
        this.player =   new Player(this, 400, 300);
        this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);

        // Enemy Group
        this.enemies = this.physics.add.group();

        this.spawnEnemy();
        this.physics.add.collider(this.bullets, this.enemies, this.handleBulletEnemyCollision, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);

        //SCORE SYSTEM
        this.scoreLabel = this.add.text(10, 10, 'Score: ' +this.score+ ' pts', {
            font: '32px Arial',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });

        //HEALTH
        this.healthBar = this.add.graphics();
        this.updateHealthBar();
    }

    spawnEnemy() {
        const config = Enemies.getRandomConfig();
    
        // Spawn the enemy immediately
        const enemy = new Enemies(this, config.x, config.y, config);
        this.enemies.add(enemy);
    
        // Set up the next spawn timer based on the enemy's spawn rate
        this.time.addEvent({
            delay: config.spawnRate,
            callback: this.spawnEnemy,
            callbackScope: this
        });
    }

    //BULLET ENEMY COLLISION
    handleBulletEnemyCollision(bullet, enemy) {
        if (!bullet.active || !enemy.active) return;

        if (!bullet.hitEnemies) {
            bullet.hitEnemies = new Set();
        }

        if (bullet.hitEnemies.has(enemy)) {
            return;
        }

        const damage = bullet.damage;                       // Bullet damage from current weapon
        const piercePenalty = enemy.enemyPiercePenalty      // How many "pierce" the enemy eats; for example, a bullet with 5 pierce value hits an enemy with 2 pierce penalty, if the bullet hit said enemy, it would have 3 pierce value instead of 4 pierce value
        const bulletPierce = bullet.pierce                  // How many enemies could a bullet pierce
        const knockbackPower = bullet.knockbackPower        // How far enemy get launched

        bullet.hitEnemies.add(enemy);
        enemy.takeDamage(damage);
        bullet.pierce -= piercePenalty;

        const remainingPierce = bulletPierce - piercePenalty;

            if(remainingPierce > 0){
                bullet.pierce = remainingPierce
            } else {
                bullet.setActive(false);
                bullet.setVisible(false);
                bullet.hitEnemies.clear();
            }
        }
    handlePlayerEnemyCollision(player, enemy){
        enemy.attemptToDamagePlayer(player);
        this.updateHealthBar();
    }

    //HEALTH UPDATE
    updateHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0x00ff00, 1);
        this.healthBar.fillRect(10, 40, (this.player.playerHealth / this.player.playerMaxHealth) * 200, 20); // 16 is max health for the player, you can modify as needed
    }
    update(time) {
        // Player Controls
        this.player.update(null, this.keys);
    
        // Update each enemy
        this.enemies.getChildren().forEach(enemy => {   
            enemy.update(this.player); // Pass the player to each enemy's update method
        });
    }
    updateScore(amount, source) {
        this.score += amount
        console.log(`Score updated by ${amount} from: ${source}`);
        this.scoreLabel.setText('Score: ' +this.score+ ' pts');
    }
}