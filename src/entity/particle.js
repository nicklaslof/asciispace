import Entity from "./entity.js";

class Particle extends Entity{
    constructor(posX, posY, col){
        super(posX,posY,5,17,9,9,col,10,5,"pa");
        this.alphaCounter = 255;
        this.alpha = (col >>> 24) & 0xFF;
        this.red = (col >>> 16) & 0xFF;
        this.green = (col >>>  8) & 0xFF;
        this.blue  = (col >>>  0) & 0xFF;
    }

    tick(game){
        super.tick(game);
        this.hit(game,1);
        this.alphaCounter -= 255/this.maxHealth;
        this.sizeX += 0.5;
        this.sizeY += 0.5;

        this.color = (this.alphaCounter & 0xff) << 24 | (this.red & 0xff) << 16 | (this.green & 0xff) << 8 | (this.blue & 0xff);
    }
}

export default Particle;