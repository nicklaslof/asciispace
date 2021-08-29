import Light from "./light.js";

class TimedLight extends Light{

    constructor(posX,posY,c,sizeX, sizeY, time) {
        super(posX,posY,c,sizeX,sizeY);
        
        this.time = time;
    }

    tick(game, deltaTime){
        this.time -= deltaTime;
        if (this.time <=0) this.disposed = true;
    }

}

export default TimedLight;