import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
class Ball extends CollisionEntity{
    constructor(posX, posY, count) {
        super(posX, posY, 30,6,21,21,0xff00ffff,64,64,"o");
        this.count = -0.52*count;
        this.time = this.time2 = 0;
        this.movementStrength = this.getRandom(1,5);
    }

    tick(game){
        super.tick(game);
        this.time += 1/10;
        this.time2 += 1/8;
        var sin = Math.sin(this.time+this.count)*10;
        var cos = Math.cos(this.time2+this.count)*this.movementStrength;
        this.position.y -= sin+cos;
        this.position.x -= 2;
        this.rotation -= 0.01;
    }

    onDispose(game){
        for (let index = 0; index < 20; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.color,20,10).setHealth(90));
        } 
    }
}

export default Ball;