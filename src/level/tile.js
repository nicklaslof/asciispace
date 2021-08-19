class Tile{

    constructor(x,y,texX,texY,texW,texH) {
        this.x = x;
        this.y = y;
        this.u0 = texX/TZ;
        this.u1 = texY/TZ;
        this.v0 = this.u0 + (texW/TZ);
        this.v1 = this.u1 + (texH/TZ);
        this.col = 0xffff0000;
        this.entities = [];

      //  console.log("added "+x+" "+y);
    }

    render(game){
        game.gl.col = this.col;
        //game.gl.img(game.texture.tex,-this.sizeX/2,-this.sizeY/2,this.sizeX,this.sizeY,this.rotation,x,y,1,1, this.u0, this.u1, this.v0, this.v1);
        game.gl.img(game.texture.tex,0,0,1,1,0,this.x-game.level.range,this.y,24,24, this.u0, this.u1, this.v0, this.v1);

    }

    addEntityToTile(entity){
        this.entities.push(entity);
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