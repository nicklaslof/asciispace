import Formation from "./formation.js";
import Ball from "../entity/ball.js";
class SineballFormation extends Formation{

    constructor(level) {
        super(level);
    }

    execute(){
        super.execute();
        var x = W+100;
        var y = H/2;
        for (let index = 0; index < 16; index++) {
            var sin = Math.cos(((Math.PI*2)/12)*index)*64;
            this.addEntity(new Ball(x + (index*50),y+sin,index).setHealth(2));
        }    
    }
    handleEntity(game, entity){
        entity.time += 1/10;
        entity.time2 += 1/8;
        var sin = Math.sin(entity.time+entity.count)*10;
        var cos = Math.cos(entity.time2+entity.count)*entity.movementStrength;
        entity.position.y -= sin+cos;
        entity.position.x -= 2;
        entity.rotation -= 0.01;
    }
}

export default SineballFormation;