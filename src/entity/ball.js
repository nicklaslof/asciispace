import EnemyEntity from "./enemyentity.js";

class Ball extends EnemyEntity{
    constructor(posX, posY, count,size,color=0xff00ff00,drops=1) {
        super(posX, posY, 30,6,21,21,color,size,size,"o",drops);
        //this.count = -0.52*count;
        this.count = count;
        this.time = this.time2 = 0;
        this.movementStrength = this.getRandom(1,5);
        this.orginalPositionX = posX;
        this.orginalPositionY = posY;
        this.shootCounter = count/12;
        this.colorCounter = 0;
        this.orginalColor = color;
        this.hitColor = false;
    }

    hit(game,h, force,hitTimeout){
        super.hit(game,h,force,hitTimeout)
        if (this.invincible){
            this.colorCounter = 0.5;
            this.c = 0xffffffff;
        }
    }

    tick(game,deltaTime){
        super.tick(game,deltaTime);
        if (this.hitColor){
            if (this.colorCounter > 0) this.colorCounter -= deltaTime;
            if (this.colorCounter <= 0) this.c = this.orginalColor;
        }
    }
}

export default Ball;