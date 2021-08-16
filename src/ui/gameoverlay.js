import Heart from "../entity/heart.js";

class GameOverlay{

    constructor() {
        this.heart = new Heart();
    }

    tick(game){

    }

    render(game, interpolationOffset){
        this.renderHealth(game, interpolationOffset);
    }

    renderHealth(game, interpolationOffset){
        for (let index = 0; index < game.level.player.maxHealth; index++) {
            if (game.level.player.health <= index)
                this.heart.color = 0xff000055;
            else
                this.heart.color = 0xff0000ff;
            this.heart.position.x = 22 + 32*index;
            this.heart.position.y = 22;
            this.heart.tick(game);
            this.heart.render(game, interpolationOffset);
            
        }
    }


}

export default GameOverlay