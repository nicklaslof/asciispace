import SineballFormation from "./sineballformation.js";
import Laser from "../entity/laser.js";
class SineballFormation2 extends SineballFormation{

    constructor(level) {
        super(level);
    }

    execute(){
        super.execute();
    }

    handleEntity(game, entity, deltaTime){
        super.handleEntity(game, entity, deltaTime);
        entity.shootCounter += deltaTime;
        if (entity.shootCounter > 2.5){
            this.level.addEntity(new Laser(entity.position.x, entity.position.y,400,{x:-1,y:0},1).setSource(entity));
            game.playShoot2();
            entity.shootCounter = 0;
        }
    }
}

export default SineballFormation2;