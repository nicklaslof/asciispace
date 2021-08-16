import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
import Resource from "./resource.js";
class EnemyEntity extends CollisionEntity{


    onDispose(game){
        this.dropResource(game);   
    }


    dropResource(game){
        for (let index = 0; index < 20; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,20,10).setHealth(90));
        }

        var c = 0xff999999;
        if (Math.floor(this.getRandom(0,2)) == 1){
            c = 0xff00ffff;
        }
        console.log(c);
        game.level.addEntity(new Resource(this.position.x, this.position.y, c,"r"));
    }
}

export default EnemyEntity;