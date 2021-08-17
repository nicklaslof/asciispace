import AsciiTexture from "./graphic/asciitexture.js";
import GlTexture from "./graphic/gltexture.js";
import Level from "./level/level.js";

class Game{
    constructor(){
        var canvas = document.getElementById("g");
        canvas.width = W;
        canvas.height = H;
        this.gl = TS(canvas);
        this.gl.flush();
        this.ascii = new AsciiTexture();
        this.texture = new GlTexture(this.gl.g,this.ascii.image);

        this.last = performance.now();
        this.tickRate = 1000/60;
        this.accumulator = 0;

        this.level = new Level(this);
        this.keys =[];
        onkeydown=onkeyup=e=> this.keys[e.keyCode] = e.type;
        this.counter = 0;
        this.fps = 0;
        this.ticks = 0;
    }
    gameloop(){
        if (this.texture.dirty) return;
        
        var now = performance.now();
        var deltaTime = now - this.last;
        this.counter += deltaTime;

        this.last = now;

        if (deltaTime > 1000){
            deltaTime = this.tickRate;
        }

        this.accumulator += deltaTime;

        var c = 0;
        while(this.accumulator >= this.tickRate) {
            this.level.tick(this);
            this.accumulator -= this.tickRate;
            if (c>0) console.log(c);
            c++;
            this.ticks++;
        }


        var interpolationOffset = this.accumulator / this.tickRate;
        
        this.level.render(this, interpolationOffset);
        this.fps++;
        this.gl.flush();

        if (this.counter > 1000){
            console.log("FPS:"+this.fps+" Ticks:"+this.ticks);
            this.fps = this.ticks = this.counter = 0;
        }
    }
}
export default Game;