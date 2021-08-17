import Asteroid from "../entity/asteroid.js";
import Ball from "../entity/ball.js";
import Bullet from "../entity/bullet.js";
import Ship from "../entity/ship.js";
import StarField from "../entity/starfield.js";
import EnemyShipFormation1 from "../formation/enemyshipformation1.js";
import EnemyShipFormation2 from "../formation/enemyshipformation2.js";
import SineballFormation from "../formation/sineballformation.js";
import GameOverlay from "../ui/gameoverlay.js";

class Level{

    constructor(game) {

        this.game = game;
        this.gameOverlay = new GameOverlay();
        this.entities = [];
        this.formations = [];

        this.starfield = new StarField();
        this.range = 0;
        this.lastFormation = -2000;
        this.player = new Ship(50,H/2).setHealth(8);
        this.entities.push(this.player);

        this.speedX = 0;
        this.speedY = 0;
    
        this.setupFormations();
    }

    tick(game){


        this.range += 1 + this.speedX;
        this.starfield.tick(game);
        
        if (this.currentFormation == null){
            this.formations[2].execute();
            this.currentFormation = this.formations[2];
        }else{
            if (this.currentFormation.done){
                var rand = Math.floor(this.getRandom(0,this.formations.length));
                this.currentFormation = this.formations[rand];
                this.currentFormation.execute();
            }
        }

        if (Math.floor(this.getRandom(0,500)) == 1){
            var size = Math.floor(this.getRandom(48,96));
            this.entities.push(new Asteroid(W+50,Math.floor(this.getRandom(150,H-150)),size,size).setHealth(8));
        }
        
        this.currentFormation.tick(game);


        this.entities.forEach(e => {
            e.tick(game);
            this.entities.forEach(oe => {
                if (e.disposed || oe.disposed || e.type == "pa" || oe.type == "pa") return;
                if (e.doesCollide(oe)){
                    e.collidedWith(game, oe);
                }
            });
            if (e.disposed) this.removeEntity(e);
        });

        this.gameOverlay.tick(game);
    }

    render(game,interpolationOffset){
        game.gl.bkg(0.0,0.0,0.08,0);
        game.gl.cls();

        this.starfield.render(game, interpolationOffset);

        this.entities.forEach(e => {
            e.render(game,interpolationOffset);
        })

        this.gameOverlay.render(game,interpolationOffset);
    }

    setupFormations(){
        this.formations.push(new SineballFormation(this));
        this.formations.push(new EnemyShipFormation1(this));
        this.formations.push(new EnemyShipFormation2(this));
    }

    addEntity(entity){
        this.entities.push(entity);
    }
    removeEntity(entity){
        for(let i = this.entities.length - 1; i >= 0; i--) {
            if(this.entities[i] === entity) {
                this.entities.splice(i, 1);
            }
        }
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min
    }
}
export default Level;