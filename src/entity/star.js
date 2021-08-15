import Entity from "./entity.js";

class Star extends Entity{
    constructor(posX, posY, speed) {
        super(posX, posY, 471,20,1,1,0xffffffff,1,1);
        this.speed = speed;
        this.position.x = this.getRandom(0,W);
        this.position.y = this.getRandom(0,H);
    }

    tick(game){
        super.tick(game);
        this.position.x -= this.speed;
        if (this.position.x < 0){
            this.position.x = this.previousPosition.x = W;
            this.position.y = this.previousPosition.y = this.getRandom(0,H);
        }

    }
}

export default Star;