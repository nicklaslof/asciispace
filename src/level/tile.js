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
        /*game.gl.img(game.texture.tex,0,0,1,1,0,this.x-game.level.levelPositionX,this.y+12,12,12, this.u0, this.u1, this.v0, this.v1);

        game.gl.img(game.texture.tex,0,0,1,1,0,this.x-game.level.levelPositionX+12,this.y,12,12, this.u0, this.u1, this.v0, this.v1);
        game.gl.img(game.texture.tex,0,0,1,1,0,this.x-game.level.ralevelPositionXnge+12,this.y+12,12,12, this.u0, this.u1, this.v0, this.v1);*/

    }

    addEntityToTile(game,entity){
        this.entities.push(entity);
        if (entity.type == "rb" || (entity.type == "b" && !(entity.sourceEntity != null && entity.sourceEntity.type == "o"))) entity.hit(game,1,true);
        if (entity.type == "p") entity.hit(game,1,false);
    }

    removeEntityFromTile(entity){
        for(let i = this.entities.length - 1; i >= 0; i--) {
            if(this.entities[i] === entity) {
                this.entities.splice(i, 1);
            }
        }
    }

    checkCollision(game, e){
        //console.log(e);
        this.entities.forEach(oe => {
            if (e.disposed || oe.disposed || e.type == "pa" || oe.type == "pa") return;
            if (e.doesCollide(oe)){
                e.collidedWith(game, oe);
            }
        });
    }
}
export default Tile;