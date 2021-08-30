import Entity  from "./entity.js";
import Laser from "./laser.js";

// The drone the player can have as an upgrade
class Drone extends Entity{
    constructor(posX, posY,startAngle,count) {
        super(posX, posY, 30,6,21,21,0xffd500ff,24, 16, "d");
        this.angle = startAngle;
        this.orginalPositionX = posX;
        this.orginalPositionY = posY;
        this.count = count;
        this.shootTimer = 0.3*count;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        this.angle += deltaTime*2;

        // Circulate around the player with a distance of 48
        var y = (Math.sin(this.angle*3.14) * 48) + game.level.player.position.y;
        var x = (Math.cos(this.angle*3.14) * 48) + game.level.player.position.x-6;

        this.position.x = x;
        this.position.y = y;
    }

    shoot(game,source,shootRange,laserStrength){
        game.level.addEntity(new Laser(this.position.x+16, this.position.y,shootRange,{x:1,y:0},laserStrength,0,35,4,this.c).setSource(source));
    }

    // If the drone gets hit don't do anything
    hit(game,h,force){

    }
}

export default Drone;