import Entity from "./entity.js";
// A small siren as light decoration
class Siren extends Entity{
    constructor(posX, posY) {
        super(posX,posY,250,36,14,24,0xff00ff00,12,24,"si");
        if (posY>(H/2)){
            this.rotation = -Math.PI/2;
            this.position.y += 8;
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
        this.alpha = 255;
        this.red = 0;
        this.green = 255;
    }

    tick(game, deltaTime){
        super.tick(game, deltaTime);
        this.counter += deltaTime;
        
        if (this.initialLevelPositionX == null) this.initialLevelPositionX = game.level.levelPositionX;
        this.position.x = this.orginalPosX + (this.initialLevelPositionX-game.level.levelPositionX);

        let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
        let dist = this.distance(this.position, playerPos);
        if (dist < 300){
            this.red = 255;
            this.green = 0;
            this.light.c = 0xff0000ff;
        }


        var lightSize = Math.sin(this.counter*5)*4;
        this.alpha -= lightSize*2;
        this.alpha = Math.min(255,this.alpha);
        this.light.sizeX -= lightSize;
        this.light.sizeY -= lightSize;
        this.c = (this.alpha & 0xff) << 24 | (0 & 0xff) << 16 | (this.green & 0xff) << 8 | (this.red & 0xff);
    }

}

export default Siren;