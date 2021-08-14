import Ball from "../entity/ball.js";
import Entity from "../entity/entity.js";
class Level{

    constructor() {

        this.entities = [];
        var x = WIDTH;
        var y = HEIGHT/2;
       for (let index = 0; index < 16; index++) {
           var sin = Math.cos(((Math.PI*2)/12)*index)*64;
           //this.entities.push(new Ball(x + (index*8),y+sin,110-index*6,index));
           this.entities.push(new Ball(x + (index*10),y+sin,110-index*4,index));
       }

      /* for (let index = 0; index < 1024; index++) {
        var sin = Math.cos(((Math.PI*2)/12)*index)*64;
        //this.entities.push(new Ball(x + (index*8),y+sin,110-index*6,index));
        this.entities.push(new Ball(x + (index),y+sin,110,index));
    }*/

    }

    tick(){
        this.entities.forEach(e => {
            e.tick();
        });
    }

    render(game){
        game.gl.bkg(0.0,0.0,0.08,0);
        game.gl.cls();

        this.entities.forEach(e => {
            e.render(game);
        })

    }


}
export default Level;