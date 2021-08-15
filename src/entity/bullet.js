import CollisionEntity from "./collisionentity.js";

class Bullet extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 8,20,1,1,0xffffffff,10,5);
    }

    tick(game){
        if (this.disposed) return;
        super.tick(game);
        this.position.x +=30;

        if (this.position.x > W){
            this.disposed = true;
        }
    }

    collidedWith(otherEntity){
        console.log(otherEntity);
        this.disposed = true;
        otherEntity.disposed = true;
    }
}
export default Bullet;