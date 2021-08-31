import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
// Health pickup
class Health extends CollisionEntity{
    constructor(posX, posY) {
        super(posX,posY,270,36,20,24,0xff0000ff,16,16,"hp");
        this.orginalPosX = posX;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);
        if (this.getRandom(0,20)){
            game.level.addParticle(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-15, this.position.y+15),0xff0000ff,true,3,3,90,40);
        }
    }
}

export default Health;