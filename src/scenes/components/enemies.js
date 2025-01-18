// export default class Enemies extends Phaser.Physics.Arcade.Sprite{
//     // static enemyConfigs = {
//     //     goop: {
//     //         speed:                  50,
//     //         health:                 100,
//     //         damage:                 10,
//     //         size:                   1,
//     //         sprite:                 'goop',
//     //         spawnRate:              2000,
//     //         swarmSpawn:             1,
//     //         iFrames :               50,
//     //         dodgeChance :           0,
//     //         hitbox:                 {width: 48 , height:48 },
//     //         knockbackImmune:        false,
//     //         knockbackResistance :   0,
//     //         piercePenalty:          1,
//     //         eliteStatus:            false,
//     //         bossStatus:             false,
//     //         level :                 1
//     //     }
//     // }
//     //NOTES//
//     //ENEMIES HEALTH SCALES UP TO THE TIMER, ENEMY LEVEL IS ALSO A CONSIDERATION, THERE ARE ELITE ENEMY SCALE, ALSO BOSS STATUS
//     //FORMULA
//     // effectiveHealth = [base] * [enemyType]TimerScale * [enemyType]EliteScale * (level / 10 *2)
//     constructor(scene, x, y, config){
//         super(scene, x, y, config.sprite);
//         this.scene = scene;

        
//         this.enemyCurrentHealth = config.health;
//         this.enemyMaxHealth = config.health;
//         this.enemySpeed = config.speed;
//         this.setScale(config.size);
//         this.iFrames = config.iFrames;
//         this.isInvincible = false;
//         this.invincibleTimer = 0

//         this.setCollideWorldBounds(true);
//         this.scene.physics.add.existing(this);
//         this.body.setVelocity(Phaser.Math.Between(-this.enemySpeed, this.enemySpeed), Phaser.Math.Between(-this.enemySpeed, this.enemySpeed));
//     }

//     static spawnEnemy(scene, config) {
//         const x = Phaser.Math.Between(0, scene.scale.width);
//         const y = Phaser.Math.Between(0, scene.scale.height);

//         const enemy = new Enemies(scene, x, y, config);
//         scene.enemies.add(enemy);
//         scene.physics.add.collider(enemy, scene.player);
//         enemy.moveTowardsPlayer(scene.player); // Initiate movement towards player

//         return enemy; 
//     }

//     moveTowardsPlayer(player) {
//         const followDistance = 300; // Distance within which the enemy will follow the player

//         this.scene.time.addEvent({
//             delay: 100, // Update every 100 milliseconds
//             callback: () => {
//                 const playerX = player.x;
//                 const playerY = player.y;

//                 const distance = Phaser.Math.Distance.Between(this.x, this.y, playerX, playerY);

//                 if (distance < followDistance) {
//                     const angle = Phaser.Math.Angle.Between(this.x, this.y, playerX, playerY);
//                     this.body.setVelocity(Math.cos(angle) * this.enemySpeed, Math.sin(angle) * this.enemySpeed);
//                 } else {
//                     this.body.setVelocity(0, 0); // Stop if out of follow distance
//                 }
//             },
//             callbackScope: this,
//             loop: true
//         });
//     }

//     static getRandomConfig() {
//         const configs = Object.values(Enemies.enemyConfigs);
//         return Phaser.Utils.Array.GetRandom(configs);
//     }

//     update(time, delta){
//         if (this.isInvincible) {
//             this.invincibleTimer += delta;
    
//             if (this.invincibleTimer > this.iFrames) {
//                 this.isInvincible = false;
//                 this.clearTint();
//                 this.invincibleTimer = 0;
//             } else {
//                 if ((this.invincibleTimer % 100 < 50) && (this.enemyCurrentHealth > this.enemyMaxHealth * 0.5)) {
//                     this.setTint(ffffff);
//                 } else if((this.invincibleTimer % 100 < 50) && (this.enemyCurrentHealth <= this.enemyMaxHealth * 0.5)) {
//                     this.setTint(ffff00);
//                 } else if ((this.invincibleTimer % 100 < 50) && (this.enemyCurrentHealth <= this.enemyMaxHealth * 0.25)) {
//                     this.setTint(ff0000);
//                 } else {
//                     this.clearTint();
//                 }
//             }
//         }
//     }
//     //LOGIC
//     takeDamage(amount, knockbackForce) {
//         if (!this.isInvincible) {
//             this.enemyCurrentHealth -= amount;
    
//             this.isInvincible = true;
            
//             if (!this.enemyConfigs.knockbackImmune) {
//                 const effectiveKnockback = knockbackForce *(1 - this.enemyConfigs.knockbackResistance);
//                 const knockbackDirection = this.scene.physics.world.colliders.activate[0].body.velocity;
//                 this.body.setVelocity(knockbackDirection.x > 0 ? -knockbackForce : knockbackForce, -knockbackForce);
//             }
//             if (this.enemyCurrentHealth <= 0) {
//                 this.destroy(); // Or handle enemy death logic
//             }
//         }
//     }
// }

