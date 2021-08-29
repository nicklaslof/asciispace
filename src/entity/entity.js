import Light from "../light/light.js";
class Entity{
//Type (used for collisions)
// p = player
// a = asteriod
// b = bullet
// o = ball
// pa = particle
    constructor(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type) {
        this.position = {x:posX, y:posY};
        this.tilePosition = {x:0, y:0};
        this.u0 = texX/TZ;
        this.u1 = texY/TZ;
        this.v0 = this.u0 + (texW/TZ);
        this.v1 = this.u1 + (texH/TZ);
        this.counter = 0;
        this.c = c;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.rotation = 0;
        this.disposed = false;
        this.type = type;
        this.maxHealth = this.health = 1;
        this.hitTimeout = 0;
        this.entityTimeoutOnHit = 0.2;
        this.invincible = false;
        this.skipOnDispose = false;
        this.shakeX = this.shakeY = 0;
        this.hasLight = false;
        this.lightColor = 0xffffffff;
        this.lightSize = 500;
    }

    setHealth(h){
        this.health = this.maxHealth = h;
        return this;
    }

    hit(game,h, force,hitTimeout = 0.2){
        if (!this.invincible && (this.hitTimeout <=0 || force)){
            this.health -= h;
            this.hitTimeout = hitTimeout;
        }
    }
    
    doesCollide(otherEntity){
        return false;
    }

    heal(h){
        this.health += h;
        if (this.health > this.maxHealth) this.health = this.maxHealth;
    }

    onDispose(game){
    }

    tick(game,deltaTime){
        if (this.hasLight){
            if (this.light == null){
                this.light = new Light(this.position.x,this.position.y,this.lightColor,this.lightSize,this.lightSize);
                game.level.addLight(this.light);
            }
            if (this.light != null){
                this.light.position.x = this.position.x;
                this.light.position.y = this.position.y;
            } 
        }
        if (this.health <=0){
            this.disposed = true;
        }
        if(!this.skipOnDispose && this.disposed) this.onDispose(game);
        if (this.disposed && this.light != null) game.level.removeLight(this.light);

        if (this.position.x < -300 && !this.allowedOutOfLevel) this.disposed = true;

        if (this.hitTimeout > 0){

            this.hitTimeout -= deltaTime;
        }
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min
    }

    normalize(v) {
        let len = v.x * v.x + v.y * v.y;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
        }
        v.x *= len;
        v.y *= len;
    }
    distance(v1, v2) {
        let x = v1.x - v2.x
        let y = v1.y - v2.y;
        return Math.hypot(x, y);
    }

    translate(x,y){
        this.position.x += x;
        this.position.y += y;
    }

    render(game){
        game.gl.col = this.c;
        game.gl.img(game.texture.tex,-this.sizeX/2,-this.sizeY/2,this.sizeX,this.sizeY,this.rotation,this.position.x+this.shakeX,this.position.y+this.shakeY,1,1, this.u0, this.u1, this.v0, this.v1);
    }
}

export default Entity;