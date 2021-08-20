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
import AirTile from "./airtile.js";

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
        this.levelPositionX = 0;
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
                        if (levelChar=="#") this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,30,36,20,26,0xffda7d84);
                        if (levelChar=="."){

                            var r = Math.floor(this.getRandom(1,4));
                            switch(r){
                                case 1:
                                    this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,66,40,11,22,0xff444444);
                                    break;
                                case 2:
                                    this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,1,49,11,12,0xff888888);
                                    break;
                                case 3:
                                    this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,98,32,11,16,0xff222222);
                                    break;
                            }

                           
                        } 


                        if (typeof(this.tiles[x + (y*this.levelSizeX)]) === 'undefined') this.tiles[x + (y*this.levelSizeX)] = new AirTile(x*24, y*29);
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

        this.levelPositionX += deltaTime*75;
        this.starfield.tick(game, deltaTime);
        
       if (this.currentFormation == null){
            this.formations[0].execute();
            this.currentFormation = this.formations[0];
        }else{
            if (this.currentFormation.done){
                var rand = Math.floor(this.getRandom(0,this.formations.length));
                this.currentFormation = this.formations[rand];
                this.currentFormation.execute();
            }
        }

        this.currentFormation.tick(game,deltaTime);

        var tile = this.tiles[this.player.tilePosition.x + (this.player.tilePosition.y * this.levelSizeX)];
        if (tile != null){
            tile.col = 0xff0000ff;
    }

        this.entities.forEach(e => {
            e.tick(game,deltaTime);
            this.checkCollision(game,e);
            if (e.disposed) this.removeEntity(e);
        });

        this.gameOverlay.tick(game);

    }

    render(game,interpolationOffset){
        game.gl.bkg(0.0,0.0,0.08,0);
        game.gl.cls();
        var tileCount = 0;
        for (let x = Math.floor(this.levelPositionX/24); x < Math.floor(this.levelPositionX/24)+60; x++) {
            for (let y = 0; y < this.levelSizeY; y++){
                let tile = this.tiles[x + (y*this.levelSizeX)];
                if (tile == null) continue;
                tile.render(game);
                tileCount++;
            }
        }

        this.starfield.render(game, interpolationOffset);

        this.entities.forEach(e => {
            e.render(game,interpolationOffset);
        })
        this.ui.render(game);
        this.gameOverlay.render(game,interpolationOffset);
    }

    checkCollision(game, entity){
        this.checkTileForCollision(game, entity, entity.tilePosition.x,entity.tilePosition.y);
        this.checkTileForCollision(game, entity, entity.tilePosition.x+1,entity.tilePosition.y);
        this.checkTileForCollision(game, entity, entity.tilePosition.x-1,entity.tilePosition.y);
        this.checkTileForCollision(game, entity, entity.tilePosition.x,entity.tilePosition.y+1);
        this.checkTileForCollision(game, entity, entity.tilePosition.x,entity.tilePosition.y-1);
        
    }

    checkTileForCollision(game,entity,x,y){
        var tile = this.tiles[x + (y * this.levelSizeX)];
        if (tile == null) return;
        tile.checkCollision(game,entity); 
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

    addEntityToTile(entity, tileX, tileY){
        var t = this.tiles[tileX + (tileY * this.levelSizeX)];
        if (t == null) return;
        t.addEntityToTile(entity);
    }
    removeEntityFromTile(entity, tileX, tileY){
        this.tiles[tileX + (tileY * this.levelSizeX)].removeEntityFromTile(entity);
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min
    }
}
export default Level;