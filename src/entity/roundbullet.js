import Bullet from "./bullet.js"
import Particle  from "./particle.js";
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
        for (let index = 0; index < 20; index++) {
            game.level.addEntity(new Particle(this.getRandom(this.position.x-20/this.maxHealth,this.position.x+20/this.maxHealth), this.getRandom(this.position.y-20/this.maxHealth, this.position.y+20/this.maxHealth),this.c,20,10).setHealth(90));
        }
        game.playExplosion();   
    }
}

export default RoundBullet;