import EnemyEntity from "./enemyentity.js";

class EnemyShip1 extends EnemyEntity{
    constructor(posX, posY,instanceCount,color) {
        super(posX, posY, 0,4,18,18,color,48,32,"s");
        this.rotation = -Math.PI;
        this.instanceCount = instanceCount;
    }
}

export default EnemyShip1;