import Bullet from "./bullet.js";
import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
class Ship extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,4,18,18,0xffffffff,48,32,"p");
        this.fireDelay = 0;
    }
    tick(game){
        this.fireDelay--;
        if (this.fireDelay < 0) this.fireDelay = 0;

        var translateX = 0;
        var translateY = 0;

        if (game.keys[68] == "keydown")translateX = 10;
        if (game.keys[65] == "keydown")translateX -= 10;
        if (game.keys[83] == "keydown")translateY += 10;
        if (game.keys[87] == "keydown")translateY -= 10;
        if (game.keys[32] == "keydown")this.firePressed = true;

        if (this.position.x + translateX < 16 || this.position.x + translateX > W - 16) translateX = 0;
        if (this.position.y + translateY < 16 || this.position.y + translateY > H - 16) translateY = 0; 

        this.position.x += translateX;
        this.position.y += translateY;
        game.level.starfield.offsetX = -translateX/105;
        game.level.starfield.offsetY = -translateY/35;

        if (this.firePressed && this.fireDelay == 0){
            game.level.addEntity(new Bullet(this.position.x+16, this.position.y).setSource(this));
            this.fireDelay = 30;
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
      


        super.tick(game);

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