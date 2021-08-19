import Asteroid from "../entity/asteroid.js";
import Ball from "../entity/ball.js";
import Bullet from "../entity/bullet.js";
import Ship from "../entity/ship.js";
import StarField from "../entity/starfield.js";
import EnemyShipFormation1 from "../formation/enemyshipformation1.js";
import EnemyShipFormation2 from "../formation/enemyshipformation2.js";
import SineballFormation from "../formation/sineballformation.js";
import GameOverlay from "../ui/gameoverlay.js";
import UI from "../ui/ui.js";
import Tile from "./tile.js";

class Level{

    constructor(game) {
        this.levelSizeX = 1024;
        this.levelSizeY = 20;

        this.game = game;
        this.gameOverlay = new GameOverlay();
        this.entities = [];
        this.formations = [];
        this.tiles = [];

        this.starfield = new StarField();
        this.range = 3000;
        this.lastFormation = -2000;
        this.player = new Ship(50,H/2).setHealth(8);
        this.entities.push(this.player);

        this.speedX = 0;
        this.speedY = 0;
    
        this.setupFormations();
        this.ui = new UI();
       
        this.showUpgradePanel = false;

        this.ready = false;

        fetch('l.txt')
            .then(response => response.text())
            .then(data => {
                for (let x = 0; x < this.levelSizeX; x++) {
                    for (let y = 0; y < this.levelSizeY; y++) {
                        var levelChar = data.charAt(x + (y*this.levelSizeX));
                        if(x == 0 && y == 4) console.log(levelChar);
                        if (levelChar=="#") this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,30,36,20,26);
                    }
                }
                this.ready = true;
            });
    }

    tick(game,deltaTime){
        if (!this.ready) return;
        if (game.keys[69] == "keydown"){
            game.keys[69] = "keyup" 
            this.showUpgradePanel = !this.showUpgradePanel;
            if (this.showUpgradePanel)
                this.ui.showUpgradePanel();
            else
                this.ui.hideUpgradePanel();

        }
        if (this.showUpgradePanel){
            this.ui.tick(game);
            return;
        }

        this.range += deltaTime*150;
        this.starfield.tick(game, deltaTime);
        
       /* if (this.currentFormation == null){
            this.formations[0].execute();
            this.currentFormation = this.formations[0];
        }else{
            if (this.currentFormation.done){
                var rand = Math.floor(this.getRandom(0,this.formations.length));
                this.currentFormation = this.formations[rand];
                this.currentFormation.execute();
            }
        }*/

        //if (Math.floor(this.getRandom(0,500)) == 1){
       //     var size = Math.floor(this.getRandom(48,96));
       //     this.entities.push(new Asteroid(W+50,Math.floor(this.getRandom(150,H-150)),size,size).setHealth(8));
       // }
        
      //  this.currentFormation.tick(game,deltaTime);

      //for (let y = 0; y < this.levelSizeY; y++) {
        var tile = this.tiles[this.player.tilePosition.x + (this.player.tilePosition.y * this.levelSizeX)];
        if (tile != null){
            tile.col = 0xff0000ff;
     //   }
    }


        this.entities.forEach(e => {
            e.tick(game,deltaTime);
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
        var tileCount = 0;
        for (let x = Math.floor(this.range/24); x < Math.floor(this.range/24)+60; x++) {
            for (let y = 0; y < this.levelSizeY; y++){
                let tile = this.tiles[x + (y*this.levelSizeX)];
                if (tile == null) continue;
                tile.render(game);
                tileCount++;
            }
        }

        //console.log("rendered "+tileCount+" tiles of "+this.tiles.length);

        this.starfield.render(game, interpolationOffset);

        this.entities.forEach(e => {
            e.render(game,interpolationOffset);
        })
        this.ui.render(game);
        this.gameOverlay.render(game,interpolationOffset);

       

      //  this.gameOverlay.showUpgrade(game);
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