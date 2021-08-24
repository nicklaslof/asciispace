import CollisionEntity from "./collisionentity.js";
import StaticEntity from "./staticentity.js";

class Obstacle extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 250,130,1,1,0xff0000ff,16,16,"s");
        this.orginalPosX = posX;
        this.angle = this.getRandom(0,Math.PI);
    }
    tick(game, deltaTime){
        super.tick(game, deltaTime);
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);

        this.angle += deltaTime;   
        var s = Math.sin(this.angle);

        this.sizeX = s*10;
        this.sizeY = s*10;

    }
}

export default Obstacle;