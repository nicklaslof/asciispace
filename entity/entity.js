class Entity{

    constructor(posX, posY, posZ, texX,texY,texW,texH,perspective,color) {
        this.position = {x:posX, y:posY, z:posZ};
        this.previousPosition = {x:posX, y:posY};
        this.u0 = texX/TEXTURE_SIZE;
        this.u1 = texY/TEXTURE_SIZE;
        this.v0 = this.u0 + (texW/TEXTURE_SIZE);
        this.v1 = this.u1 + (texH/TEXTURE_SIZE);
        this.counter = 0;
        this.perspective = perspective;
        this.color = color;
    }

    tick(game){
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    render(game, interpolationOffset){
        var zz;
        var x;
        var y;
        if (this.perspective){
            zz = FOV/this.position.z
            x = this.position.x * zz + WIDTH/2.0;
            y = this.position.y * zz + HEIGHT/2.0;
        }else{
            zz = this.position.z/FOV;
            x = this.position.x;
            y = this.position.y;
            if (zz < 0) zz = 0;
        }
        
        x = (this.position.x - this.previousPosition.x) * interpolationOffset + this.previousPosition.x;
        y = (this.position.y - this.previousPosition.y) * interpolationOffset + this.previousPosition.y;
        game.gl.col = this.color;
        game.gl.img(game.texture.tex,0,0,16,16,0,x,y,zz,zz, this.u0, this.u1, this.v0, this.v1);
    }
}

export default Entity;