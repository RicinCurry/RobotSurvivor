import Phaser from "phaser";
import Weapons from './weapons'
import Enemies from './enemies'
export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'Player');
        this.scene = scene
        console.log('Add player')
        this.scene.add.existing(this) 
        scene.physics.world.enable(this); 
        //Player Id
        this.playerMaxHealth = 16;
        this.playerHealth = 16;
        this.playerStatus = undefined;
        this.playerCollectionRange = 6
        this.playerLevel = 0;                               //!! PLAYER LEVEL IS NOT TO BE MISTAKEN WITH WEAPON LEVEL!!//
        this.playerCurrentExp = 0;                          //PLAYER'S EXPERIENCE
        this.playerMaxExp   = 0;                            //REQUIREMENT FOR PLAYER TO ACHIVE NEXT LEVEL        
        this.playerHitboxWidth = 0;                         //HITBOX WIDTH  PLAYER
        this.playerHitboxHeight = 0;                        //HOTBOX HEIGHT PLAYER
        this.playerCurrentSpeed = 240;
        this.playerIsInvincible = false;                    //PLAYER IS INVINCIBLE?
        this.invincibilityDuration = 1000
        this.lastDamagedTime = 0
        this.playerWalkingDirection = undefined;            //FOR WALKING FACE DIRECTION
        this.playerShootingDirection = undefined;           //FOR SHOOTING DIRECTION, SHOOTING DIRECTION IS PRIORITY

        //Player Physics
        this.setScale(3);
        // this.setCollideWorldBounds(true);

        //DAMAGE
        this.lastDamagingEnemy = null;

        this.playerWeapons = [
            new Weapons(scene, 'nailgun', 0, x, y), // Level 1
            new Weapons(scene, 'nailgun', 1, x, y), // Level 2
            new Weapons(scene, 'nailgun', 2, x, y), // Level 3
            new Weapons(scene, 'fireball', 0, x, y), // Level 1
            new Weapons(scene, 'fireball', 1, x, y), // Level 2
            new Weapons(scene, 'fireball', 2, x, y), // Level 3
            new Weapons(scene, 'missile', 0, x, y), // Level 1
            new Weapons(scene, 'missile', 1, x, y), // Level 2
            new Weapons(scene, 'missile', 2, x, y), // Level 3
        ];
        this.currentWeaponIndex = 0;
        }
    update(cursors, keys) {
        //MOVEMENT
        const velocity = new Phaser.Math.Vector2(0,0);
        if(keys.keyW.isDown){
            velocity.y = -1;
            this.playerFaceDirection ="N"
        }
        if (keys.keyA.isDown){
            velocity.x = -1;
            this.playerFaceDirection ="W"
        }
        if (keys.keyS.isDown){
            velocity.y = 1;
            this.playerFaceDirection ="S"
        }
        if (keys.keyD.isDown){
            velocity.x = 1;
            this.playerFaceDirection ="E"
        }

        if(velocity.length() > 0){
            velocity.normalize().scale(this.playerCurrentSpeed);
            this.setVelocity(velocity.x, velocity.y);
        } else{
            this.setVelocity(0);
        }

        //SHOOTING
        const shootDirection = new Phaser.Math.Vector2(0, 0);

        if (keys.keyI.isDown) shootDirection.y = -1; // Up
        if (keys.keyK.isDown) shootDirection.y = 1;  // Down
        if (keys.keyJ.isDown) shootDirection.x = -1; // Left
        if (keys.keyL.isDown) shootDirection.x = 1;  // Right
    
        // Handle diagonal shooting (NW, NE, SW, SE)
        if (shootDirection.length() > 0) {
            shootDirection.normalize();
            this.shoot(shootDirection);
        }

        //PLAYER FLIPPING LOGIC
        if(velocity.x<0){
            this.setFlipX(true)
        }if(velocity.x>0){
            this.setFlipX(false)
        }if(shootDirection.x<0){
            this.setFlipX(true)
        }if(shootDirection.x>0){
            this.setFlipX(false)
        }if(velocity.x<0 && shootDirection.x>0){
            this.setFlipX(false); // Flip right
        } if(velocity.x>0 && shootDirection.x<0){
            this.setFlipX(true); // Flip left
        };
    }
    shoot(direction) {
        const currentWeapon = this.playerWeapons[this.currentWeaponIndex];

        if (!currentWeapon) return;

        const currentTime = this.scene.time.now;
        if (currentTime - this.lastFiredTime < currentWeapon.fireRate * 1000) {
            return;
        }
        this.lastFiredTime = currentTime;

        const bullet = this.scene.physics.add.sprite(this.x, this.y, currentWeapon.projectileSprite);   
        if (bullet) {
            bullet.setActive(true).setVisible(true);
            bullet.setScale(3)
            bullet.setVelocity(
                direction.x * currentWeapon.bulletVelocity, 
                direction.y * currentWeapon.bulletVelocity
            );
            const angle = Phaser.Math.Angle.Between(0, 0, direction.x, direction.y);
            bullet.rotation = angle;
            bullet.damage = currentWeapon.damage;
            bullet.pierce = currentWeapon.pierce;

            //COLLIDER
            this.scene.physics.add.overlap(bullet, this.scene.enemies, this.scene.handleBulletEnemyCollision, null, this.scene);

            this.scene.time.addEvent({
                delay: currentWeapon.bulletLifespan,
                callback: () => {
                    if (bullet && bullet.active) {
                        bullet.destroy();
                    }
                },
            });

        }
    }
    takeDamage(damage, enemy) {
        this.playerHealth -= damage;
        console.log("Player took " +damage+ " damage from " +enemy)
        if (this.playerHealth <= 0) {
            console.log("Player Die")
        }
        
    }
}

