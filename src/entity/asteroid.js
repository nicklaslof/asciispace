import CollisionEntity from "./collisionentity.js";
class Asteroid extends CollisionEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,80,132,118,0xff236880,128,128);
    }

    tick(game){
        super.tick(game);
        this.position.x -=0.2;
        this.rotation -= 0.005;
    }

}
export default Asteroid;