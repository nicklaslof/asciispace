import UI from "./ui.js";
import StarField from "../entity/starfield.js";

class RestartGame extends UI{

    constructor(onCheckpoint) {
        super();
        this.onCheckpoint = onCheckpoint;

        
    
    }

    tick(game,deltaTime){
        this.ctx.clearRect(0,0,W,H);

        this.drawTextAt("You died",(W/2)-40,(H/2)-50,"white",18);
        this.drawTextAt("C to restart from last checkpoint.",(W/2)-180,(H/2),"white",18);
        if (game.keys[67] == "keydown") this.onCheckpoint();
    }
}
export default RestartGame;