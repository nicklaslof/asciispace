import RoundBullet from "./roundbullet.js";
import StaticEntity from "./staticentity.js";
class Shooter1 extends StaticEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,271,64,35,0xff0000ff,48,24,"s1");
        this.shootCounter = this.shootCounter2 = 0;
        this.orginalPosX = posX;
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
      
    }
    
}
export default Shooter1;