class Entity{

    constructor(posX, posY, texX,texY,texW,texH,color,sizeX, sizeY) {
        this.position = {x:posX, y:posY};
        this.previousPosition = {x:posX, y:posY};
        this.u0 = texX/TZ;
        this.u1 = texY/TZ;
        this.v0 = this.u0 + (texW/TZ);
        this.v1 = this.u1 + (texH/TZ);
        this.counter = 0;
        this.color = color;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.rotation = 0;
    }

    tick(game){
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min
    }

    translate(x,y){
        this.position.x += x;
        this.position.y += y;
    }

    render(game, interpolationOffset){ 
        var x = (this.position.x - this.previousPosition.x) * interpolationOffset + this.previousPosition.x;
        var y = (this.position.y - this.previousPosition.y) * interpolationOffset + this.previousPosition.y;

        game.gl.col = this.color;
        game.gl.img(game.texture.tex,-this.sizeX/2,-this.sizeY/2,this.sizeX,this.sizeY,this.rotation,x,y,1,1, this.u0, this.u1, this.v0, this.v1);
    }
}

export default Entity;