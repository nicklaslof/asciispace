import Entity  from "./entity.js";
import Laser from "./laser.js";
class Drone extends Entity{
    constructor(posX, posY,startAngle) {
        super(posX, posY, 30,6,21,21,0xffd500ff,24, 16, "d");
        this.angle = startAngle;
        this.orginalPositionX = posX;
        this.orginalPositionY = posY;
        console.log("angle:"+this.angle);
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        this.angle += deltaTime*2;

        var y = (Math.sin(this.angle*3.14) * 48) + game.level.player.position.y;
        var x = (Math.cos(this.angle*3.14) * 48) + game.level.player.position.x;

        this.position.x = x;
        this.position.y = y;
    }

    shoot(game,source,shootRange,laserStrength){
        game.playDroneShoot();
        game.level.addEntity(new Laser(this.position.x+16, this.position.y,shootRange,{x:1,y:0},laserStrength,0,35,4,this.c).setSource(source));
    }

    hit(game,h,force){

    }
}

export default Drone;