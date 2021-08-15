import Entity from "./entity.js";
class CollisionEntity extends Entity{
    constructor(posX, posY, texX,texY,texW,texH,color,sizeX, sizeY) {
        super(posX, posY, texX,texY,texW,texH,color,sizeX, sizeY);
    }

    doesCollide(otherEntity){
        if (otherEntity == this || otherEntity.disposed) return;
       
        return (this.position.x - this.sizeX/2 < otherEntity.position.x - otherEntity.sizeX/2 + otherEntity.sizeX &&
            this.position.x - this.sizeX/2 + this.sizeX > otherEntity.position.x - otherEntity.sizeX/2&&
            this.position.y - this.sizeY/2 < otherEntity.position.y - otherEntity.sizeY/2 + otherEntity.sizeY &&
            this.position.y - this.sizeY/2 + this.sizeY > otherEntity.position.y - otherEntity.sizeY/2);
    }

    collidedWith(otherEntity){
        
    }
}
export default CollisionEntity;