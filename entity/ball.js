import Entity from "./entity.js";

class Ball extends Entity{
    constructor(posX, posY, posZ, count) {
        super(posX, posY, posZ, 135*2,21*2,9*2,11*2,false,0xff00ffff);
        this.count = -0.52*count;
        this.time = this.time2 = 0;
    }

    tick(game){
        super.tick(game);
        this.time += 1/10;
        this.time2 += 1/8;
        var sin = Math.sin(this.time+this.count)*10;
        var cos = Math.cos(this.time2+this.count)*3;
        this.position.y -= sin+cos;
        this.position.x -= 2;
    }
}

export default Ball;