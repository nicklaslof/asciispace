import CollisionEntity from "./collisionentity.js";

class Ship extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 326,5,18,18,0xffffffff,48,32);
    }
    tick(game){
        super.tick(game);
        if (game.keys[68] == "keydown")this.position.x +=6;
        if (game.keys[65] == "keydown")this.position.x -=6;
        if (game.keys[83] == "keydown")this.position.y +=6;
        if (game.keys[87] == "keydown")this.position.y -=6;
    }
}
export default Ship;