import Entity from "./entity.js";

// The background stars. When they have reached the end of the screen they just get a new y-location
class Star extends Entity{
    constructor(posX, posY, speed) {
        super(posX, posY, 0,0,1,1,0xffffffff,speed/50,speed/50);
        this.speed = speed;
        this.position.x = this.getRandom(0,W);
        this.position.y = this.getRandom(-100,H+100);
    }

    tick(game, offsetX, offsetY, deltaTime){
        super.tick(game, deltaTime);
        this.position.x -= this.speed * deltaTime;
        this.position.x += offsetX*(this.speed*5)*deltaTime;
        this.position.y += offsetY*(this.speed*5)*deltaTime;
        if (this.position.x < 0){
            this.position.x = W;
            this.position.y = this.getRandom(-100,H+100);
        }

    }
}

export default Star;