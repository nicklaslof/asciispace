import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
class Asteroid extends CollisionEntity{
    constructor(posX, posY,sizeX, sizeY) {
        super(posX, posY, 0,72,170,176,0xff236880,sizeX,sizeY,"a");
        this.xDirection = this.getRandom(-0.8,0);
        this.yDirection = this.getRandom(-0.2,0.2);
        this.rDirection = this.getRandom(-0.016,0.016);
    }
    tick(game){
        super.tick(game);
        this.position.x += this.xDirection;
        this.position.y += this.yDirection;
        this.rotation += this.rDirection;
    }
    collidedWith(game, otherEntity){
        if (otherEntity.type == "p") otherEntity.hit(-1);
    }
    
}
export default Asteroid;