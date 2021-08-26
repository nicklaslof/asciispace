import Bullet from "./bullet.js"
import Particle from "./particle.js";
import CollisionEntity from "./collisionentity.js";
class SolidLaser extends CollisionEntity{
    constructor(x,y,sizeX=7, sizeY=70,color=0xff00ffff) {
        super(x, y, 250,130,1,1,color,sizeX,sizeY,"sl");
        this.orginalPosX = x;
        this.setCustomCollisionSize(sizeX, sizeY*10);
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);
    }

    collidedWith(game, otherEntity){
        console.log(otherEntity);
        if (otherEntity === this.sourceEntity || otherEntity.type == "gr" || otherEntity.type == "rb" || otherEntity.type == "b") return;
        //if (otherEntity.type == "p"){
            otherEntity.hit(game, 4);
        //}
    }
}
export default SolidLaser;