import EnemyEntity from "./enemyentity.js";

class Ball extends EnemyEntity{
    constructor(posX, posY, count,size) {
        super(posX, posY, 30,6,21,21,0xff00ff00,size,size,"o");
        this.count = -0.52*count;
        this.time = this.time2 = 0;
        this.movementStrength = this.getRandom(1,5);
    }
}

export default Ball;