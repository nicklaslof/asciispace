import Ball from "../entity/ball.js";
import NonstaticObstacle from "../entity/nonstaticobstacle.js";
import Formation from "./formation.js";

class FastBallsFormation extends Formation{

    constructor(level) {
        super(level);
        this.execute();
    }

    execute(){
        super.execute();
        for (let index = 0; index < 6; index++) {
            var x = W + (48 * index);
            var y = 150 + (48 * index);
            this.addEntity(new NonstaticObstacle(x,y,0xff2222ff,32,32).setHealth(10));
        }

        for (let index = 0; index < 6; index++) {
            var x = W + 1500 + (48 * index);
            var y = 400 - (48 * index);
            this.addEntity(new NonstaticObstacle(x,y,0xff2222ff,32,32).setHealth(10));
        }
    }
    handleEntity(game, entity, deltaTime){
        entity.position.x -= 500*deltaTime;
    }

}

export default FastBallsFormation;