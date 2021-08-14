import Entity from "./entity.js";

class Ball extends Entity{
    constructor(posX, posY, posZ, count) {
        super(posX, posY, posZ, 135*2,21*2,9*2,11*2,false);
        this.count = -0.52*count;
        this.time = 0
    }

    tick(){
        super.tick();
        this.time += 1/10;
        var cos = Math.sin(this.time+this.count)*5;
        this.position.y -= cos;
        this.position.x -= 0.5;
        this.position.z -= Math.sin((this.time+this.count)/2);

    }
}

export default Ball;