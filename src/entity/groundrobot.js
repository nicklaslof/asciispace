import RoundBullet from "./roundbullet.js";
import Entity from "./entity.js";
import Laser from "./laser.js";
import SolidLaser from "./solidlaser.js";
import CollisionEntity from "./collisionentity.js";
import EnemyEntity from "./enemyentity.js";
// A robot moving around on the ground in the later part of the level
class GroundRobot extends EnemyEntity{
    constructor(posX, posY) {
        super(posX, posY, 0,318,24,58,0xff333333,24,48,"gr");
        this.shootCounter = 0.5;
        this.sirenu0 = 250/TZ;
        this.sirenu1 = 36/TZ;
        this.sirenv0 = this.sirenu0 + (14/TZ);
        this.sirenv1 = this.sirenu1 + (24/TZ);

        this.alphaCounter = 0;
        this.alpha = (0xffff0000 >>> 24) & 0xFF;
        this.red = (0xffff0000 >>> 16) & 0xFF;
        this.green = (0xffff0000 >>>  8) & 0xFF;
        this.blue  = (0xffff0000 >>>  0) & 0xFF;
        this.setHealth(22);
        this.hasLight = true;
        this.lightColor = 0xff0000ff;
        this.lightSize = 70;
    }

    tick(game, deltaTime){
       super.tick(game,deltaTime);
       // Alpha used to fade in and out the blue light
       this.alphaCounter += deltaTime;
       this.alpha = Math.abs(Math.sin(this.alphaCounter)*200);

       this.position.x -= deltaTime*120;

       let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
       // Aim and shoot at the player if he is close enough.
       let dist = this.distance(this.position, playerPos);
        if (dist < 800){
            this.shootCounter += deltaTime;
            if (this.shootCounter >=0.5){
                var direction = {x:playerPos.x - this.position.x, y: playerPos.y - this.position.y};
                this.normalize(direction);
                var rb = new RoundBullet(this.position.x, this.position.y-20,1000,direction);
                rb.speed = 200;
                rb.sizeX = 16;
                rb.sizeY = 16;
                rb.c = 0xffff0000;
                rb.setSource(this);
                game.level.addEntity(rb);
                game.playShoot2();
                this.shootCounter = 0;
            }
        }
    }

    // A bit special since this entity consists of two sprites.
    render(game){
        super.render(game);
        // Calculate the color of the robot light
        game.gl.col = (this.alpha & 0xff) << 24 | (this.red & 0xff) << 16 | (this.green & 0xff) << 8 | (this.blue & 0xff);
        game.gl.img(game.texture.tex,-this.sizeX/2,-this.sizeY/2,this.sizeX/2,this.sizeY/2,-Math.PI/2,this.position.x+10,this.position.y-30,1,1, this.sirenu0 , this.sirenu1, this.sirenv0, this.sirenv1);
    }
    
}
export default GroundRobot;