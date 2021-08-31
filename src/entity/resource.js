import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";

// The resoucres the player picks up. It's the same for both metal and mineral. The only difference is the type and the color
class Resource extends CollisionEntity{

    constructor(posX, posY, c, type) {
        super(posX, posY,128,36,16,24,c,16,16,type);
        this.velocity = {x: this.getRandom(-0.6,0.6), y: this.getRandom(-0.6,0.6)};
        this.particleDelay = 0;
        this.hasLight = true;
        this.lightColor = c;
        this.lightSize = 30;
    }

    tick(game,deltaTime){
        this.particleDelay -= deltaTime;
        if (this.particleDelay < 0) this.particleDelay = 0;

        // Move against the player if close. The closer the faster.
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
                game.level.addParticle(this.getRandom(this.position.x-10,this.position.x+10), this.getRandom(this.position.y-10, this.position.y+10),this.c,true,2,2,20,40);
            this.particleDelay = 0.01;
        }



    }

}
export default Resource;