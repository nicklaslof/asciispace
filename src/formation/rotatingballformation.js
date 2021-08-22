import Ball from "../entity/ball.js";
import UFO from "../entity/ufo.js";
import Formation from "./formation.js";

class RotatingBallFormation extends Formation{
    constructor(level,y) {
        super(level);
        this.xSpeed = 10;
        this.counter = 0;
        this.angle = 0;
        this.movementX = 0;
        this.execute(y);
        
    }

    execute(y){
        super.execute();
        var x = W+100;
        
        for (let index = 0; index < 12; index++) {
            this.addEntity(new Ball(x,y,index,32,0xffff9999));
        }
    }

    handleEntity(game, entity, deltaTime,counter){
        
        this.angle += deltaTime/5;
        this.movementX += deltaTime*this.xSpeed;
        var distance = 50;
        var x = (Math.cos(this.angle+(entity.count)) * distance) + entity.orginalPositionX;
        var y = (Math.sin(this.angle+(entity.count)) * distance) + entity.orginalPositionY;
        
        entity.position.x = x - this.movementX;
        entity.position.y = y;
    }
}
export default RotatingBallFormation;