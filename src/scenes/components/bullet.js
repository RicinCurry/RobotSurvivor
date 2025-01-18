export default class Bullets extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'bullet');
        this.scene = scene
    }
    //WEAPON DAMAGE

    getWeaponDamage(type){
        const damages = {
            //NAILGUN
            nailgun              :   5,
            rivetgun             :   7.5,
            boltgun              :   30,
            //FIREBALL
            fireball             :   10,
            firebolt             :   20,
            dragonsbreath        :   12.5,
            //MISSLES
            missle               :   25,
            icbm                 :   50,
            fatman               :   100,
        };
        return damages;
        }

    //WEAPON PIERCE
    
    getWeaponPierce(type){
        const pierce = {
            //NAILGUN
            nailgun             :   2,
            rivetgun            :   1,
            boltgun             :   5,
            //FIREBALL
            fireball            :   5,
            firebolt            :   5,
            dragonsbreath       :   3,
            //MISSLES
            missle              :   100,
            icbm                :   100,
            fatman              :   100,
        };
        return pierce;
        }

    //WEAPON BULLET SPEED pixels/seconds
    
    getWeaponVelocity(type){
        const velocity = {
            //NAILGUN
            nailgun              :   50,
            rivetgun             :   40,
            boltgun              :   30,
            //FIREBALL
            fireball             :   40,
            firebolt             :   50,
            dragonsbreath        :   360,
            //MISSLES
            missle               :   450,
            icbm                 :   450,
            fatman               :   450,
        };
        return velocity;
        }

    //BULLETKNOCKBACK

    getWeaponKnockBack(type){
        const knockback = {
            //NAILGUN
            nailgun              :   5,
            rivetgun             :   10,
            boltgun              :   30,
            //FIREBALL
            fireball             :   25,
            firebolt             :   50,
            dragonsbreath        :   25,
            //MISSLES
            missle               :   75,
            icbm                 :   75,
            fatman               :   75,
        };
        return knockback;
        }

        //EXPLOSIONSIZE

    getWeaponExplosionSize(type){
        const explosionSize = {
            //NAILGUN
            nailgun              :   0,
            rivetgun             :   0,
            boltgun              :   0,
            //FIREBALL
            fireball             :   0,
            firebolt             :   0,
            dragonsbreath        :   0,
            //MISSLES
            missle               :   16,
            icbm                 :   32,
            fatman               :   64,
        };
        return explosionSize;
        }
}
