import EnemyEntity from "./enemyentity.js";

class EnemyShip1 extends EnemyEntity{
    constructor(posX, posY,instanceCount) {
        super(posX, posY, 0,4,18,18,0xff0000ff,48,32,"s");
        this.rotation = -Math.PI;
        this.instanceCount = instanceCount;
    }

    tick(game){
        super.tick(game);
    }
}

export default EnemyShip1;