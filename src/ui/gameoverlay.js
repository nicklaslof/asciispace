import Blank from "../entity/blank.js";
import Heart from "../entity/heart.js";
import GlTexture from "../graphic/gltexture.js";
class GameOverlay{

    constructor() {
        this.heart = new Heart();
        this.panel = new Blank();
        this.panel2 = new Blank();
        this.panel.c = 0x88000011;
        this.panel2.c = 0x88222255;

        this.panel.position.x = 130;
        this.panel.position.y = 30;
        this.panel.sizeX = 275;
        this.panel.sizeY = 65;
        
        this.panel2.position.x = 130;
        this.panel2.position.y = 50;
        this.panel2.sizeX = 275;
        this.panel2.sizeY = 25;


    }

    tick(game){

    }

    render(game){
        this.renderHealth(game);
    }

    renderHealth(game){

        this.panel.render(game);
        this.panel2.render(game);
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