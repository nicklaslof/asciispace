import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";

class Health extends CollisionEntity{
    constructor(posX, posY) {
        super(posX,posY,194,86,126,124,0xff0000ff,16,16,"hp");
        this.orginalPosX = posX;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);
        if (this.getRandom(0,20)){
            game.level.addParticle(new Particle(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-15, this.position.y+15),0xff0000ff,true,5,5).setHealth(40));
        }
    }
}

export default Health;