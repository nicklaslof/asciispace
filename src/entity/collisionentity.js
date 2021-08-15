import Entity from "./entity.js";
class CollisionEntity extends Entity{
    constructor(posX, posY, texX,texY,texW,texH,color,sizeX, sizeY) {
        super(posX, posY, texX,texY,texW,texH,color,sizeX, sizeY);
    }

    doesCollide(otherEntity){
        if (otherEntity == this) return;
       
        return (this.position.x < otherEntity.position.x + otherEntity.sizeX &&
            this.position.x + this.sizeX > otherEntity.position.x &&
            this.position.y < otherEntity.position.y + otherEntity.sizeY &&
            this.position.y + this.sizeY > otherEntity.position.y);
    }
}
export default CollisionEntity;