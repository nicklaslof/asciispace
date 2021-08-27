import Entity from "./entity.js";

class Blank extends Entity{
    constructor(posX, posY) {
        super(posX, posY, 250,130,1,1,0xffffffff,16,16,"s");
        
    }
}

export default Blank;