import Entity from "./entity.js";

// The heart used in the health bar
class Heart extends Entity{
    constructor() {
        super(0,0,270,36,20,24,0xff0000ff,24,24,"h");
    }
}

export default Heart;