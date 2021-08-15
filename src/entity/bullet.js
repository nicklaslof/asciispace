import CollisionEntity from "./collisionentity.js";

class Bullet extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 471,20,1,1,0xffffffff,32,32);
    }

    tick(game){
        if (this.disposed) return;
        super.tick(game);
        this.position.x +=30;

        if (this.position.x > W){
            this.disposed = true;
        }
    }
}
export default Bullet;