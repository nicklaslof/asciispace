import CollisionEntity from "./collisionentity.js";

class Bullet extends CollisionEntity{
    constructor(posX, posY, range=200) {
        super(posX, posY, 0,52,16,12,0xffffffff,50,5,"b");
        this.setCustomCollisionSize(50,50);
        this.range=range;
    }

    tick(game,deltaTime){
        this.range -=450*deltaTime;
        if (this.range <= 0) this.disposed = true;
        if (this.x > W) this.disposed = true;
        if (this.disposed) return;

        super.tick(game);
        this.position.x +=1500*deltaTime;

        if (this.position.x > W){
            this.disposed = true;
        }
    }

    setSource(entity){
        this.sourceEntity = entity;
        return this;
    }

    collidedWith(game, otherEntity){
        if (otherEntity === this.sourceEntity) return;
        if (otherEntity.type == "rg" || otherEntity.type == "rm" || otherEntity.type == "a") return;
        otherEntity.hit(game, 1);
        this.disposed = true;
    }
}
export default Bullet;