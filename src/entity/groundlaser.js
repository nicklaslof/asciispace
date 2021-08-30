import RoundBullet from "./roundbullet.js";
import StaticEntity from "./staticentity.js";
import Laser from "./laser.js";
import SolidLaser from "./solidlaser.js";
// A laser shooting from the ceiling to the floor
class GroundLaser extends StaticEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,318,24,58,0xff333333,24,48,"gs");
        this.orginalPosX = posX;
        this.rotation = Math.PI;
        this.fireTimer = 2;
        this.sl = [];
    }

    tick(game, deltaTime){
       super.tick(game,deltaTime);

        this.fireTimer -= deltaTime;

        if (this.fireTimer <= 1){
            this.sl.forEach(sl => {
                sl.disposed = true;
            });
        }

        if (this.fireTimer <= 0){
            // Because collisions are optimized to only check for current tile we need to add multiple objects
            for (let i = 0; i < 3; i++) {
                var sl = new SolidLaser(this.position.x+2, this.position.y +75 + (80*i),10,100,0xff00ffff);
                sl.invincible = true;
                game.level.addEntity(sl);
                this.sl.push(sl);
            }

            game.playLaser();
            this.fireTimer = 2;
        }

    }
    
}
export default GroundLaser;