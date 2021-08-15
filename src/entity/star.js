import Entity from "./entity.js";

class Star extends Entity{
    constructor(posX, posY, speed) {
        super(posX, posY, 8,20,1,1,0xffffffff,speed,speed);
        this.speed = speed;
        this.position.x = this.getRandom(0,W);
        this.position.y = this.getRandom(-100,H+100);
        this.color = 0xffffffff/speed*50;
    }

    tick(game, offsetX, offsetY){
        super.tick(game);
        this.position.x -= this.speed;
        this.position.x += offsetX*(this.speed*5);
        this.position.y += offsetY*(this.speed*5);
        if (this.position.x < 0){
            this.position.x = this.previousPosition.x = W;
            this.position.y = this.previousPosition.y = this.getRandom(-100,H+100);
        }

    }
}

export default Star;