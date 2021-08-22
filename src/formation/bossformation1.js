import UFO from "../entity/ufo.js";
import Formation from "./formation.js";

class Bossformation1 extends Formation{
    constructor(level) {
        super(level);
        this.xSpeed = 100;
        this.ySpeed = 100;
        this.execute();
        this.counter = 0;
        
    }

    execute(){
        super.execute();
        var x = W-200;
        var y = H/2;
        for (let index = 0; index < 16; index++) {
            var sin = Math.sin(index/10)*80;
            var cos = Math.cos(index/10)*80;
            console.log(sin +" "+cos);
            this.addEntity(new UFO(x + sin,y+cos,index));
        }
    }

    handleEntity(game, entity, deltaTime,counter){
        
        //this.counter += deltaTime;
        
        //console.log(this.counter);
        var sin = Math.sin((counter+(entity.count/10))*2)*2;
        var cos = Math.cos((counter+(entity.count/80))*2)*2;

       entity.position.x += sin * this.xSpeed* deltaTime;
        entity.position.y += cos * this.xSpeed* deltaTime;

       // entity.position.x -= this.xSpeed*deltaTime;

        //console.log(entity.position);

    }
}
export default Bossformation1;