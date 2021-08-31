import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";

// The checkpoint object
class Checkpoint extends CollisionEntity{

    constructor(posX, posY) {
        super(posX, posY, 64,2,21,24,"0xff00ffff",32*2,20*2,"c");
        this.hasLight = true;
        this.setCustomCollisionSize(50,50);
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        this.position.x -= deltaTime * 200;

        if (this.getRandom(0,20)){
            game.level.addParticle(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-15, this.position.y+15),0xff00ffff,true,2,2,90,40);
        }
    }
}

export default Checkpoint;