import Ball from "../entity/ball.js";
import Formation from "./formation.js";

class BossFormation1 extends Formation{
    constructor(level) {
        super(level);
        this.xSpeed = 10;
        this.counter = 0;
        this.angle = 0;
        this.movementX = 0;
        this.execute();
        this.stopped = false;
        this.distance = 100;
        
    }

    execute(){
        super.execute();
        var x = W+100;
        var y = H/2;

        this.addEntity(new Ball(x,y,0,70,0xff0000ff,15).setHealth(20));
        
        for (let index = 1; index < 40; index++) {
            this.addEntity(new Ball(x,y,index,32,0xffff9999,0).setHealth(1));
        }
    }

    handleEntity(game, entity, deltaTime){

        if (entity.count == 0 && entity.position.x <= (W/2)+300){
            this.stopped = true;
            game.level.stopped = true;
        } 

        this.angle += deltaTime/10;
        if (!this.stopped) this.movementX += deltaTime*this.xSpeed/2;


        if (entity.count == 0){
            if (!this.stopped) entity.position.x -= deltaTime*this.xSpeed*20;
            return;
        }


        var x = (Math.cos(this.angle+(entity.count/3.14)) * this.distance) + entity.orginalPositionX;
        var y = (Math.sin(this.angle+(entity.count/3.14)) * this.distance) + entity.orginalPositionY;
        
        entity.position.x = x - this.movementX;
        entity.position.y = y;
    }

    onDone(game){
        game.level.stopped = false;
    }
}
export default BossFormation1;