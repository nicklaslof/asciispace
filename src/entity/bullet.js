import CollisionEntity from "./collisionentity.js";

class Bullet extends CollisionEntity{
    constructor(x, y, texX,texY,texW,texH,c,sizeX, sizeY,type, range=200, direction = {x:1,y:0},damage=1) {
        super(x, y, texX,texY,texW,texH,c,sizeX,sizeY,type);
        this.range=range;
        this.direction = direction;
        this.damage = damage;
    }

    tick(game,deltaTime){
        this.range -=450*deltaTime;
        if (this.range <= 0) this.disposed = true;
        if (this.x > W) this.disposed = true;
        if (this.disposed) return;

        super.tick(game);
        this.position.x += (this.direction.x*1500)*deltaTime;
        this.position.y += (this.direction.y*1500)*deltaTime;

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
        if (otherEntity.type == "rg" || otherEntity.type == "rm" || otherEntity.type == "a" || otherEntity.type == "b" || otherEntity.type == "c" || otherEntity.type == "rb") return;
        if (this.sourceEntity != game.level.player && (otherEntity.type == "uf" || otherEntity.type == "o" )) return;
        otherEntity.hit(game, this.damage);
        this.hit(game,1,true);
    }
}
export default Bullet;