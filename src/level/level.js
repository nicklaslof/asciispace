import Asteroid from "../entity/asteroid.js";
import Ball from "../entity/ball.js";
import Bullet from "../entity/bullet.js";
import Ship from "../entity/ship.js";
import StarField from "../entity/starfield.js";

class Level{

    constructor() {

        this.entities = [];
        var x = W;
        var y = H/2;
        for (let index = 0; index < 16; index++) {
            var sin = Math.cos(((Math.PI*2)/12)*index)*64;
            this.entities.push(new Ball(x + (index*50),y+sin,index));
        }
        this.starfield = new StarField();
        this.counter = 0;
        this.entities.push(new Bullet(0,(H/2)+32,200));
        this.entities.push(new Asteroid(W/2,H/2));

        this.entities.push(new Ship(50,H/2));
    }

    tick(game){
        this.starfield.tick(game);

        this.counter++;

        if (this.counter > 150){
            this.counter = 0;
            this.entities.push(new Bullet(0,(H/2)+32,200));
        }

        this.entities.forEach(e => {
            e.tick(game);
            this.entities.forEach(oe => {
                if (e.doesCollide(oe)){
                    //e.rotation -= 0.04;
                }
            });
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