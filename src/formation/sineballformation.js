import Formation from "./formation.js";
import Ball from "../entity/ball.js";
class SineballFormation extends Formation{

    constructor(level) {
        super(level);
        this.angle = 1;
        this.movementX = 0;
        this.xSpeed = 140;
        this.distance = 50;
        this.iterationCount = 0;
        this.execute();

    }

    execute(){
        super.execute();
        var x = W+100;
        var y = H/2;
        for (let index = 0; index < 16; index++) {
            this.addEntity(new Ball(x,y,index,48-(index*2)).setHealth(2));
        }    
    }
    handleEntity(game, entity, deltaTime){
        this.iterationCount++;
        if (this.iterationCount >= this.entities.length){
            this.angle += deltaTime*2;
            this.movementX += deltaTime*this.xSpeed;
            this.iterationCount = 0;
        }

        var y = ((Math.sin(this.angle+(entity.count/2)) * this.distance)) + entity.orginalPositionY;
        
        entity.position.x = ( entity.orginalPositionX + (entity.count*30)) - this.movementX;
        entity.position.y = y;
    }
}

export default SineballFormation;