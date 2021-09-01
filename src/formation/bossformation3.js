import Ball from "../entity/ball.js";
import Formation from "./formation.js";
import RoundBullet from "../entity/roundbullet.js";
// Final boss
class BossFormation3 extends Formation{
    constructor(game,level) {
        super(level);
        this.xSpeed = 1;
        this.counter = 0;
        this.angle = 0;
        this.movementX = 0;
        this.execute(game);
        this.stopped = false;

        this.blastCountdown = 0;

        this.alpha = (0xffffffff >>> 24) & 0xFF;
        this.red = (0xffffffff >>> 16) & 0xFF;
        this.green = (0xffffffff >>>  8) & 0xFF;
        this.blue  = (0xffffffff >>>  0) & 0xFF;

        this.blastWarning = 15;
        this.blastStart = 20;
        this.blastStop = 25;

        this.iterationCount = 0;
        this.shakeX = 0;
        this.shakeY = 0;
        
    }

    execute(game){
        super.execute();
        var x = W;
        var y = (H/2);
        this.yy = 0;

        // Add the big O in the middle
        var mainBall = new Ball(x+5,y,0,70,0xff0000ff,25).setHealth(130).onDeath(()=>{game.playBossExplosion();});
        this.addEntity(mainBall);
        
        // Add the rotating ring
        for (let index = 1; index < 40; index++) {
            var b = new Ball(x,y,index,24,0xffffffff,this.getRandom(0,1)< 0.2?1:0).setHealth(15);
            b.hitColor = false;
            b.distance = 60;
            b.lightSize = 30;
            this.addEntity(b);
        }

        // Add the two smaller rings
        for (let index = 1; index < 40; index++) {
            var b = new Ball(x,y+150,index+40,12,0xffffffff,this.getRandom(0,1)< 0.2?1:0).setHealth(15);
            b.hitColor = false;
            b.lightSize = 20;
            b.distance = 30;
            this.addEntity(b);
        }

        for (let index = 1; index < 40; index++) {
            var b = new Ball(x,y-150,index+80,16,0xffffffff,this.getRandom(0,1)< 0.2?1:0).setHealth(15);
            b.hitColor = false;
            b.lightSize = 20;
            b.distance = 30;
            this.addEntity(b);
        }
    }

    handleEntity(game, entity, deltaTime){

        this.iterationCount++;
        // Do on end of each iteration of entities
        if (this.iterationCount >= this.entities.length){
            this.shakeX = 0;
            this.shakeY = 0;
            this.iterationCount = 0;
        }

        // Do on the first entity (The big O in the middle)
        if (this.iterationCount == 0){
            this.angle += deltaTime;
            if (this.stopped) this.blastCountdown += deltaTime;
            if (this.blastCountdown > this.blastWarning && this.blastCountdown < this.blastStop){
                this.shakeX = entity.getRandom(-5,5);
                this.shakeY = entity.getRandom(-5,5);
            }
        }

        // If the big O in the middle has reach it's end then stop the entity and level from moving further
        if (entity.count == 0 && entity.position.x < (W/2)+250){
            this.stopped = true;
            game.level.stopped = true;
        }

        // If the boss has stopped.
        if (this.stopped){
            this.yy = Math.cos(this.angle-0.2)*35;
            
            if (entity.count > 0){
                // Turn the cirles more red the further into the blast it comes
                if (this.blastCountdown< this.blastWarning){
                    entity.c = (this.alpha & 0xff) << 24 | (this.red -(this.blastCountdown*11) & 0xff) << 16 | ((this.green - (this.blastCountdown*11)) & 0xff) << 8 | ((this.blue) & 0xff);
                }else{
                    entity.c = 0xff0000ff;
                }
                
            } 
            entity.shakeX = this.shakeX;
            entity.shakeY = this.shakeY;
        }
        else
        // If the boss still need to move further in to left
            this.movementX += deltaTime*this.xSpeed;

        // The big O is on it's own move code since it's not part of the circle calculation
        if (entity.count == 0){
            if (!this.stopped) entity.position.x -= deltaTime*this.xSpeed*120;
            entity.position.y = this.yy+295;
           
            return;
        }else{
            // Shoot random bullets when not on the blast warning or blast part
            entity.shootCounter += deltaTime;
            if (this.stopped  && entity.shootCounter > entity.getRandom(10,1500)){
                var b = new RoundBullet(entity.position.x, entity.position.y,1800,{x:Math.cos(this.angle+(entity.count/3.14)),y:Math.sin(this.angle+(entity.count/3.14))});
                b.speed = 200;
                game.level.addEntity(b);
                game.playShoot2();
                entity.shootCounter = 0;
            }
        }
        // Randomly spray the level with bullets during the blast part
        if (this.blastCountdown > this.blastStart && this.blastCountdown < this.blastStop){
            if (entity.getRandom(0,80) < 1){
                var b = new RoundBullet(entity.position.x, entity.position.y,1800,{x:Math.cos(this.angle+(entity.count/3.14)),y:Math.sin(this.angle+(entity.count/3.14))});
                b.speed = 200;
                game.level.addEntity(b);
                game.playShoot2();
            }
        }

        // If we have reached the end of the blast reset and start again.
        if (this.blastCountdown > this.blastStop) this.blastCountdown = 0;


        // Calculate the big circle formation (they all spawned in the same x and y position and using Sinus math for make them position as a circle)
        var x = (Math.cos(this.angle+(entity.count/3.14)) * entity.distance*2) + entity.orginalPositionX;
        var y = (Math.sin(this.angle+(entity.count/3.14)) * entity.distance*2) + entity.orginalPositionY;

        if (entity.count >40){
            // A bit different movememnt for the smaller circles
            var xx = (Math.cos(this.angle+(entity.count/3.14)) * entity.distance/2) + x;
            var yy = (Math.sin(this.angle+(entity.count/3.14)) * entity.distance/2) + y;
            entity.position.x = xx - this.movementX;
            entity.position.y = yy + this.yy;
        }else{
            entity.position.x = x - this.movementX;
            entity.position.y = y + this.yy;
        }

    }

    onDone(game){
        game.addWinningTrophy();
        game.level.showCinematicTextEnd = true;
    }
}
export default BossFormation3;