import Light from "../light/light.js";
// The base class for all entities in the game
class Entity{

    constructor(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type) {
        this.position = {x:posX, y:posY};
        this.tilePosition = {x:0, y:0}; // Collision entities belongs to tiles to speedup collision detection
        this.u0 = texX/TZ;              // WebGL UVs of the texture
        this.u1 = texY/TZ;              // WebGL UVs of the texture
        this.v0 = this.u0 + (texW/TZ);  // WebGL UVs of the texture
        this.v1 = this.u1 + (texH/TZ);  // WebGL UVs of the texture
        this.counter = 0;               // Counter used for various
        this.c = c;                     // The tint color of the entity. Shortened as c because color is a reserved word so it stays when minifying
        this.sizeX = sizeX;             // Width
        this.sizeY = sizeY;             // Height
        this.rotation = 0;              // Rotation
        this.disposed = false;          // Disposed entities are automatically removed
        this.type = type;               // Type is instead of instanceof that caused me issues on minified version
        this.maxHealth = this.health = 1;// Health and max health
        this.hitTimeout = 0;            // Hit timeout to prevent player to take a lot of damage in just a few ticks.
        this.invincible = false;        // Invincible entities can't be hit
        this.skipOnDispose = false;     // Skip onDisposed to be called
        this.shakeX = this.shakeY = 0;  // Instead of changing position of the object this is used during rendering to shake the object on the screen
        this.hasLight = false;          // Default entities doesn't have any light. If set a light will be created
        this.lightColor = 0xffffffff;   // Color of the light
        this.lightSize = 500;           // Size of the light
    }

    setHealth(h){
        this.health = this.maxHealth = h;
        return this;
    }

    hit(game,h, force,hitTimeout = 0.8){
        if (!this.invincible && (this.hitTimeout <=0 || force)){
            this.health -= h;
            this.hitTimeout = hitTimeout;
        }
    }
    
    //Base entitiy doesn't collide with anything. See CollisionEntity instead.
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
            // Create a light if it doesn't exist already
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

    // Used to generate random numbers in various places.
    getRandom(min, max){
        return Math.random() * (max - min) + min
    }

    // Vector2 normalization
    normalize(v) {
        let len = v.x * v.x + v.y * v.y;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
        }
        v.x *= len;
        v.y *= len;
    }
    // Vector2 distance math
    distance(v1, v2) {
        let x = v1.x - v2.x
        let y = v1.y - v2.y;
        return Math.hypot(x, y);
    }

    // Render the entity to WebGL with current position with rotation center in the middle.
    render(game){
        game.gl.col = this.c;
        game.gl.img(game.texture.tex,-this.sizeX/2,-this.sizeY/2,this.sizeX,this.sizeY,this.rotation,this.position.x+this.shakeX,this.position.y+this.shakeY,1,1, this.u0, this.u1, this.v0, this.v1);
    }
}

export default Entity;