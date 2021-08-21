import Bullet from "./bullet.js"
class Laser extends Bullet{
    constructor(x,y,range=200,direction={x:1,y:0}) {
        super(x, y, 0,52,16,12,0xffffffff,50,5,"b");
        this.setCustomCollisionSize(50,50);
    }
}
export default Laser;