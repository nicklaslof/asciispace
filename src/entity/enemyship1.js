import CollisionEntity from "./collisionentity.js";

class EnemyShip1 extends CollisionEntity{
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