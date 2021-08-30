import Entity from "./entity.js";

// Used to draw areas like the areas around the healthbar

class Blank extends Entity{
    constructor(posX, posY) {
        super(posX, posY, 280,45,1,1,0xffffffff,16,16,"s");
        
    }
}

export default Blank;