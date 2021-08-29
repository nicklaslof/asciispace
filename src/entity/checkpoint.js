import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";

class Checkpoint extends CollisionEntity{

    constructor(posX, posY) {
        super(posX, posY, 64,2,21,24,"0xff00ffff",32*2,20*2,"c");
        this.hasLight = true;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        this.position.x -= deltaTime * 200;

        if (this.getRandom(0,20)){
            game.level.addParticle(new Particle(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-15, this.position.y+15),0xff00ffff,true,5,5).setHealth(40));
        }
    }
}

export default Checkpoint;