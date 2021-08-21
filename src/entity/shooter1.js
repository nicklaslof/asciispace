import Bullet from "./bullet.js";
import Entity from "./entity.js";

class Shooter1 extends Entity{
    constructor(posX, posY) {
        super(posX, posY, 30,6,21,21,0xff00ff00,16,16,"s1");
        this.shootCounter = 0;
    }

    tick(game, deltaTime){
        super.tick(game, deltaTime);

        this.shootCounter += deltaTime;

        if (this.shootCounter >= 2){
            this.shootCounter = 0;
            game.level.addEntity(new Bullet(this.position.x, this.position.y,200,{x:0,y:1}));
        }

        this.position.x -= deltaTime*75;
    }
    
}
export default Shooter1;