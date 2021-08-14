import Ball from "../entity/ball.js";
import StarField from "../entity/starfield.js";

class Level{

    constructor() {

        this.entities = [];
        var x = WIDTH;
        var y = HEIGHT/2;
        for (let index = 0; index < 16; index++) {
            var sin = Math.cos(((Math.PI*2)/12)*index)*64;
            this.entities.push(new Ball(x + (index*50),y+sin,800-index*16,index));
        }
        this.starfield = new StarField();
    }

    tick(game){
        this.starfield.tick(game);
        this.entities.forEach(e => {
            e.tick(game);
        });
    }

    render(game,interpolationOffset){
        game.gl.bkg(0.0,0.0,0.08,0);
        game.gl.cls();

        this.starfield.render(game, interpolationOffset);

        this.entities.forEach(e => {
            e.render(game,interpolationOffset);
        })

    }


}
export default Level;