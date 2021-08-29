import RoundBullet from "./roundbullet.js";
import StaticEntity from "./staticentity.js";
class Shooter1 extends StaticEntity{
    constructor(posX, posY,alternative=false,alternative2=false) {
        super(posX, posY, 0,271,64,35,0xff0000ff,48,24,"s1");
        this.shootCounter = this.shootCounter2 = 0;
        this.orginalPosX = posX;
        this.alternative = alternative;
        this.shootTime = this.alternative == true ? 7 : 3;
        this.shootDirection = alternative2 ? {x:0,y:-0.25} : {x:0,y:0.25};
        this.hasLight = true;
        this.lightColor = this.c;
    }

    tick(game, deltaTime){
        super.tick(game, deltaTime);
        
        this.shootCounter += deltaTime;

        if (this.shootCounter >= this.shootTime){
            this.shootCounter = 0;
            
        }
        if (this.alternative){
            if (this.shootCounter <=1 || this.shootCounter >=1.75){
                this.shootCounter2 += deltaTime;
                if (this.shootCounter2>0.3){
                    game.level.addEntity(new RoundBullet(this.position.x, this.position.y,800,this.shootDirection));
                    game.playShoot2();
                    this.shootCounter2 = 0;
                }
            }
        }else{
            if (this.shootCounter >= 2){
                this.shootCounter2 += deltaTime;
                if (this.shootCounter2>0.3){
                    game.level.addEntity(new RoundBullet(this.position.x, this.position.y,800,this.shootDirection));
                    game.playShoot2();
                    this.shootCounter2 = 0;
                }
            }
        }
        

       
      
    }
    
}
export default Shooter1;