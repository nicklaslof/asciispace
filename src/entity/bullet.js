import CollisionEntity from "./collisionentity.js";

class Bullet extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,52,16,12,0xffffffff,50,5,"b");
        this.setCustomCollisionSize(50,40);
    }

    tick(game){
        if (this.disposed) return;
        super.tick(game);
        this.position.x +=30;

        if (this.position.x > W){
            this.disposed = true;
        }
    }

    setSource(entity){
        this.sourceEntity = entity;
        return this;
    }

    collidedWith(game, otherEntity){
        console.log(otherEntity);
        if (otherEntity === this.sourceEntity) return;
        otherEntity.hit(game, 1);
        this.disposed = true;
    }
}
export default Bullet;