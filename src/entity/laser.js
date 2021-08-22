import Bullet from "./bullet.js"
import Particle from "./particle.js";
class Laser extends Bullet{
    constructor(x,y,range=200,direction={x:1,y:0},damage=1,rotate=0,sizeX=70, sizeY=7,color=0xff00ffff) {
        super(x, y, 0,52,16,12,color,sizeX,sizeY,"b",range,direction,damage);
        this.setCustomCollisionSize(50,50);
        this.rotation = rotate;
    }

    onDispose(game){
        super.onDispose(game);
        for (let index = 0; index < 20; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,20,10).setHealth(90));
        }
    }
}
export default Laser;