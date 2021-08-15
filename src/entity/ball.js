import CollisionEntity from "./collisionentity.js";

class Ball extends CollisionEntity{
    constructor(posX, posY, count) {
        super(posX, posY, 135*2,21*2,9*2,11*2,0xff00ffff,64,64);
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