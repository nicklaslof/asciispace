import Entity  from "./entity.js";
class Shield extends Entity{
    constructor(posX, posY,startAngle) {
        super(posX, posY, 0,52,16,12,0x9900ffff,24/4, 16/4, "sh");
        this.angle = startAngle;
        this.orginalPositionX = posX;
        this.orginalPositionY = posY;
        this.setHealth(10);
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        this.angle -= deltaTime/8;

        var y = (Math.sin(this.angle*10) * 48) + game.level.player.position.y;
        var x = (Math.cos(this.angle*10) * 48) + game.level.player.position.x-6;

        this.position.x = x;
        this.position.y = y;
    }
}

export default Shield;