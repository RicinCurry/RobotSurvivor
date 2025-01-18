// import Phaser from "phaser";
// export default class Weapons extends Phaser.Physics.Arcade.Sprite{
//     constructor(scene, x, y){
//         super(scene, x, y, 'weapon');
//         this.scene = scene
//         //WEAPON ID
//         this.playerWeapon = undefined;              //Player weapon internal game name
//         this.playerWeaponName = undefined;          //Player weapon external name
//         this.playerWeaponDescription = undefined;   //Player weapon external descriptions
//         //WEAPON EXP & LVL
//         this.playerWeaponLvl = 0;
//         this.playerWeaponExp = 0;
//         this.playerWeaponLvlRequirement = 0;
//         this.playerWeaponMaxLvl = 0;
//         this.playerWeaponIsFullLevel = false;       //To stop invalid weapon lvl such as lvl 4 rocket launcher
//         //WEAPON DMG & TYPE
//         this.playerWeaponType = undefined;
//             //this.playerWeaponDamageType = undefined;  //Some enemies have immunity to some damage type (POSSIBLE DAMAGE TYPES[Normal, Bullet, ArmorPierce, Fire, Plasma, Sharp, Smash, Explosive, Instakill])
//         this.playerWeaponDamage = 0;
//         this.playerWeaponPierceType = undefined;        //Normal & Infinite Pierce is the only possible status
//         this.playerWeaponPierce = 0;
//         this.playerWeaponVelocity = 0;
//         this.playerWeaponKnockback = 0;
//         this.playerWeaponFireRate = 0;                  //How much time between firing in seconds
//         this.playerWeaponHasAmmo = false;
//         this.playerWeaponMaxAmmo = 0;
//         this.playerWeaponCurrentAmmo = 0;
//         this.playerWeaponBulletLength = 0;                //Length of hurtbox (Bullet size, Sword Length)
//         this.PlayerWeaponBulletHeight = 0;                //Height of hurtbox 
//         this.playerWeaponExplosionSize = 25;
//         //WEAPON VISUAL & SFX
//         this.playerWeaponUseProjectileId = 0;       //What the projectile looks like
//     }

//     //WEAPON FIRE RATE

//     getWeaponFire(type){
//         const firerate = {
//              //NAILGUN
//              nailgun            :   0.1,
//              rivetgun           :   0.05,
//              boltgun            :   0.2,
//              //FIREBALL
//              fireball           :   1,
//              firebolt           :   1,
//              dragonsbreath      :   0.125,
//              //MISSLES
//              missle             :   2,
//              icbm               :   3,
//              fatman             :   5,
//         };
//         return firerate;
//         }
    
//     //WEAPON HAS AMMO OR NOT
    
//     getWeaponHasAmmo(type){
//         const hasAmmo = {
//              //NAILGUN
//              nailgun            :   false,
//              rivetgun           :   false,
//              boltgun            :   false,
//              //FIREBALL
//              fireball           :   false,
//              firebolt           :   false,
//              dragonsbreath      :   false,
//              //MISSLES
//              missle             :   true,
//              icbm               :   true,
//              fatman             :   true,
//         };
//         return hasAmmo;
//         }

//     getWeaponMaxAmmo(type){
//         const maxAmmo = {
//              //NAILGUN
//              nailgun            :   0,
//              rivetgun           :   0,
//              boltgun            :   0,
//              //FIREBALL
//              fireball           :   0,
//              firebolt           :   0,
//              dragonsbreath      :   0,
//              //MISSLES
//              missle             :   16,
//              icbm               :   32,
//              fatman             :   64,
//         };
//         return maxAmmo;
//         }
//     }


import Phaser from "phaser";

export default class Weapons extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, type, level, x, y) {
        super(scene, x, y, 'weapon');
        this.scene = scene;

