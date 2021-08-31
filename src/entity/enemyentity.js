import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
import Resource from "./resource.js";
import Light from "../light/light.js";

//Base class for all entities in the game that are enimies to the player
class EnemyEntity extends CollisionEntity{
    constructor(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type, drops=1) {
        super(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type);
        this.drops = drops;
        this.hasLight = true;
        this.lightSize = 200;
    }

    // Before disposing the entity execute any custom actions and drop resources (metal/minerals).
    onDispose(game){
        super.onDispose(game);
        if (this.onDeathAction != null) this.onDeathAction();
        else game.playExplosion();
        this.dropResource(game);
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
    }

    onDeath(action){
        this.onDeathAction = action;
        return this;
    }

    // If hit and not invincible play sound and spawn particles
    hit(game,h, force){
        super.hit(game,h,force);
        if (this.invincible){
            game.playInvincible();
            return;
        }
        game.playHit();
        for (let index = 0; index < 10; index++) {
            game.level.addParticle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,true,1,1,90,70);
        }
    }

    // Drops resources for the player to pick up
    dropResource(game){
        for (let index = 0; index < 20; index++) {
            game.level.addParticle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,true, 2,2,90,90);
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