import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
class Resource extends CollisionEntity{

    constructor(posX, posY, c, type) {
        super(posX, posY,0,52,16,12,c,32,32,type);
        this.velocity = {x: this.getRandom(-0.1,0.1), y: this.getRandom(-0.1,0.1)};
        this.particleDelay = 0;
    }

    tick(game,deltaTime){
        this.particleDelay -= deltaTime;
        if (this.particleDelay < 0) this.particleDelay = 0;

        let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
        let dist = this.distance(this.position, playerPos);
        if (dist < 500){
            let velocity = {x:playerPos.x - this.position.x, y: playerPos.y - this.position.y};
            this.normalize(velocity);
            this.position.x += velocity.x*50*deltaTime*(500/dist);
            this.position.y += velocity.y*50*deltaTime*(500/dist);
            super.tick(game,deltaTime);
        }else{
            this.position.x += this.velocity.x*50*deltaTime;
            this.position.y += this.velocity.y*50*deltaTime;
        }

        if (this.particleDelay == 0){
            if (Math.floor(this.getRandom(0,4))==1)
                game.level.addEntity(new Particle(this.getRandom(this.position.x-10,this.position.x+10), this.getRandom(this.position.y-10, this.position.y+10),this.c,true,8,1).setHealth(40));
            this.particleDelay = 0.01;
        }



    }

}
export default Resource;