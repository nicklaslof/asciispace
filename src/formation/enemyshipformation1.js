import EnemyShip1 from "../entity/enemyship1.js";
import Formation from "./formation.js";

class EnemyShipFormation1 extends Formation{
    constructor(level) {
        super(level);
    }

    execute(){
        super.execute();
        var x = W+100;
        var y = H/2;
        for (let index = 0; index < 16; index++) {
            this.addEntity(new EnemyShip1(x + 96*index,y,index,0xff0000ff));
        }
    }

    handleEntity(game, entity){
        entity.position.x -= 7;
        if (entity.position.x < (W/2)+200){
            if (entity.instanceCount%2 == 1){
                if (entity.position.y < H-192){
                    entity.position.y += 10;
                }
            }
            else{
                if (entity.position.y > 192){
                    entity.position.y -= 10;
                }
            }
        }
        
    }
}
export default EnemyShipFormation1;