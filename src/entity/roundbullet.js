import Bullet from "./bullet.js"
import Particle  from "./particle.js";
import TimedLight from "../light/timedlight.js";
import Light from "../light/light.js";
// A round bullet that some enemies shoots
class RoundBullet extends Bullet{
    constructor(posX,posY,range=200,direction={x:1,y:0}) {
        super(posX, posY, 30,6,21,21,0xff0000ff,16,16,"rb",range,direction);
        this.hasLight = true;
        this.lightColor = 0xffaaaaaa;
        this.lightSize = 50;
    }

    tick(game, deltaTime){
        super.tick(game, deltaTime);
        this.shootCounter += deltaTime;

        if (this.shootCounter >= 2){
            this.shootCounter = 0;
            game.level.addEntity(new Bullet(this.position.x, this.position.y,200,{x:0,y:1}));
        }

        this.position.x -= deltaTime*75;
    }

    onDispose(game){
        super.onDispose(game);
        // When hitting something spawn a light source with short life
        game.level.addLight(new TimedLight(this.position.x, this.position.y,0xffffffff,40,40,0.1));
        for (let index = 0; index < 20; index++) {
            game.level.addParticle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,true,2,2,90,90);
        }
        game.level.removeLight(this.light);
        game.playExplosion();   
    }

    collidedWith(game, otherEntity){
        if (otherEntity === this.sourceEntity) return;
        if (otherEntity.type == "rg" || otherEntity.type == "rm" || otherEntity.type == "a" || otherEntity.type == "o" || otherEntity.type == "s" || otherEntity.type == "rb" || otherEntity.type == "b" || otherEntity.type == "sl") return;
        otherEntity.hit(game, 1);
        this.hit(game,1,true);
    }
}

export default RoundBullet;