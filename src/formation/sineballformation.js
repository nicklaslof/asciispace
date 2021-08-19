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
            this.addEntity(new Ball(x + (index*50)-(index*10),y+sin,index,48-(index*2)).setHealth(2));
        }    
    }
    handleEntity(game, entity, deltaTime){
        entity.time += (1/10)*40*deltaTime;
        entity.time2 += (1/8)*40*deltaTime;
        var sin = Math.sin(entity.time+entity.count)*10;
        var cos = Math.cos(entity.time2+entity.count)*entity.movementStrength;
        entity.position.y -= (sin+cos)*20*deltaTime;
        entity.position.x -= 100*deltaTime;
       // entity.rotation -= 0.5*deltaTime;
    }
}

export default SineballFormation;