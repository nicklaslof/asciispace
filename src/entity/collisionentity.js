import Entity from "./entity.js";
class CollisionEntity extends Entity{
    constructor(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type) {
        super(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type);
        this.collisionSizeX = sizeX;
        this.collisionSizeY = sizeY;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        var newTilePosX = Math.floor((this.position.x + game.level.levelPositionX)/24);
        var newTilePosY = Math.floor(this.position.y/29);

        if (newTilePosX != this.tilePosition.x || newTilePosY != this.tilePosition.y){
            game.level.removeEntityFromTile(this, this.tilePosition.x, this.tilePosition.y);
            game.level.addEntityToTile(this, newTilePosX, newTilePosY);
        }

        this.tilePosition.x = newTilePosX;
        this.tilePosition.y = newTilePosY;
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