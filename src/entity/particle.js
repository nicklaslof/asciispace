import Entity from "./entity.js";

class Particle extends Entity{
    constructor(posX, posY, col, movements=true, sizeX=10, sizeY=5){
        super(posX,posY,0,52,16,12,col,sizeX,sizeY,"pa");
        this.alphaCounter = 255;
        this.alpha = (col >>> 24) & 0xFF;
        this.red = (col >>> 16) & 0xFF;
        this.green = (col >>>  8) & 0xFF;
        this.blue  = (col >>>  0) & 0xFF;
        if (movements)
            this.velocity = {x:this.getRandom(-1,1), y: this.getRandom(-1,1)};
        else
            this.velocity = {x:0, y:0};


    }

    tick(game){
        super.tick(game);
        this.hit(game,1,true);
        this.alphaCounter -= 255/this.maxHealth;
        this.sizeX += 0.5;
        this.sizeY += 0.5;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.color = (this.alphaCounter & 0xff) << 24 | (this.red & 0xff) << 16 | (this.green & 0xff) << 8 | (this.blue & 0xff);
    }
}

export default Particle;