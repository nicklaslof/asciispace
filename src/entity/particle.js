import Entity from "./entity.js";

// A particle. This should probably be optimized to use a Particle pool since we spawn so many of them
class Particle extends Entity{
    constructor(posX, posY, col, movements=true, sizeX=10, sizeY=5, speed=90){
        super(posX,posY,0,0,1,1,col,sizeX,sizeY,"pa");
        this.alphaCounter = 255;
        this.alpha = (col >>> 24) & 0xFF;
        this.red = (col >>> 16) & 0xFF;
        this.green = (col >>>  8) & 0xFF;
        this.blue  = (col >>>  0) & 0xFF;
        this.ttl = 1.5;
        this.speed = speed;
        this.hasLight = true;
        this.lightSize = 8;
        if (movements)
            this.velocity = {x:this.getRandom(-1,1), y: this.getRandom(-1,1)};
        else
            this.velocity = {x:0, y:0};


    }

    tick(game,deltaTime){
        super.tick(game,deltaTime);
        //Countdown for how long the particle should live
        if (this.ttl> 0) this.ttl -= deltaTime;

        if (this.ttl <= 0) this.hit(game,100,true);
        // Calculate the alpha value of the tint to make sure the particles fades out instead of just vanish
        if (this.alphaCounter>0) this.alphaCounter -= (15000*deltaTime)/this.maxHealth;
        this.alphaCounter = Math.max(0,this.alphaCounter);
        // Also increase the size of the particle
        this.sizeX += deltaTime*4;
        this.sizeY += deltaTime*4;
        this.position.x += this.velocity.x*this.speed*deltaTime;
        this.position.y += this.velocity.y*this.speed*deltaTime;

        this.c = (this.alphaCounter & 0xff) << 24 | (this.red & 0xff) << 16 | (this.green & 0xff) << 8 | (this.blue & 0xff);
    }
}

export default Particle;