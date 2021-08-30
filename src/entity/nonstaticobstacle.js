import CollisionEntity from "./collisionentity.js";

class NonstaticObstacle extends CollisionEntity{
    constructor(posX, posY,c,sizeX,sizeY) {
        super(posX, posY, 0,0,1,1,c,sizeX,sizeY,"no");

    }
}

export default NonstaticObstacle;