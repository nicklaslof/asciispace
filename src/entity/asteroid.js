import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
class Asteroid extends CollisionEntity{
    constructor(posX, posY,sizeX, sizeY) {
        super(posX, posY, 0,72,170,176,0xff236880,sizeX,sizeY,"a");
        this.xDirection = this.getRandom(-0.2,0.2);
        this.yDirection = this.getRandom(-0.2,0.2);
        this.rDirection = this.getRandom(-0.008,0.008);
    }
    tick(game){
        super.tick(game);
        this.position.x += this.xDirection;
        this.position.y += this.yDirection;
        this.rotation += this.rDirection;
    }

    hit(game, h){
        super.hit(game,h);

        for (let index = 0; index < h*2; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-20, this.position.y+20),this.color).setHealth(80));
        }        

    }

    onDispose(game){
        for (let index = 0; index < 20; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-120/this.maxHealth,this.position.x+120/this.maxHealth), this.getRandom(this.position.y-120/this.maxHealth, this.position.y+120/this.maxHealth),this.color).setHealth(180));
        } 
        if (this.maxHealth>3){
            for (let index = 0; index < 3; index++) {
                game.level.addEntity(new Asteroid(this.getRandom(this.position.x-20,this.position.x+20), this.getRandom(this.position.y-20, this.position.y+20),this.sizeX/1.5, this.sizeY/1.5).setHealth(this.maxHealth/2));
            }
        }
    }
}
export default Asteroid;