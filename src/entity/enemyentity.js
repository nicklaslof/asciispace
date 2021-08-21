import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
import Resource from "./resource.js";
class EnemyEntity extends CollisionEntity{


    onDispose(game){
        game.playExplosion();
        this.dropResource(game);   
    }

    hit(game,h, force){
        super.hit(game,h,force);
        game.playHit();
        for (let index = 0; index < 10; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,5,2.5).setHealth(70));
        }
    }

    dropResource(game){
        for (let index = 0; index < 20; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,20,10).setHealth(90));
        }
        var resourceType = "rm";
        var c = 0xff999999;
        if (Math.floor(this.getRandom(0,3)) == 1){
            c = 0xffff80e1;
            resourceType = "rg";
        }

        game.level.addEntity(new Resource(this.position.x, this.position.y, c,resourceType));
    }
}

export default EnemyEntity;