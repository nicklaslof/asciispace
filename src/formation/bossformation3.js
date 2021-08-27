import Ball from "../entity/ball.js";
import Formation from "./formation.js";
import RoundBullet from "../entity/roundbullet.js";

class BossFormation3 extends Formation{
    constructor(game,level) {
        super(level);
        this.xSpeed = 5;
        this.counter = 0;
        this.angle = 0;
        this.movementX = 0;
        this.execute(game);
        this.stopped = false;
        this.distance = 100;

        this.blastCountdown = 0;

        this.alpha = (0xffffffff >>> 24) & 0xFF;
        this.red = (0xffffffff >>> 16) & 0xFF;
        this.green = (0xffffffff >>>  8) & 0xFF;
        this.blue  = (0xffffffff >>>  0) & 0xFF;
        
    }

    execute(game){
        super.execute();
        var x = W;
        var y = (H/2);
        this.yy = 0;

        this.addEntity(new Ball(x,y,0,70,0xff0000ff,25).setHealth(130).onDeath(()=>{game.playBossExplosion(); this.killAllEntities(game)}));
        
        for (let index = 1; index < 40; index++) {
            var b = new Ball(x,y,index,32,0xffffffff,0).setHealth(100);
            b.hitColor = false;
            //b.allowedOutOfLevel = true;
            //b.invincible = true;
            this.addEntity(b);
        }
    }

    handleEntity(game, entity, deltaTime){

        if (entity.count == 0 && entity.position.x < (W/2)+250){
            this.stopped = true;
            game.level.stopped = true;
        } 

        this.angle += deltaTime/30;
        if (this.stopped){
            this.yy = Math.cos(this.angle-0.2)*100;
            this.blastCountdown += deltaTime/40;
            if (entity.count < 0){
                entity.c = (this.alpha & 0xff) << 24 | (this.red -(this.blastCountdown*11) & 0xff) << 16 | ((this.green - (this.blastCountdown*11)) & 0xff) << 8 | ((this.blue) & 0xff);
            } 
        }

        else
            this.movementX += deltaTime*this.xSpeed;

        if (entity.count == 0){
            if (!this.stopped) entity.position.x -= deltaTime*this.xSpeed*40;
            entity.position.y = this.yy+285;
            return;
        }

        var x = (Math.cos(this.angle+(entity.count/3.14)) * this.distance) + entity.orginalPositionX;
        var y = (Math.sin(this.angle+(entity.count/3.14)) * this.distance) + entity.orginalPositionY;
        
        entity.position.x = x - this.movementX;
        entity.position.y = y + this.yy;


    }

    onDone(game){
        game.level.finished = true;
    }
}
export default BossFormation3;