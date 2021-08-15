import Bullet from "./bullet.js";
import CollisionEntity from "./collisionentity.js";

class Ship extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 326,5,18,18,0xffffffff,48,32);
        this.fireDelay = 0;
    }
    tick(game){
        this.fireDelay--;
        if (this.fireDelay < 0) this.fireDelay = 0;

        var translateX = 0;
        var translateY = 0;

        if (game.keys[68] == "keydown")translateX = 10;
        if (game.keys[65] == "keydown")translateX -= 10;
        if (game.keys[83] == "keydown")translateY += 4;
        if (game.keys[87] == "keydown")translateY -= 4;
        if (game.keys[32] == "keydown")this.firePressed = true;

        if (this.position.x + translateX < 16 || this.position.x + translateX > W - 16) translateX = 0;
        if (this.position.y + translateY < 16 || this.position.y + translateY > H - 16) translateY = 0; 

        this.position.x += translateX;
        this.position.y += translateY;

        //console.log(this.position);

        if (this.firePressed && this.fireDelay == 0){
            game.level.addEntity(new Bullet(this.position.x+30, this.position.y));
            this.fireDelay = 30;
        }else{
            this.firePressed = false;
        }
        super.tick(game);

    }
}
export default Ship;