import CollisionEntity from "./collisionentity.js";

// Base class for all bullets in the game.
class Bullet extends CollisionEntity{
    constructor(x, y, texX,texY,texW,texH,c,sizeX, sizeY,type, range=200, direction = {x:1,y:0},damage=1) {
        super(x, y, texX,texY,texW,texH,c,sizeX,sizeY,type);
        this.range=range;
        this.direction = direction;
        this.damage = damage;
        this.speed = 1500;
    }

    tick(game,deltaTime){
        // Move the bullet in the direction and make sure to dispose it when it has left the screen or reached it max range
        this.range -=450*deltaTime;
        if (this.range <= 0) this.disposed = true;
        if (this.x > W) this.disposed = true;
        if (this.disposed) return;

        super.tick(game);
        this.position.x += (this.direction.x*this.speed)*deltaTime;
        this.position.y += (this.direction.y*this.speed)*deltaTime;

        if (this.position.x > W){
            this.disposed = true;
        }
    }

    // To make sure an entity doesn't collide with it's own bullet
    setSource(entity){
        this.sourceEntity = entity;
        return this;
    }

    // A bit of mess with the types. Would have used instanceof but I think I had issues with this and minification and uglifying the variables
    // It's called when this bullet collided with an entity
    collidedWith(game, otherEntity){
        if (otherEntity === this.sourceEntity) return;
        if (otherEntity.type == "rg" || otherEntity.type == "rm" || otherEntity.type == "a" || otherEntity.type == "b" || otherEntity.type == "c" || otherEntity.type == "rb" || otherEntity.type == "hp" || otherEntity.type == "sl") return;
        if (this.sourceEntity != game.level.player && (otherEntity.type == "uf" || otherEntity.type == "o" )) return;
        otherEntity.hit(game, this.damage);
        this.skipOnDispose = otherEntity.invincible;
        this.hit(game,1,true);
    }
}
export default Bullet;