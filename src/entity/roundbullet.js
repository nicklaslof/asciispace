import Bullet from "./bullet.js"

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
}

export default RoundBullet;