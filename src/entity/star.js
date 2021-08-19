import Entity from "./entity.js";

class Star extends Entity{
    constructor(posX, posY, speed) {
        super(posX, posY, 8,57,1,1,0xffffffff,speed/90,speed/90);
        this.speed = speed;
        this.position.x = this.previousPosition.x = this.getRandom(0,W);
        this.position.y = this.previousPosition.y = this.getRandom(-100,H+100);
        //this.c = 0xffffffff/speed*50;
    }

    tick(game, offsetX, offsetY, deltaTime){
        super.tick(game, deltaTime);
        this.position.x -= this.speed * deltaTime;
        this.position.x += offsetX*(this.speed*5)*deltaTime;
        this.position.y += offsetY*(this.speed*5)*deltaTime;
        if (this.position.x < 0){
            this.position.x = this.previousPosition.x = W;
            this.position.y = this.previousPosition.y = this.getRandom(-100,H+100);
        }

    }
}

export default Star;