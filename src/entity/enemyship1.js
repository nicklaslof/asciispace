import EnemyEntity from "./enemyentity.js";

// An enemy ship. Used in some of the early formations
class EnemyShip1 extends EnemyEntity{
    constructor(posX, posY,instanceCount,color,upper=true) {
        super(posX, posY, 0,4,18,18,color,48,32,"s");
        this.rotation = -Math.PI;
        this.instanceCount = instanceCount;
        this.turnDown = this.turnAround = false;
        this.angle = -Math.PI;
        this.upper = upper;
    }
}

export default EnemyShip1;