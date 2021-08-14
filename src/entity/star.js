import Entity from "./entity.js";

class Star extends Entity{
    constructor(posX, posY, posZ, speed) {
        super(posX, posY, posZ, 471,20,1,1,false,0xffffffff);
        this.speed = speed;
        this.position.x = this.getRandom(0,WIDTH);
        this.position.y = this.getRandom(0,HEIGHT);
    }

    tick(game){
        super.tick(game);
        this.position.x -= this.speed;
        if (this.position.x < 0){
            this.position.x = this.previousPosition.x = WIDTH;
            this.position.y = this.previousPosition.y = this.getRandom(0,HEIGHT);
        }

    }
}

export default Star;