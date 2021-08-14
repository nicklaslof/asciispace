class Entity{

    constructor(posX, posY, posZ, texX,texY,texW,texH,perspective) {
        this.position = {x:posX, y:posY, z:posZ};
        this.u0 = texX/TEXTURE_SIZE;
        this.u1 = texY/TEXTURE_SIZE;
        this.v0 = this.u0 + (texW/TEXTURE_SIZE);
        this.v1 = this.u1 + (texH/TEXTURE_SIZE);
        this.counter = 0;
        this.perspective = perspective;
    }

    tick(game){
       
    }

    render(game){
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
        

        game.gl.img(game.texture.tex,0,0,16,16,0,x,y,zz,zz, this.u0, this.u1, this.v0, this.v1);
    }
}

export default Entity;