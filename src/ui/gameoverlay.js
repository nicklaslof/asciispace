import Heart from "../entity/heart.js";
import GlTexture from "../graphic/gltexture.js";
import Button from "./resourcebutton.js";
class GameOverlay{

    constructor() {
        this.heart = new Heart();
        this.cachedTextures = new Map();
    }

    tick(game){

    }

    render(game){
        this.renderHealth(game);
    }

    renderHealth(game){
        for (let index = 0; index < game.level.player.maxHealth; index++) {
            if (game.level.player.health <= index)
                this.heart.c = 0xff000055;
            else
                this.heart.c = 0xff0000ff;
            this.heart.position.x = 22 + 32*index;
            this.heart.position.y = 22;
            this.heart.tick(game);
            this.heart.render(game);
            
        }
    }
}

export default GameOverlay