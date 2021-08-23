import Asteroid from "../entity/asteroid.js";
import Ball from "../entity/ball.js";
import Bullet from "../entity/bullet.js";
import Ship from "../entity/ship.js";
import StarField from "../entity/starfield.js";
import EnemyShipFormation1 from "../formation/enemyshipformation1.js";
import EnemyShipFormation2 from "../formation/enemyshipformation2.js";
import EnemyShipFormation3 from "../formation/enemyshipformation3.js";
import SineballFormation from "../formation/sineballformation.js";
import GameOverlay from "../ui/gameoverlay.js";
import UI from "../ui/ui.js";
import Tile from "./tile.js";
import AirTile from "./airtile.js";
import UpgradeController from "../upgrade/upgradecontroller.js";
import Shooter1 from "../entity/shooter1.js";
import Shooter2 from "../entity/shooter2.js";
import Obstacle from "../entity/obstacle.js";
import RotatingBallFormation from "../formation/rotatingballformation.js";
import RotatingBallFormation2 from "../formation/rotatingballformation2.js";
import BossFormation1 from "../formation/bossformation1.js";
import UfoFormation from "../formation/ufoformation.js";
import FastBallsFormation from "../formation/fastballsformation.js";

class Level{

    constructor(game, snapshot) {
        this.levelSizeX = 1024;
        this.levelSizeY = 20;

        this.game = game;
        this.gameOverlay = new GameOverlay();
        this.entities = [];
        this.entitiesToSpawn = [];
        this.formations = [];
        this.formationTemplates = [];
        this.activeFormations = [];
        this.tiles = [];

        this.starfield = new StarField();

        this.snapshotTimeout = 0;
        this.snapshot = snapshot;

        //this.levelPositionX = 12200;
        //this.levelPositionX = 7800;
        this.levelPositionX = -1000;
        
        if (snapshot != null) this.levelPositionX = snapshot.levelPositionX;

        this.lastCheckedTilePostionX = 0;
        this.lastFormation = -2000;
        this.player = new Ship(50,H/2).setHealth(8);
        this.entities.push(this.player);

        if (snapshot != null){
            this.player.mineral = snapshot.playerMineral;
            this.player.metalScrap = snapshot.playerMetal;
            this.player.shootRange = snapshot.playerShootRange;
            this.player.laserStrength = snapshot.playerLaserStrength;
            this.player.dualLaser = snapshot.playerDualLaser;
            this.player.rearLaser = snapshot.playerRearLaser;
            this.player.sideLaser = snapshot.playerSideLaser;
            this.player.numberOfDrones = snapshot.playerNumberOfDrones;
            this.player.maxHealth = this.player.health = snapshot.playerMaxHealth;
            this.snapshotTimeout = 5;
        }

        this.speedX = 0;
        this.speedY = 0;
    
        this.setupFormations();
        this.ui = new UI();
       
        this.showUpgradePanel = false;

        this.upgradeController = new UpgradeController(this,snapshot);

        this.stopped = false;

        for (let x = 0; x < this.levelSizeX; x++) {
            for (let y = 0; y < this.levelSizeY; y++) {
                this.tiles[x + (y*this.levelSizeX)] = new AirTile(x*24, y*29);
                var levelChar = level.charAt(x + (y*this.levelSizeX));
                if (levelChar=="#") this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,30,36,20,26,0xffda7d84);
                if (levelChar==":") this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,30,36,20,26,0xff00ff00);
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
                if (levelChar=="A" ||levelChar=="B" || levelChar == "C" || levelChar == "D" || levelChar == "E"|| levelChar == "M" || levelChar == "R" || levelChar == "T" || levelChar == "U"){
                    this.formations[x + (y* this.levelSizeX)] = levelChar;
                }

                if (levelChar=="a" || levelChar=="b" || levelChar=="c"|| levelChar=="d"|| levelChar=="e"|| levelChar=="f"){
                   // console.log(levelChar +" "+ x +" "+y);
                    this.entitiesToSpawn[x + (y * this.levelSizeX)] = levelChar;
                }
            }
        }
    }

    tick(game,deltaTime){
        if (game.keys[69] == "keydown"){
            game.keys[69] = "" 
            this.showUpgradePanel = !this.showUpgradePanel;
            if (this.showUpgradePanel)
                this.ui.showUpgradePanel();
            else
                this.ui.hideUpgradePanel(game);

        }

        if (this.player.health<= 0){
            game.playerDead = true;
        }


        if (!game.playerDead) this.ui.tick(game);
        if (this.showUpgradePanel){
            return;
        }

        if (!this.stopped && !game.playerDead){
            this.levelPositionX += deltaTime*75;
             this.starfield.tick(game, deltaTime);
        }

        if(this.snapshotTimeout>0) this.snapshotTimeout -= deltaTime;

        var levelTilePositionX = Math.floor((this.levelPositionX/24)+42);

        if (this.lastCheckedTilePostionX < levelTilePositionX){
            this.lastCheckedTilePostionX = levelTilePositionX;
            var x = this.lastCheckedTilePostionX;
            for (let y = 0; y < this.levelSizeY; y++) {
                var formation = this.formations[x + (y * this.levelSizeX)];
                if (formation != null){
                    console.log("Adding formation "+formation);
                    if (formation == "A") this.activeFormations.push(new SineballFormation(this));
                    if (formation == "B") this.activeFormations.push(new EnemyShipFormation1(this));
                    if (formation == "C") this.activeFormations.push(new EnemyShipFormation2(this));
                    if (formation == "D") this.activeFormations.push(new EnemyShipFormation3(this));
                    if (formation == "E") this.activeFormations.push(new FastBallsFormation(this));
                    if (formation == "R") this.activeFormations.push(new RotatingBallFormation(this,y*29));
                    if (formation == "T") this.activeFormations.push(new RotatingBallFormation2(this,y*29));
                    if (formation == "M") this.activeFormations.push(new BossFormation1(game,this));
                    if (formation == "U") this.activeFormations.push(new UfoFormation(this));
                }

                var entityToSpawn = this.entitiesToSpawn[x + (y * this.levelSizeX)];
                if (entityToSpawn != null){
                    console.log("Adding entity "+entityToSpawn);
                    if (entityToSpawn == "a") this.addEntity(new Shooter1(W-5,(y+0.10)*30));
                    if (entityToSpawn == "d") this.addEntity(new Shooter1(W-5,(y+0.10)*30,true));
                    if (entityToSpawn == "b") this.addEntity(new Shooter2(W-5,(y-0.10)*30,{x:-0.25,y:0.25},{x:0.25,y:0.25}));
                    if (entityToSpawn == "c") this.addEntity(new Shooter2(W-5,(y+0.10)*30,{x:-0.25,y:-0.25},{x:0.25,y:-0.25},true));
                    if (entityToSpawn == "e") this.addEntity(new Obstacle(W-5,y*30).setHealth(3));




                    if (this.snapshotTimeout <=0)if (entityToSpawn == "f") this.snapshotCheckpoint();

                }

            }
        }


        this.activeFormations.forEach(f => {
            f.tick(game,deltaTime);
        });

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
        this.upgradeController.tick(game);

    }

    render(game){
        game.gl.bkg(0.0,0.0,0.04,0);
        game.gl.cls();
        this.starfield.render(game);
        var tileCount = 0;
        for (let x = Math.floor(this.levelPositionX/24); x < Math.floor(this.levelPositionX/24)+60; x++) {
            for (let y = 0; y < this.levelSizeY; y++){
                let tile = this.tiles[x + (y*this.levelSizeX)];
                if (tile == null) continue;
                tile.render(game);
                tileCount++;
            }
        }



        this.entities.forEach(e => {
            e.render(game);
        })
        if (!game.playerDead) this.ui.render(game);
        if (!game.playerDead) this.gameOverlay.render(game);
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
       // this.formationTemplates.push(new SineballFormation(this));
       // this.formationTemplates.push(new EnemyShipFormation1(this));
       // this.formationTemplates.push(new EnemyShipFormation2(this));
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

    addEntityToTile(game, entity, tileX, tileY){
        var t = this.tiles[tileX + (tileY * this.levelSizeX)];
        if (t == null) return;
        t.addEntityToTile(game, entity);
    }
    removeEntityFromTile(entity, tileX, tileY){
        if (tileX > this.levelSizeX-1 || tileX < 0 || tileY > this.levelSizeY-1 || tileY < 0) return;
        this.tiles[tileX + (tileY * this.levelSizeX)].removeEntityFromTile(entity);
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min
    }
    snapshotCheckpoint(){
        this.snapshot = {
            levelPositionX : this.levelPositionX,
            playerMineral : this.player.mineral,
            playerMetal : this.player.metalScrap,
            playerShootRange : this.player.shootRange,
            playerLaserStrength : this.player.laserStrength,
            playerDualLaser : this.player.dualLaser,
            playerRearLaser : this.player.rearLaser,
            playerSideLaser : this.player.sideLaser,
            playerNumberOfDrones : this.player.numberOfDrones,
            playerMaxHealth : this.player.maxHealth,
            upgradeLevel : this.upgradeController.level,
            upgrades : this.upgradeController.upgrades
        };

        console.log(this.snapshot);
    }
}
export default Level;