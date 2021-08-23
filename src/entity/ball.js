import EnemyEntity from "./enemyentity.js";

class Ball extends EnemyEntity{
    constructor(posX, posY, count,size,color=0xff00ff00,drops=1) {
        super(posX, posY, 30,6,21,21,color,size,size,"o",drops);
        this.count = -0.52*count;
        this.time = this.time2 = 0;
        this.movementStrength = this.getRandom(1,5);
        this.orginalPositionX = posX;
        this.orginalPositionY = posY;
        this.shootCounter = count/12;
    }
}

export default Ball;