        this.initializeWeapon(type, level);
    }

    initializeWeapon(type, level) {
        this.playerWeaponName = type;
        this.playerWeaponLevel = level;

        const weaponStats = this.getWeaponStats(type, level);
        Object.assign(this, weaponStats);
    }
    getWeaponStats(type, level) {
        const weaponData = {
            nailgun: [
                //LVL1
                {
                    name:               'Nailgun',
                    weaponLvl:          1,
                    damage:             4, 
                    fireRate:           0.1, 
                    hasAmmo:            false, 
                    pierce:             1,
                    expToUpgrade:       16,
                    currentExp:         0,
                    knockbackPower:     5,
                    bulletVelocity:     400,
                    bulletLifespan:     750,
                    bulletSizeX:        8,
                    bulletSizeY:        8,
                    projectileSprite:   'nailBullets',
                    frame:              0,
                },
                //LVL 2
                {
                    name:               "Rivetgun",
                    weaponLvl:          2,
                    damage:             8,
                    fireRate:           0.25, 
                    hasAmmo:            false, 
                    pierce:             2,
                    expToUpgrade:       32,
                    currentExp:         0,
                    knockbackPower:     10,
                    bulletVelocity:     350,
                    bulletLifespan:     1000,
                    bulletSizeX:        16,
                    bulletSizeY:        16,
                    projectileSprite:   'nailBullets',
                    frame:              1,
                },
                //LVL 3
                {
                    name:               "Boltgun",
                    weaponLvl:          3,
                    damage:             32, 
                    fireRate:           0.35, 
                    hasAmmo:            false, 
                    pierce:             5,
                    expToUpgrade:       48,
                    currentExp:         0,
                    knockbackPower:     25,
                    bulletVelocity:     300,
                    bulletLifespan:     1500,
                    bulletSizeX:        32,
                    bulletSizeY:        32,
                    projectileSprite:   'nailBullets',
                    frame:              2,
                },
                ],
            fireball: [
            //LVL1
                { 
                    name:               "Fireball",
                    weaponLvl:          1,
                    damage:             24, 
                    fireRate:           0.1, 
                    hasAmmo:            false, 
                    pierce:             5,
                    knockbackPower:     5,
                    bulletVelocity:     300,
                    bulletLifespan:     1000,
                    bulletSizeX:        16,
                    bulletSizeY:        16,
                    projectileSprite:   'flameshotBullets',
                    frame:              0,
                },
                //LVL 2
                {
                    name:               "Firebolt",
                    weaponLvl:          2,
                    damage:             48,
                    fireRate:           0.25, 
                    hasAmmo:            false, 
                    pierce:             10,
                    knockbackPower:     10,
                    bulletVelocity:     500,
                    bulletLifespan:     2000,
                    bulletSizeX:        8,
                    bulletSizeY:        8,
                    projectileSprite:   'flameshotBullets',
                    frame:              1,
                },
                //LVL 3
                {
                    name:               "Flamethrower", 
                    weaponLvl:          3,
                    damage:             4, 
                    fireRate:           0.02, 
                    hasAmmo:            false, 
                    pierce:             3,
                    knockbackPower:     5,
                    bulletVelocity:     1000,
                    bulletLifespan:     500,
                    bulletSizeX:        32,
                    bulletSizeY:        32,
                    projectileSprite:   'flameshotBullets',
                    frame:              2,
            },
            ],
            missile: [
                //LEVEL1
                {  
                    name:               "Rocket",
                    weaponLvl:          1,
                    damage:             64,
                    fireRate:           3, 
                    hasAmmo:            true,
                    maxAmmo:            25,
                    pierce:             25,
                    knockbackPower:     25,
                    bulletVelocity:     250,
                    bulletLifespan:     6000,
                    bulletSizeX:        16,
                    bulletSizeY:        16,
                    explosionSize:      64,
                    projectileSprite:   'missles',
                    frame:              0,
                },
                //LEVEL2
                { 
                    name:               "MOAB",
                    weaponLvl:          2,
                    damage:             128,
                    fireRate:           4, 
                    hasAmmo:            true,
                    maxAmmo:            50, 
                    pierce:             50,
                    knockbackPower:     50,
                    bulletVelocity:     400,
                    bulletLifespan:     6000,
                    bulletSizeX:        32,
                    bulletSizeY:        32,
                    explosionSize:      128,
                    projectileSprite:   'missles',
                    frame:              1,
                },
                //LEVEL3
                {  
                    name:               "FatMan",
                    weaponLvl:          3,
                    damage:             256,
                    fireRate:           5, 
                    hasAmmo:            true,
                    maxAmmo:            50,
                    pierce:             99,
                    knockbackPower:     99,
                    bulletVelocity:     200,
                    bulletLifespan:     6000,
                    bulletSizeX:        64,
                    bulletSizeY:        64,
                    explosionSize:      256,
                    projectileSprite:   'missles',
                    frame:              2,
                },
            ],
        };

    return weaponData[type][level];
    }
}