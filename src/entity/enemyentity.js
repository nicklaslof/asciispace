import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
import Resource from "./resource.js";
import Light from "../light/light.js";
class EnemyEntity extends CollisionEntity{
    constructor(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type, drops=1) {
        super(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type);
        this.drops = drops;
        this.light = null;
    }

    onDispose(game){
        if (this.onDeathAction != null) this.onDeathAction();
        else game.playExplosion();
        this.dropResource(game);
        game.level.removeLight(this.light);
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (this.light == null){
            this.light = new Light(this.position.x,this.position.y,0xffffffff);
            game.level.addLight(this.light);
        }
        if (this.light != null){
            this.light.position.x = this.position.x;
            this.light.position.y = this.position.y;
        } 
    }

    onDeath(action){
        this.onDeathAction = action;
        return this;
    }

    hit(game,h, force){
        super.hit(game,h,force);
        if (this.invincible){
            game.playInvincible();
            return;
        }
        game.playHit();
        for (let index = 0; index < 10; index++) {
            game.level.addParticle(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,15,10).setHealth(70));
        }
    }

    dropResource(game){
        for (let index = 0; index < 20; index++) {
            game.level.addParticle(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,20,10).setHealth(90));
        }

        for (let index = 0; index < this.drops; index++) {
            var resourceType = "rm";
            var c = 0xff999999;
            if (Math.floor(this.getRandom(0,3)) == 1){
                c = 0xffff80e1;
                resourceType = "rg";
            }

            game.level.addEntity(new Resource(this.position.x+this.getRandom(-20,20), this.position.y+this.getRandom(-20,20), c,resourceType));
        }
           
    }
}

export default EnemyEntity;