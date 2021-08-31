import Ball from "../entity/ball.js";
import Formation from "./formation.js";
import RoundBullet from "../entity/roundbullet.js";
// The second boss formation
class BossFormation2 extends Formation{
    constructor(game,level) {
        super(level);
        this.xSpeed = 10;
        this.counter = 0;
        this.angle = 0;
        this.movementX = 0;
        this.execute(game);
        this.stopped = false;
        this.distance = 100;
        
    }

    execute(game){
        super.execute();
        var x = 0;
        var y = (H/2);
        this.yy = 0;

        this.addEntity(new Ball(x,y,0,70,0xff0000ff,25).setHealth(90).onDeath(()=>{game.playBossExplosion(); this.killAllEntities(game)}));
        
        for (let index = 1; index < 10; index++) {
            var b = new Ball(x,y,index,32,0xff00ffff,0).setHealth(1);
            b.allowedOutOfLevel = true;
            b.invincible = true;
            b.hitColor = true;
            this.addEntity(b);
        }
    }

    // Basically like the first formation apart from the circle is half and the balls in the circle are invicible and can't be hurt.
    handleEntity(game, entity, deltaTime){

        if (entity.count == 0 && entity.position.x >= (W/2)+250){
            this.stopped = true;
            game.level.stopped = true;
        } 

        this.angle += deltaTime/10;
        this.yy = Math.cos(this.angle)*50;
      //  if (!this.stopped) 

        if (entity.count == 0){
            if (!this.stopped){
                this.movementX -= deltaTime*this.xSpeed*20;
                entity.position.x += deltaTime*this.xSpeed*20;
            }
            entity.position.y = this.yy+280;
            return;
        }

        var x = (Math.cos(this.angle+(entity.count/3.14)) * this.distance) + entity.orginalPositionX;
        var y = (Math.sin(this.angle+(entity.count/3.14)) * this.distance) + entity.orginalPositionY;
        
        entity.position.x = x - this.movementX;
        entity.position.y = y + this.yy;

        entity.shootCounter += deltaTime;

        // Shoot randomly
        if (entity.shootCounter > entity.getRandom(2.25,1.5)){
            var b = new RoundBullet(entity.position.x, entity.position.y,1800,{x:Math.cos(this.angle+(entity.count/3.14)),y:Math.sin(this.angle+(entity.count/3.14))});
            b.speed = 200;
            game.level.addEntity(b);
            game.playShoot2();
            entity.shootCounter = 0;
        }
    }

    onDone(game){
        game.addSecondBossTrophy();
        game.level.stopped = false;
    }
}
export default BossFormation2;