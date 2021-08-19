import Bullet from "./bullet.js";
import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
class Ship extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,4,18,18,0xffffffff,48,32,"p");
        this.fireDelay = 0;
        this.speed = 300;
    }
    tick(game,deltaTime){
        this.fireDelay -= deltaTime;
        if (this.fireDelay < 0) this.fireDelay = 0;

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

        if (this.firePressed && this.fireDelay == 0){
            game.level.addEntity(new Bullet(this.position.x+16, this.position.y).setSource(this));
            this.fireDelay = 20;
        }else{
            this.firePressed = false;
        }

        if (translateX > 0){
            for (let index = 0; index < 2; index++) {
                game.level.addEntity(new Particle(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-30, this.position.y+30),0x99999999,true,2,2).setHealth(40));
            }  
        }else if (translateX < 0){
            for (let index = 0; index < 2; index++) {
                game.level.addEntity(new Particle(this.getRandom(this.position.x-10,this.position.x+10), this.getRandom(this.position.y-10, this.position.y+10),0x999999ff,false,22,1).setHealth(40));
            } 
        }else{
            if (Math.floor(this.getRandom(0,15))==1)
                game.level.addEntity(new Particle(this.getRandom(this.position.x-30,this.position.x-40), this.getRandom(this.position.y-10, this.position.y+10),0x99999999,true,2,2).setHealth(40));
        }

        game.level.speedX = translateX;
        game.level.speedY = translateY;
      


        super.tick(game,deltaTime);

    }
    collidedWith(game, otherEntity){
        if (otherEntity.type == "b" && otherEntity.sourceEntity == this) return;
        if (otherEntity.type == "r"){
            otherEntity.disposed = true;
            return;
        }
        this.hit(game,1);
    }
}
export default Ship;