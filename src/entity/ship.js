import Bullet from "./bullet.js";
import CollisionEntity from "./collisionentity.js";
import Drone from "./drone.js";
import Laser from "./laser.js";
import Particle from "./particle.js";
class Ship extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,4,18,18,0xffffffff,48,32,"p");
        this.fireDelay = 0;
        this.speed = 300;
        this.particleDelay = 0;
        this.mineral = 0;
        this.metalScrap = 0;
        this.shootRange = 200;
        this.laserStrength = 1;
        this.entityTimeoutOnHit = 2;
        this.showHurtCounter = 0;
        this.dualLaser = false;
        this.fireUpperLaser = false;
        this.rearLaser = false;
        this.sideLaser = false;

        this.drones = [];
        this.numberOfDrones = 0;
    }
    tick(game,deltaTime){
        super.tick(game,deltaTime);

        // Counters

        this.fireDelay -= deltaTime;
        if (this.fireDelay < 0) this.fireDelay = 0;

        this.particleDelay -= deltaTime;
        if (this.particleDelay < 0) this.particleDelay = 0;


        if (this.hitTimeout>0){
            this.showHurtCounter += deltaTime;
            if (this.showHurtCounter>0.1){
                if (this.c == 0xffffffff)this.c = 0xff0000ff;
                else if (this.c == 0xff0000ff) this.c = 0xffffffff;
                this.showHurtCounter = 0;
            }
        }else{
            this.c = 0xffffffff;
        }



        // Player movements
        var translateX = 0;
        var translateY = 0;

        if (game.keys[68] == "keydown")translateX = this.speed;
        if (game.keys[65] == "keydown")translateX -= this.speed;
        if (game.keys[83] == "keydown")translateY += this.speed;
        if (game.keys[87] == "keydown")translateY -= this.speed;
        if (game.keys[32] == "keydown")this.firePressed = true;

        if (this.position.x + translateX*deltaTime < 16 || this.position.x + translateX *deltaTime > W - 16) translateX = 0;
        if (this.position.y + translateY*deltaTime < 16 || this.position.y + translateY *deltaTime> H - 16) translateY = 0; 

        this.position.x += translateX*deltaTime;
        this.position.y += translateY*deltaTime;
        game.level.starfield.offsetX = -translateX/2005;
        game.level.starfield.offsetY = -translateY/3000;

        // Fire laser

        if (this.firePressed && this.fireDelay == 0){
            if (this.dualLaser){
                game.playShoot();
                if (this.fireUpperLaser)game.level.addEntity(new Laser(this.position.x+16, this.position.y+12,this.shootRange,{x:1,y:0},this.laserStrength,0,40,(2*this.laserStrength)).setSource(this));
                else game.level.addEntity(new Laser(this.position.x+16, this.position.y-8,this.shootRange,{x:1,y:0},this.laserStrength,0,40,(2*this.laserStrength)).setSource(this));
                this.fireUpperLaser = !this.fireUpperLaser;
                this.fireDelay = 0.3;
            }else{
                game.playShoot();
                game.level.addEntity(new Laser(this.position.x+16, this.position.y,this.shootRange,{x:1,y:0},this.laserStrength,0,40,(2*this.laserStrength)).setSource(this));
                this.fireDelay = 0.5;
            }
            if (this.drones.length > 0){
                game.playDroneShoot();
            }

            this.drones.forEach(drone => {
                drone.shoot(game,this,this.shootRange,this.laserStrength);
            });

            if (this.rearLaser){
                game.level.addEntity(new Laser(this.position.x-32, this.position.y+1,this.shootRange,{x:-1,y:0},this.laserStrength,0,40,(2*this.laserStrength)).setSource(this));
            }

            if (this.sideLaser){
                game.level.addEntity(new Laser(this.position.x, this.position.y+12,this.shootRange,{x:0,y:1},this.laserStrength,Math.PI/2,40,(2*this.laserStrength)).setSource(this));
                game.level.addEntity(new Laser(this.position.x, this.position.y-8,this.shootRange,{x:0,y:-1},this.laserStrength,Math.PI/2,40,(2*this.laserStrength)).setSource(this));
            }
            
        }else{
            this.firePressed = false;
        }

        if (this.drones.length < this.numberOfDrones){
            var startAngle = Math.PI * this.drones.length;
            this.drones.push(new Drone(this.position.x,this.position.y,startAngle));
        }


        // Player movement particles

        if (translateX > 0 && this.particleDelay == 0){
            if (Math.floor(this.getRandom(0,2))==1)
                game.level.addEntity(new Particle(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-15, this.position.y+15),0x99999999,true,5,5).setHealth(40));
            this.particleDelay = 0.01;
            
 
        }else if (translateX < 0 && this.particleDelay == 0){
            if (Math.floor(this.getRandom(0,2))==1)
                game.level.addEntity(new Particle(this.getRandom(this.position.x-10,this.position.x+10), this.getRandom(this.position.y-10, this.position.y+10),0x999999ff,false,11,1).setHealth(40));
            this.particleDelay = 0.01;
                
        }else{
            if (this.particleDelay == 0){
                if (Math.floor(this.getRandom(0,2))==1){
                    game.level.addEntity(new Particle(this.getRandom(this.position.x-30,this.position.x-40), this.getRandom(this.position.y-4, this.position.y+4),0x99999999,true,5,5).setHealth(20));
                }
                    
                this.particleDelay = 0.1;
            }
        }

        this.drones.forEach(drone => {
            drone.tick(game,deltaTime);
        });

        game.level.speedX = translateX;
        game.level.speedY = translateY;
    }

    hit(game,h,force,hitTimeout){
        if (this.hitTimeout<=0){ 
            game.playPlayerHit();
            for (let index = 0; index < 20; index++) {
                game.level.addEntity(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),0xff0000ff,30,15).setHealth(90));
            }
        }
        super.hit(game,h,force,hitTimeout);

    }

    collidedWith(game, otherEntity){
        if (otherEntity.type == "b" && otherEntity.sourceEntity == this) return;
        if (otherEntity.type == "rg" || otherEntity.type == "rm"){
            game.playPickup();
            otherEntity.disposed = true;
            if (otherEntity.type == "rg") this.mineral++;
            if (otherEntity.type == "rm") this.metalScrap++;
            return;
        }
        if (otherEntity.type == "hp"){
            this.health = this.maxHealth;
            game.playHealth();
            otherEntity.disposed = true;
        }
        if (otherEntity.type == "c"){
            game.level.snapshotCheckpoint(game);
            otherEntity.disposed = true;
            return;
        }
        if (otherEntity.type == "s"){
            this.hit(game,3);
        }
        this.hit(game,1);
    }

    onDispose(game){
        game.playPlayerDied();
        for (let index = 0; index < 50; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),0xff999999,true,30,30).setHealth(300));
        }
    }

    render(game){
        this.drones.forEach(drone => {
            drone.render(game);
        });

        super.render(game);
    }
}
export default Ship;