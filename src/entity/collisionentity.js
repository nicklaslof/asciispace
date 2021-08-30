import Entity from "./entity.js";


// Base class for all entities in the game that can collide with other entities.
class CollisionEntity extends Entity{
    constructor(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type) {
        super(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type);
        this.collisionSizeX = sizeX;
        this.collisionSizeY = sizeY;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);

        // Calculate the current tile for the entity. If it has changed move the entity to that tile instead.
        // The reason for this is to optimize the collision code so only object inside it's own tile are checked against eachother.
        // Not perfect for bigger objects like the solidlaser that is split into multiple entities becuase of this.

        var newTilePosX = Math.max(0,Math.floor((this.position.x + game.level.levelPositionX)/24));
        var newTilePosY = Math.floor((this.position.y+8)/29);


        if (newTilePosX != this.tilePosition.x || newTilePosY != this.tilePosition.y){
            game.level.removeEntityFromTile(this, this.tilePosition.x, this.tilePosition.y);
            game.level.addEntityToTile(game, this, newTilePosX, newTilePosY);
        }

        this.tilePosition.x = newTilePosX;
        this.tilePosition.y = newTilePosY;
    }

    setCustomCollisionSize(sizeX, sizeY){
        this.collisionSizeX = sizeX;
        this.collisionSizeY = sizeY;
    }

    // Does a AABB collision check against the other entitiy. If it's ourselfs or other entitiy is disposed just skip it.
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