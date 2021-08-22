import RoundBullet from "./roundbullet.js";
import StaticEntity from "./staticentity.js";
class Shooter2 extends StaticEntity{
    constructor(posX, posY, direction,flip) {
        super(posX, posY, 0,271,64,35,0xff00ff00,48,24,"s2");
        this.shootCounter = this.shootCounter2 = 0;
        this.orginalPosX = posX;
        this.direction = direction;
        if (flip) this.rotation = Math.PI;
    }

    tick(game, deltaTime){
        super.tick(game, deltaTime);
        
        this.shootCounter += deltaTime;

        if (this.shootCounter >= 4){
            this.shootCounter = 0;
            
        }
        if (this.shootCounter >= 2){
            this.shootCounter2 += deltaTime;
            if (this.shootCounter2>0.5){
                game.level.addEntity(new RoundBullet(this.position.x, this.position.y,800,this.direction));
                game.playShoot2();
                this.shootCounter2 = 0;
            }
        }
      
    }
    
}
export default Shooter2;