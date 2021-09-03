import Bullet from "./bullet.js";
import CollisionEntity from "./collisionentity.js";
import Drone from "./drone.js";
import Laser from "./laser.js";
import Particle from "./particle.js";

//The player ship
class Ship extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,4,20,22,0xffffffff,48,32,"p");
        this.fireDelay = 0.2;       // Controls how long to wait between each fire. It's set further down depending on upgrades.
        this.speed = 300;           // The speed the ship moves at.
        this.particleDelay = 0;     // Counter for how often particles are spawned from the ship
        this.mineral = 0;           // How much mineral collected
        this.metalScrap = 0;        // How much metal collected
        this.shootRange = 200;      // How far the laser currently reaches
        this.laserStrength = 1;     // The current strength of the laser
        this.showHurtCounter = 0;   // Used for displaying a flashing red/white when hit
        this.dualLaser = false;     // If the player has the dual laser upgrade
        this.fireUpperLaser = false;
        this.rearLaser = false;     // If the player has the rear laser upgrade
        this.sideLaser = false;     // If the player has the side laser upgrade

        this.drones = [];           // The drone objects
        this.numberOfDrones = 0;    // How many drones the player should have

        this.hasLight = true;
        
    }
    tick(game,deltaTime){
        super.tick(game,deltaTime);

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

        translateX = game.input.axes.x * this.speed;
        translateY = game.input.axes.y * this.speed;

        this.firePressed = game.input.firePressed;

        // Make sure we can't move outside the screen
        if (this.position.x + translateX*deltaTime < 16 || this.position.x + translateX *deltaTime > W - 16) translateX = 0;
        if (this.position.y + translateY*deltaTime < 16 || this.position.y + translateY *deltaTime> H - 16) translateY = 0; 

        this.position.x += translateX*deltaTime;
        this.position.y += translateY*deltaTime;
        game.level.starfield.offsetX = -translateX/2005;
        game.level.starfield.offsetY = -translateY/3000;

        // Fire laser
        var laserHeight = Math.max(1.5,3*(this.laserStrength/4));
        if (this.firePressed && this.fireDelay == 0){
            if (this.dualLaser){
                game.playShoot();
                if (this.fireUpperLaser)game.level.addEntity(new Laser(this.position.x+16, this.position.y+12,this.shootRange,{x:1,y:0},this.laserStrength,0,40,(2*this.laserStrength)).setSource(this));
                else game.level.addEntity(new Laser(this.position.x+16, this.position.y-8,this.shootRange,{x:1,y:0},this.laserStrength,0,40,laserHeight).setSource(this));
                this.fireUpperLaser = !this.fireUpperLaser;
                this.fireDelay = 0.3;
            }else{
                game.playShoot();
                game.level.addEntity(new Laser(this.position.x+16, this.position.y,this.shootRange,{x:1,y:0},this.laserStrength,0,28,laserHeight).setSource(this));
                this.fireDelay = 0.5;
            }
            if (this.drones.length > 0){
                game.playDroneShoot();
            }

            if (this.rearLaser){
                game.level.addEntity(new Laser(this.position.x-32, this.position.y+1,this.shootRange,{x:-1,y:0},this.laserStrength,0,40,laserHeight).setSource(this));
            }

            if (this.sideLaser){
                game.level.addEntity(new Laser(this.position.x, this.position.y+12,this.shootRange,{x:0,y:1},this.laserStrength,Math.PI/2,40,laserHeight).setSource(this));
                game.level.addEntity(new Laser(this.position.x, this.position.y-8,this.shootRange,{x:0,y:-1},this.laserStrength,Math.PI/2,40,laserHeight).setSource(this));
            }
            
        }else{
            this.firePressed = false;
        }

        // Fire lasers from the drones
        if (this.firePressed){
            this.drones.forEach(drone => {
                drone.shootTimer--;
                if (drone.shootTimer<=0){
                    drone.shoot(game,this,this.shootRange,this.laserStrength);
                    drone.shootTimer = 0.15*drone.count;
                }
            });
        }

        // Create drone objects if there is too few of them
        if (this.drones.length < this.numberOfDrones){
            var startAngle = Math.PI * this.drones.length*8;
            this.drones.push(new Drone(this.position.x,this.position.y,startAngle,this.drones.length));
        }

        // Player movement particles

        if (translateX > 0 && this.particleDelay == 0){
            if (Math.floor(this.getRandom(0,2))==1)
                game.level.addParticle(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-15, this.position.y+15),0x99999999,true,2,2,90,40);
            this.particleDelay = 0.01;
            
 
        }else if (translateX < 0 && this.particleDelay == 0){
            if (Math.floor(this.getRandom(0,2))==1)
                game.level.addParticle(this.getRandom(this.position.x-10,this.position.x+10), this.getRandom(this.position.y-10, this.position.y+10),0x999999ff,false,11,1,90,40);
            this.particleDelay = 0.01;
                
        }else{
            if (this.particleDelay == 0){
                if (Math.floor(this.getRandom(0,2))==1){
                    game.level.addParticle(this.getRandom(this.position.x-30,this.position.x-40), this.getRandom(this.position.y-4, this.position.y+4),0x99999999,true,2,2,90,20);
                }
                    
                this.particleDelay = 0.1;
            }
        }

        this.drones.forEach(drone => {
            drone.tick(game,deltaTime);
        });

        // Used to speedup and slow down the game depending on ship movement. I didn't use this a lot in the end and it's mostly the stars that uses this
        game.level.speedX = translateX;
        game.level.speedY = translateY;
    }

    hit(game,h,force,hitTimeout){
        if (this.hitTimeout<=0){ 
            game.playPlayerHit();
            for (let index = 0; index < 20; index++) {
                game.level.addParticle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),0xff0000ff,true, 3,3,90,90);
            }
        }
        super.hit(game,h,force,hitTimeout);

    }

    // Called when we collide with something.
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
            return;
        }
        if (otherEntity.type == "c"){
            game.level.snapshotCheckpoint(game);
            otherEntity.disposed = true;
            return;
        }
        if (otherEntity.type == "s"){
            this.hit(game,2);
        }

        if (otherEntity.type == "ob"){
            this.hit(game,4,true);
        }
        this.hit(game,1);
    }

    onDispose(game){
        game.playPlayerDied();
        for (let index = 0; index < 50; index++) {
            game.level.addParticle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),0xff999999,true,5,5,90,90);
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