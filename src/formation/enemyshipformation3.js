import EnemyShip1 from "../entity/enemyship1.js";
import Formation from "./formation.js";

class EnemyShipFormation3 extends Formation{
    constructor(level) {
        super(level);
        this.xSpeed = 600;
        this.ySpeed = 200;
        this.execute();

    }

    execute(){
        super.execute();
        var x = W+100;
        var y = (H/2)-200;
        for (let index = 0; index < 8; index++) {
            this.addEntity(new EnemyShip1(x + 96*index,y,index, 0xffff5555,true));
        }
        x = W+800;
        y = (H/2)+50;
        for (let index = 0; index < 8; index++) {
            this.addEntity(new EnemyShip1(x + 96*index,y,index, 0xffff5555,false));
        }
    }

    // Move each entity and when it has reached a certain part of the screen change the direction of the entity and move back again
    handleEntity(game, entity, deltaTime){
        if (!entity.turnDown && !entity.turnAround) entity.position.x -= this.xSpeed*deltaTime;

        if (entity.position.x < 200) entity.turnDown = true;

        if (entity.turnDown){
            if (entity.upper) entity.position.y += this.ySpeed*deltaTime;
            else entity.position.y -= this.ySpeed*deltaTime;
        }

        if (entity.upper){
            if (entity.turnDown && entity.position.y > (H/2)-140){
                entity.turnAround = true;
                entity.turnDown = false;
            } 
        }else{
            if (entity.turnDown && entity.position.y <= (H/2)-100){
                entity.turnAround = true;
                entity.turnDown = false;
            } 
        }

        if (entity.turnDown){
            if (entity.upper) entity.rotation -= deltaTime*(Math.PI*3.6);
            else entity.rotation += deltaTime*(Math.PI*1.35);
        }

        if (entity.turnAround){
            if (entity.rotation != Math.PI*2) entity.rotation = Math.PI*2;
        }

        

        if (entity.turnAround) entity.position.x += this.xSpeed*deltaTime;
    }
}
export default EnemyShipFormation3;