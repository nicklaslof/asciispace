import CollisionEntity from "./collisionentity.js";
import StaticEntity from "./staticentity.js";

// An entity that blocks the player
class Obstacle extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,0,1,1,0xff0000ff,16,16,"ob");
        this.orginalPosX = posX;
        this.angle = this.getRandom(0,Math.PI);
        this.hasLight = true;
        this.lightColor = 0xff0000ff;
        this.lightSize = 40;
    }
    tick(game, deltaTime){
        super.tick(game, deltaTime);
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);
        // Change the size in a sin wave pattern
        this.angle += deltaTime;   
        var s = Math.sin(this.angle);

        this.sizeX = s*10;
        this.sizeY = s*10;

    }
}

export default Obstacle;