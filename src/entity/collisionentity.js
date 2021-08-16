import Entity from "./entity.js";
class CollisionEntity extends Entity{
    constructor(posX, posY, texX,texY,texW,texH,color,sizeX, sizeY, type) {
        super(posX, posY, texX,texY,texW,texH,color,sizeX, sizeY, type);
        this.collisionSizeX = sizeX;
        this.collisionSizeY = sizeY;
    }

    setCustomCollisionSize(sizeX, sizeY){
        this.collisionSizeX = sizeX;
        this.collisionSizeY = sizeY;
    }

    doesCollide(otherEntity){
        if (otherEntity == this || otherEntity.disposed) return;
       
        return (this.position.x - this.collisionSizeX/2 < otherEntity.position.x - otherEntity.sizeX/2 + otherEntity.sizeX &&
            this.position.x - this.collisionSizeX/2 + this.collisionSizeX > otherEntity.position.x - otherEntity.sizeX/2&&
            this.position.y - this.collisionSizeY/2 < otherEntity.position.y - otherEntity.sizeY/2 + otherEntity.sizeY &&
            this.position.y - this.collisionSizeY/2 + this.collisionSizeY > otherEntity.position.y - otherEntity.sizeY/2);
    }

    collidedWith(game, otherEntity){
        
    }
}
export default CollisionEntity;