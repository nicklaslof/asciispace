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
import Checkpoint from "../entity/checkpoint.js";
import Health from "../entity/health.js";
import SineballFormation2 from "../formation/sineballformation2.js";
import UfoFormation2 from "../formation/ufoformation2.js";
import BossFormation2 from "../formation/bossformation2.js";
import GroundLaser from "../entity/groundlaser.js";
import GroundRobot from "../entity/groundrobot.js";
import BossFormation3 from "../formation/bossformation3.js";
import Light from "../light/light.js";
import Siren from "../entity/siren.js";
import LightSource from "../entity/lightsource.js";
import Particle from "../entity/particle.js";

class Level{

    constructor(game, snapshot) {
        this.levelSizeX = 1024;
        this.levelSizeY = 20;

        this.game = game;
        this.gameOverlay = new GameOverlay();
        this.entities = [];
        this.particles = [];
        this.lights = [];
        this.entitiesToSpawn = [];
        this.formations = [];
        this.formationTemplates = [];
        this.activeFormations = [];
        this.tiles = [];

        this.starfield = new StarField();

        this.snapshot = snapshot;
        this.showCinematicText = true;
        this.showCinematicTextEnd = false;

        //this.levelPositionX = 22150;

        //this.levelPositionX = 17750;
        //this.levelPositionX = 12350;
        //this.levelPositionX = 17200;
        //this.levelPositionX = 10400;
        //this.levelPositionX = 7500;
        //this.levelPositionX = 500;
        this.levelPositionX = -1000;
        
        if (snapshot != null) this.levelPositionX = snapshot.levelPositionX;

        this.lastCheckedTilePostionX = 0;
        this.lastFormation = -2000;
        this.player = new Ship(50,H/2).setHealth(8);
        this.entities.push(this.player);

        if (snapshot != null){
            // Restore the level from a checkpoint snapshot
            this.showCinematicText = false;

            this.player.mineral = snapshot.playerMineral;
            this.player.metalScrap = snapshot.playerMetal;
            this.player.shootRange = snapshot.playerShootRange;
            this.player.laserStrength = snapshot.playerLaserStrength;
            this.player.dualLaser = snapshot.playerDualLaser;
            this.player.rearLaser = snapshot.playerRearLaser;
            this.player.sideLaser = snapshot.playerSideLaser;
            this.player.numberOfDrones = snapshot.playerNumberOfDrones;
            this.player.maxHealth = snapshot.playerMaxHealth;
            this.player.health = snapshot.playerHealth;
            this.player.position.y = snapshot.levelPositionY;
        }

        this.speedX = 0;
        this.speedY = 0;

        this.ui = new UI();
       
        this.showUpgradePanel = false;

        this.upgradeController = new UpgradeController(this,snapshot);

        this.stopped = false;

        // Read the level ascii file and add them to the level content. Tiles are created here but formations will be created when the player is nearby.
        for (let x = 0; x < this.levelSizeX; x++) {
            for (let y = 0; y < this.levelSizeY; y++) {
                this.tiles[x + (y*this.levelSizeX)] = new AirTile(x*24, y*29);
                var levelChar = level.charAt(x + (y*this.levelSizeX));
                if (levelChar=="#") this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,30,36,20,26,0xffda7d84);
                if (levelChar==":") this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,30,36,20,26,0xff00ff00);
                if (levelChar==";") this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,30,36,20,26,0xff0000ff);
                if (levelChar=="."){
                    // Randomly fill with variation characters.
                    var r = Math.floor(this.getRandom(1,4));
                    switch(r){
                        case 1:
                            if (x >= 775) this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,158,40,11,22,0xff000066);
                            else this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,66,40,11,22,0xff444444);
                            break;
                        case 2:
                            if (x >= 775)this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,190,40,11,22,0xff000044);
                            else this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,1,49,11,12,0xff888888);
                            break;
                        case 3:
                            if (x >= 775)this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,224,40,11,22,0xff000022);
                            else this.tiles[x + (y*this.levelSizeX)] = new Tile(x*24,y*29,98,32,11,16,0xff222222);
                            break;
                    }
                }
                if (levelChar=="A" ||levelChar=="B" || levelChar == "C" || levelChar == "D" || levelChar == "E"|| levelChar == "F" || levelChar == "M" || levelChar == "N" || levelChar == "O" || levelChar == "R" || levelChar == "T" || levelChar == "U"|| levelChar == "V"){
                    this.formations[x + (y* this.levelSizeX)] = levelChar;
                }

                if (levelChar=="a" || levelChar=="b" || levelChar=="c"|| levelChar=="d"|| levelChar=="e"|| levelChar=="f" || levelChar=="g" || levelChar=="h" || levelChar=="i" || levelChar=="j" || levelChar=="k"|| levelChar=="l"){
                    this.entitiesToSpawn[x + (y * this.levelSizeX)] = levelChar;
                }
            }
        }
    }

    tick(game,deltaTime){
        if (!this.showCinematicText && !this.showCinematicTextEnd && game.input.usePressed){
            game.input.usePressed = false; 
            this.showUpgradePanel = !this.showUpgradePanel;
            if (this.showUpgradePanel)
                this.ui.showUpgradePanel();
            else
                this.ui.hideUpgradePanel(game);
        }

        if (this.player.health<= 0){
            game.playerDead = true;
        }

        if (this.showCinematicText){
            this.ui.tick(game, deltaTime);
            this.ui.tickCinematicText(game,deltaTime);
            this.starfield.tick(game, deltaTime);
            return;
        }

        if (this.showCinematicTextEnd){
            this.ui.tick(game, deltaTime);
            this.ui.tickCinematicTextEnd(game,deltaTime);
            this.starfield.tick(game, deltaTime);
            return;
        }

        if (!game.playerDead) this.ui.tick(game, deltaTime);
        if (this.showUpgradePanel){
            return;
        }

        if (!this.stopped && !game.playerDead){
            this.levelPositionX += deltaTime*75;
             this.starfield.tick(game, deltaTime);
        }

        // Scroll the level. There is no camera so the player is fixed on the location. It's just the level tiles scrolling.
        // Also make sure only visible tiles are ticked.
        // This will also create formations when player is getting close to them
        var levelTilePositionX = Math.floor((this.levelPositionX/24)+42);
        if (this.lastCheckedTilePostionX < levelTilePositionX){
            this.lastCheckedTilePostionX = levelTilePositionX;
            var x = this.lastCheckedTilePostionX;
            for (let y = 0; y < this.levelSizeY; y++) {
                var formation = this.formations[x + (y * this.levelSizeX)];
                if (formation != null){
                    if (formation == "A") this.activeFormations.push(new SineballFormation(this));
                    if (formation == "B") this.activeFormations.push(new EnemyShipFormation1(this));
                    if (formation == "C") this.activeFormations.push(new EnemyShipFormation2(this));
                    if (formation == "D") this.activeFormations.push(new EnemyShipFormation3(this));
                    if (formation == "E") this.activeFormations.push(new FastBallsFormation(this));
                    if (formation == "F") this.activeFormations.push(new SineballFormation2(this));
                    if (formation == "R") this.activeFormations.push(new RotatingBallFormation(this,y*29));
                    if (formation == "T") this.activeFormations.push(new RotatingBallFormation2(this,y*29));
                    if (formation == "M") this.activeFormations.push(new BossFormation1(game,this));
                    if (formation == "N") this.activeFormations.push(new BossFormation2(game,this));
                    if (formation == "O") this.activeFormations.push(new BossFormation3(game,this));
                    if (formation == "U") this.activeFormations.push(new UfoFormation(this));
                    if (formation == "V") this.activeFormations.push(new UfoFormation2(this));
                }

                var entityToSpawn = this.entitiesToSpawn[x + (y * this.levelSizeX)];
                if (entityToSpawn != null){
                    if (entityToSpawn == "a") this.addEntity(new Shooter1(W-5,(y+0.10)*30));
                    if (entityToSpawn == "d") this.addEntity(new Shooter1(W-5,(y+0.10)*30,true));
                    if (entityToSpawn == "h") this.addEntity(new Shooter1(W-5,(y+0.10)*30,false,true));
                    if (entityToSpawn == "b") this.addEntity(new Shooter2(W-5,(y-0.10)*30,{x:-0.25,y:0.25},{x:0.50,y:0.00}));
                    if (entityToSpawn == "c") this.addEntity(new Shooter2(W-5,(y+0.10)*30,{x:-0.25,y:-0.25},{x:0.25,y:-0.25},true));
                    if (entityToSpawn == "e") this.addEntity(new Obstacle(W-5,y*30).setHealth(3));
                    if (entityToSpawn == "f") this.addEntity(new Checkpoint(W-5,y*30));
                    if (entityToSpawn == "g") this.addEntity(new Health(W-5,y*30));
                    if (entityToSpawn == "i") this.addEntity(new GroundLaser(W-5,y*30));
                    if (entityToSpawn == "j") this.addEntity(new GroundRobot(W-5,(y*30)-5));
                    if (entityToSpawn == "k") this.addEntity(new Siren(W-5,(y*30)));
                    if (entityToSpawn == "l") this.addEntity(new LightSource(W-5,(y*30),0xff00ffff));
                }

            }
        }

        // Tick all formations, entities, particles and lights.

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

        this.particles.forEach(p => {
            if (!p.available) p.tick(game,deltaTime);
           // if (p.disposed) this.removeParticle(p);
        });

        this.lights.forEach(l => {
            l.tick(game,deltaTime);
            if (l.disposed) this.removeLight(l);
        });

        this.gameOverlay.tick(game);
        this.upgradeController.tick(game);

    }

    render(game){

        // Render everything in z order. Stars first and overlay last.
        game.gl.bkg(0.0,0.0,0.00,0);
        game.gl.cls();
        this.starfield.render(game);

        for (let x = Math.floor(this.levelPositionX/24); x < Math.floor(this.levelPositionX/24)+60; x++) {
            for (let y = 0; y < this.levelSizeY; y++){
                let tile = this.tiles[x + (y*this.levelSizeX)];
                if (tile == null) continue;
                tile.render(game);
            }
        }

        this.entities.forEach(e => {
            e.render(game);
        })

        this.particles.forEach(e => {
            if (!e.available) e.render(game);
        })

        if (!game.playerDead) this.ui.render(game);
    }

    renderOverlay(game){
        if (!game.playerDead) this.gameOverlay.render(game);
    }

    renderLight(game){
        this.lights.forEach(l => {
            l.render(game);
        })
    }

    // Every entitiy belongs to a tile to keep the ammount of entity collision checking down. For this to work surrounding tiles must be checked too.
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

    addParticle(posX, posY, col, movements=true, sizeX=10, sizeY=5, speed=90,health){
        // Check if there are any particles that can be reused before creating new ones. This to reduce the number of objects that are created and garbage collected.
        var availableParticles = this.particles.filter((p)=>{
            return p.available;
        });

        if (availableParticles.length == 0){
            this.particles.push(new Particle(posX,posY,col,movements,sizeX,sizeY,speed,health));
        }else{
            var particle = availableParticles[0];
            particle.initData(posX,posY,col,movements,sizeX,sizeY,speed,health);
        }

    }

    addEntity(entity){
        this.entities.push(entity);
    }

    addLight(light){
        this.lights.push(light);
    }

    removeParticle(particle){
        this.removeFromList(particle,this.particles);
    }

    removeEntity(entity){
        if (entity.light != null) this.removeLight(entity.light);
        this.removeFromList(entity,this.entities);
    }

    removeLight(light){
        this.removeFromList(light,this.lights);
    }

    removeFromList(object,list){
        for(let i = list.length - 1; i >= 0; i--) {
            if(list[i] === object) {
                list.splice(i, 1);
            }
        }
    }
    // Every entitiy belongs to a tile to keep the ammount of entity collision checking down.
    addEntityToTile(game, entity, tileX, tileY){
        var t = this.tiles[tileX + (tileY * this.levelSizeX)];
        if (t == null) return;
        t.addEntityToTile(game, entity);
    }

    // When an entity moves it will switch from tile to tile
    removeEntityFromTile(entity, tileX, tileY){
        if (tileX > this.levelSizeX-1 || tileX < 0 || tileY > this.levelSizeY-1 || tileY < 0) return;
        this.tiles[tileX + (tileY * this.levelSizeX)].removeEntityFromTile(entity);
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min
    }

    //Save all variables needed for a snapshot. Important to make a COPY of the upgrades otherwise only a reference are saved and when restoring the snapshot
    //the player might get a later version of it causing confusion and break the game also.
    snapshotCheckpoint(game){
        this.snapshot = {
            levelPositionX : this.levelPositionX,
            levelPositionY : this.player.position.y,
            playerMineral : this.player.mineral,
            playerMetal : this.player.metalScrap,
            playerShootRange : this.player.shootRange,
            playerLaserStrength : this.player.laserStrength,
            playerDualLaser : this.player.dualLaser,
            playerRearLaser : this.player.rearLaser,
            playerSideLaser : this.player.sideLaser,
            playerNumberOfDrones : this.player.numberOfDrones,
            playerHealth : this.player.health,
            playerMaxHealth : this.player.maxHealth,
            upgrades : JSON.parse(JSON.stringify(this.upgradeController.upgrades))
        };
        game.playCheckpoint();
        this.ui.showCheckpointTaken();
    }
}
export default Level;