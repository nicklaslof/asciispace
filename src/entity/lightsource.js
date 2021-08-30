import StaticEntity from "./staticentity.js";

// A single light source object placed around in various places to lighten up the level
class LightSource extends StaticEntity{

    constructor(posX,posY,c) {
        super(posX,posY,30,6,21,21,c,24,12);
        this.hasLight = true;
        this.lightColor = c;
        this.orginalPosX = posX;
        if (posY>(H/2)){
            this.position.y += 10;
        } 
        else{
            this.position.y -= 10;
        } 
    }
    tick(game, deltaTime){
        super.tick(game, deltaTime);
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);
    }
}
export default LightSource;