export default class Enemies extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, config) { 
        super(scene, x, y, config.sprite); // Use the sprite name from the config

        this.scene = scene;
        this.enemyMaxHealth = config.maxHealth
        this.enemyHealth = config.health || 100; // Health from config
        this.enemyCurrentSpeed = config.speed || 160; // Speed from config
        this.enemyPiercePenalty = config.piercePenalty
        this.enemyScore = config.score
        this.enemyDamage = config.damage
        this.enemyCooldown = config.attackCooldown
        this.enemyName = config.sprite

        this.setScale(config.scale || 3); // Scale from config
        this.scene.add.existing(this); 
        scene.physics.world.enable(this); 
        this.setCollideWorldBounds(true);

        this.enemyLastAttackTime = config.lastattacktime
        this.enemyCanAttackPlayer = config.canattackplayer
    }
    getCurrentTime() {
        return this.scene.time.now; // This returns the current time in milliseconds
    }

    static getRandomConfig() {
        const enemyTypes = [
            { 
                type: 'enemyA', 
                sprite: 'Goop',                             //Fodder
                maxHealth: 16, 
                health: 16, 
                speed: 160,
                damage: 2,
                attackCooldown: 1000,
                piercePenalty: 1, 
                scale: 3,
                score: 1,
                lastattacktime: 0,
                canattackplayer: true,
                spawnRate: Phaser.Math.Between(3000, 5000) 
            },
            { 
                type: 'enemyB', 
                sprite: 'Scoop',                             //Tank
                maxHealth: 64, 
                health: 64, 
                speed: 75,
                damage: 8,
                attackCooldown: 1500,
                piercePenalty: 3, 
                scale: 3,
                score: 3, 
                lastattacktime: 0,
                canattackplayer: true,
                spawnRate: Phaser.Math.Between(2000, 4000) 
            },
            { 
                type: 'enemyC', 
                sprite: 'Droop',                             //Speed
                maxHealth: 8, 
                health: 8, 
                speed: 200,
                damage: 4,
                attackCooldown: 500, 
                piercePenalty: 1,
                scale: 3,
                score: 5, 
                lastattacktime: 0,
                canattackplayer: true,
                spawnRate: Phaser.Math.Between(1000, 3000) 
            }
        ];

        const config = enemyTypes[Phaser.Math.Between(0, enemyTypes.length - 1)];
        return { 
            ...config,
            x: Phaser.Math.Between(0, 1280), // Replace with your width
            y: Phaser.Math.Between(0, 960)    // Replace with your height
        };
    }

    update(player) {
    if (player) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        const proximityThreshold = 10;

        if (distance > proximityThreshold) {
            const direction = new Phaser.Math.Vector2(
                player.x - this.x,
                player.y - this.y
            );

            direction.normalize().scale(this.enemyCurrentSpeed);
            this.setVelocity(direction.x, direction.y);

            if (direction.x < 0 && !this.flipX) {
                this.setFlipX(true); // Flip left
            } else if (direction.x > 0 && this.flipX) {
                this.setFlipX(false); // Flip right
            }
        } else {
            this.setVelocity(0, 0);
        }
    }
}
    takeDamage(damage) {
        this.enemyHealth -= damage;
        const healthPercentage = this.enemyHealth / this.enemyMaxHealth
        if(healthPercentage > 0.75){
            this.setTint(0xff00ff);
        this.scene.time.delayedCall(100, () => {
            this.clearTint();
        });
        } else if (healthPercentage > 0.5) {
            this.setTint(0xffff00);
        this.scene.time.delayedCall(100, () => {
            this.clearTint();
        }); 
        }else {
            this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => {
            this.clearTint();
        });
        }
        if (this.enemyHealth <= 0) {
            this.scene.updateScore(this.enemyScore, this.enemyName);
            this.destroy();
            this.clearTint();
        }
    }
    attemptToDamagePlayer(player) {
        const currentTime = this.scene.time.now; 
        console.log("left" +currentTime - this.enemyLastAttackTime)
        console.log("right"+this.enemyCooldown)
        if (currentTime - this.enemyLastAttackTime >= this.enemyCooldown){
            this.enemyCanAttackPlayer = true
        } else{
            this.enemyCanAttackPlayer = false
        }
        if (this.enemyCanAttackPlayer == true){
            player.takeDamage(this.enemyDamage, this);
            this.enemyLastAttackTime = currentTime
            
            console.log("Enemy " + this.enemyName + " damaged player! with " + this.enemyDamage + " dmg!");
        } else {
            console.log("Enemy " + this.enemyName + " is still on cooldown.");
        }
    }
}

// attemptToDamagePlayer(player) {
//     const currentTime = this.scene.time.now;

//     if (currentTime - this.lastAttackTime >= this.enemyCooldown) {
//         this.lastAttackTime = currentTime;  
//         player.takeDamage(this.enemyDamage, this);
        
//         console.log("Enemy " + this.enemyName + " damaged player! with " + this.enemyDamage + " dmg!");
//     } else {
//         console.log("Enemy " + this.enemyName + " is still on cooldown.");
//     }
// }
