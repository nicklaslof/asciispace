import CollisionEntity from "./collisionentity.js";
import StaticEntity from "./staticentity.js";

class Obstacle extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 250,130,1,1,0xff0000ff,16,16,"s");
        this.orginalPosX = posX;
    }
    tick(game, deltaTime){
        super.tick(game, deltaTime);
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);
    }
}

export default Obstacle;