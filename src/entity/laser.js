import TimedLight from "../light/timedlight.js";
import Bullet from "./bullet.js"
import Particle from "./particle.js";
// A laser shot. Used from both the player and the enemies
class Laser extends Bullet{
    constructor(x,y,range=200,direction={x:1,y:0},damage=1,rotate=0,sizeX=70, sizeY=7,color=0xff00ffff) {
        super(x, y, 0,0,1,1,color,sizeX,sizeY,"b",range,direction,damage);
        this.setCustomCollisionSize(50,50);
        this.rotation = rotate;
        this.hasLight = true;
        this.lightSize = 100;
    }

    onDispose(game){
        game.level.addLight(new TimedLight(this.position.x, this.position.y,0xffffffff,120,120,0.1));
        super.onDispose(game);
    }
}
export default Laser;