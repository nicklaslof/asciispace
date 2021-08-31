import Particle from "../entity/particle.js";
// A tile is used for two things. To render ground and other static leveldata. It's also used to have a collection of entities to speed up collision checking between entities close to eachother
class Tile{

    constructor(x,y,texX,texY,texW,texH,col) {
        this.x = x;
        this.y = y;
        this.u0 = texX/TZ;
        this.u1 = texY/TZ;
        this.v0 = this.u0 + (texW/TZ);
        this.v1 = this.u1 + (texH/TZ);
        this.col = col;
        this.entities = [];
    }

    render(game){
        game.gl.col = this.col;
        game.gl.img(game.texture.tex,0,0,1,1,0,this.x-game.level.levelPositionX,this.y,24,24, this.u0, this.u1, this.v0, this.v1);
    }

    // Adds an entity to this tile so it can be used for collision checking. If the entity is not allowed on the tile to a hit one the entity and show particles
    addEntityToTile(game,entity){
        this.entities.push(entity);
        if (entity.type == "rb" || (entity.type == "b" && !(entity.sourceEntity != null && entity.sourceEntity.type == "o"))) entity.hit(game,1,true);
        if (entity.type == "p"){
            entity.hit(game,1,false,0.1);
        } 
        if (entity.type == "b") {
            for (let index = 0; index < 20; index++) {
                game.level.addParticle(entity.getRandom(entity.position.x-20/entity.maxHealth,entity.position.x+20/entity.maxHealth), entity.getRandom(entity.position.y-20/entity.maxHealth, entity.position.y+20/entity.maxHealth),entity.c,true,3,3,90,90);
            }
        }
    }

    removeEntityFromTile(entity){
        for(let i = this.entities.length - 1; i >= 0; i--) {
            if(this.entities[i] === entity) {
                this.entities.splice(i, 1);
            }
        }
    }
    // Loop trough all entites in this tile and perform a collision check on them. Skip any particles since they don't have collitions
    checkCollision(game, e){
        this.entities.forEach(oe => {
            if (e.disposed || oe.disposed || e.type == "pa" || oe.type == "pa") return;
            if (e.doesCollide(oe)){
                e.collidedWith(game, oe);
            }
        });
    }
}
export default Tile;