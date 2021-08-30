import EnemyShip1 from "../entity/enemyship1.js";
import Formation from "./formation.js";

class EnemyShipFormation1 extends Formation{
    constructor(level) {
        super(level);
        this.xSpeed = 400;
        this.ySpeed = 300;
        this.execute();
    }

    execute(){
        super.execute();
        var x = W+100;
        var y = H/2;
        for (let index = 0; index < 16; index++) {
            this.addEntity(new EnemyShip1(x + 96*index,y,index,0xff0000ff));
        }
    }

    // Move each entity and split them into two paths when they have reached a bit into the screen
    handleEntity(game, entity, deltaTime){
        entity.position.x -= this.xSpeed*deltaTime;
        if (entity.position.x < (W/2)+200){
            if (entity.instanceCount%2 == 1){
                if (entity.position.y < H-64){
                    entity.position.y += this.ySpeed*deltaTime;
                }
            }
            else{
                if (entity.position.y > 64){
                    entity.position.y -= this.ySpeed*deltaTime;
                }
            }
        }
        
    }
}
export default EnemyShipFormation1;