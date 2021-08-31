import UI from "./ui.js";

class RestartGame extends UI{

    constructor(onCheckpoint) {
        super();
        this.onCheckpoint = onCheckpoint;

        this.spaceCountdown = 0.5;
    
    }

    tick(game,deltaTime){
        this.ctx.clearRect(0,0,W,H);
        this.spaceCountdown -= deltaTime;
        this.drawTextAt("You died",(W/2)-50,(H/2)-60,"white",18);
        if (game.input.hasGamepad)
            this.drawTextAt("Space to restart from last checkpoint.",(W/2)-200,(H/2),"white",18);
        else
            this.drawTextAt("Click to restart from last checkpoint.",(W/2)-200,(H/2),"white",18);
        if (this.spaceCountdown <= 0 && game.input.firePressed) this.onCheckpoint();
    }
}
export default RestartGame;