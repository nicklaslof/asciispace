import Bullet from "./bullet.js";
import Entity from "./entity.js";
import RoundBullet from "./roundbullet.js";

class Shooter1 extends Entity{
    constructor(posX, posY) {
        super(posX, posY, 30,6,21,21,0xff0000ff,24,24,"s1");
        this.shootCounter = this.shootCounter2 = 0;
    }

    tick(game, deltaTime){
        super.tick(game, deltaTime);

        this.shootCounter += deltaTime;

        if (this.shootCounter >= 3){
            this.shootCounter = 0;
            
        }
        if (this.shootCounter >= 2){
            this.shootCounter2 += deltaTime;
            if (this.shootCounter2>0.3){
                game.level.addEntity(new RoundBullet(this.position.x, this.position.y,800,{x:0,y:0.25}));
                game.playShoot2();
                this.shootCounter2 = 0;
            }
        }

        this.position.x -= deltaTime*75;
    }
    
}
export default Shooter1;