import Bullet from "./bullet.js"
import Particle  from "./particle.js";
import TimedLight from "../light/timedlight.js";
class RoundBullet extends Bullet{
    constructor(posX,posY,range=200,direction={x:1,y:0}) {
        super(posX, posY, 30,6,21,21,0xff0000ff,16,16,"rb",range,direction);
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
        game.level.addLight(new TimedLight(this.position.x, this.position.y,this.c,20,20,1));
        for (let index = 0; index < 20; index++) {
            game.level.addParticle(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,20,10).setHealth(90));
        }
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