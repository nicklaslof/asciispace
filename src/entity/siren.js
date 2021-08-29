import Entity from "./entity.js";

class Siren extends Entity{
    constructor(posX, posY) {
        super(posX,posY,250,36,14,24,0xff00ff00,12,24,"si");
        if (posY>(H/2)){
            this.rotation = -Math.PI/2;
            this.position.y += 5;
        } 
        else{
            this.rotation = Math.PI/2;
            this.position.y -= 5;
        } 
        this.hasLight = true;
        this.lightColor = this.c;
        this.lightSize = 120;
        this.orginalPosX = posX;
        this.counter = 0;
        this.alpha = (0xff00ff00 >>> 24) & 0xFF;
        this.red = (0xff00ff00 >>> 16) & 0xFF;
        this.green = (0x00ff00 >>>  8) & 0xFF;
        this.blue  = (0x00ff00 >>>  0) & 0xFF;
    }

    tick(game, deltaTime){
        super.tick(game, deltaTime);
        this.counter += deltaTime;
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);
        var lightSize = Math.sin(this.counter*5)*4;
        this.alpha -= lightSize*2;
        this.alpha = Math.min(255,this.alpha);
        this.light.sizeX -= lightSize;
        this.light.sizeY -= lightSize;
        this.c = (this.alpha & 0xff) << 24 | (this.red & 0xff) << 16 | (this.green & 0xff) << 8 | (this.blue & 0xff);
    }

}

export default Siren;