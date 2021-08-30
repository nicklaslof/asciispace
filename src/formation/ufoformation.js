import Laser from "../entity/laser.js";
import UFO from "../entity/ufo.js";
import Formation from "./formation.js";

// The UFO formation. They just stay in the air and shoots forward.
class UfoFormation extends Formation{
    constructor(level) {
        super(level);
        this.xSpeed = 10;
        this.counter = 0;
        this.angle = 0;
        this.movementX = 0;
        this.execute(level);
        
    }

    execute(level){
        super.execute();
        var x = W+100;
        
        for (let index = 0; index < 4; index++) {
            var y = 128+(128 * index);
            this.addEntity(new UFO(x,y,index,32,0xffff9999).setHealth(4));
        }
    }

    handleEntity(game, entity, deltaTime){
        
        this.angle += deltaTime/2;
        this.movementX += deltaTime*this.xSpeed;
        var distance = 25;
        var x = (Math.cos(this.angle+(entity.count)) * distance) + entity.orginalPositionX;
        var y = (Math.sin(this.angle+(entity.count)) * distance) + entity.orginalPositionY;
        
        entity.position.x = x - this.movementX;
        entity.position.y = y;


        entity.shootCounter += deltaTime;

        if (entity.shootCounter > 3.5){
            this.level.addEntity(new Laser(entity.position.x, entity.position.y,400,{x:-1,y:0},2));
            game.playShoot2();
            entity.shootCounter = 0;
        }
    }
}
export default UfoFormation;