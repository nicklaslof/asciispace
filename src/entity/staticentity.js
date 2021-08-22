import Entity from "./entity.js";
class StaticEntity extends Entity{
    constructor(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type) {
        super(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type);
        this.staticPosX = posX;
    }

    tick(game, deltaTime){
        super.tick(game, deltaTime);
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);
    }
}
export default StaticEntity;