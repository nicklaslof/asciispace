class Entity{

    constructor(posX, posY, posZ, texX,texY,texW,texH,color) {
        this.position = {x:posX, y:posY, z:posZ};
        this.previousPosition = {x:posX, y:posY};
        this.u0 = texX/TZ;
        this.u1 = texY/TZ;
        this.v0 = this.u0 + (texW/TZ);
        this.v1 = this.u1 + (texH/TZ);
        this.counter = 0;
        this.color = color;
    }

    tick(game){
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min
    }

    render(game, interpolationOffset){ 
        var x = (this.position.x - this.previousPosition.x) * interpolationOffset + this.previousPosition.x;
        var y = (this.position.y - this.previousPosition.y) * interpolationOffset + this.previousPosition.y;
        var z = this.position.z/200;

        if (z < 0) z = 0;

        game.gl.col = this.color;
        game.gl.img(game.texture.tex,0,0,16,16,0,x,y,z,z, this.u0, this.u1, this.v0, this.v1);
    }
}

export default Entity;