import Laser from "../entity/laser.js";
import RoundBullet from "../entity/roundbullet.js";
import UFO from "../entity/ufo.js";
import Formation from "./formation.js";

// Ufos that moves away from the player but shoots both down and in front of them depending on how far into the screen they have reached
class UfoFormation2 extends Formation{
    constructor(level) {
        super(level);
        this.execute(level);
        
    }

    execute(level){
        super.execute();
        
        for (let index = 0; index < 6; index++) {
            var x = W-(100);
            var y = -100*index;
            this.addEntity(new UFO(x,y,index,50,160).setHealth(13));
            //var e = new UFO(x,y,index,32,0xffff9999).setHealth(4);
           // e.shootCounter = 0;
            //this.addEntity(e);
        }
    }

    handleEntity(game, entity, deltaTime){
        
        entity.position.x -= entity.xSpeed*deltaTime;
        entity.position.y += entity.ySpeed*deltaTime;


        if (entity.position.y > H/2){
            entity.ySpeed = 0;
            entity.xSpeed = 120;
            entity.shootCounter += deltaTime;

            if (entity.shootCounter > 2){
                this.level.addEntity(new Laser(entity.position.x, entity.position.y,400,{x:-1,y:0},2));
                if (entity.position.x < (W/2)+50) this.level.addEntity(new RoundBullet(entity.position.x, entity.position.y+25,800,{x:0,y:0.5}));
                if (entity.position.x < (W/2)-150) this.level.addEntity(new RoundBullet(entity.position.x, entity.position.y-25,800,{x:0,y:-0.5}));
                game.playShoot2();
                entity.shootCounter = 0;
            }
        }


       
    }
}
export default UfoFormation2;