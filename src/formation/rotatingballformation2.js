import Ball from "../entity/ball.js";
import Laser from "../entity/laser.js";
import RotatingBallFormation from "./rotatingballformation.js";

// Same as RotatingBallFormation but shoots laser
class RotatingBallFormation2 extends RotatingBallFormation{
    constructor(level,y) {
       super(level,y);
       this.distance = 70;
       this.xSpeed = 12;
    }

    handleEntity(game, entity, deltaTime){
        super.handleEntity(game,entity,deltaTime);
        entity.shootCounter += deltaTime;

        if (entity.shootCounter > 2.5){
            this.level.addEntity(new Laser(entity.position.x, entity.position.y,400,{x:-1,y:0},2));
            game.playShoot2();
            entity.shootCounter = 0;
        }
    }
}
export default RotatingBallFormation2;