import AsciiTexture from "./graphic/asciitexture.js";
import GlTexture from "./graphic/gltexture.js";
import Level from "./level/level.js";
import UI from "./ui/ui.js";

class Game{
    constructor(){
        var canvas = document.getElementById("g");
        canvas.width = W;
        canvas.height = H;
        this.gl = TS(canvas);
        this.gl.flush();
        this.ascii = new AsciiTexture();
        this.texture = new GlTexture(this.gl.g,this.ascii.image);

        

        this.tickRate = 1000/60;
        this.accumulator = 0;

        this.level = new Level(this);
        this.keys =[];
        onkeydown=onkeyup=e=> this.keys[e.keyCode] = e.type;
        this.counter = 0;
        this.fps = 0;
        this.ticks = 0;

        this.last = performance.now();
    }
    gameloop(){
        if (this.texture.dirty) return;
        
        var now = performance.now();
        var deltaTime = now - this.last;
        this.counter += deltaTime;

        this.last = now;

        this.accumulator += deltaTime;

        var ticked = false;

        while(this.accumulator >= this.tickRate) {
            this.level.tick(this);
            this.accumulator -= this.tickRate;
            this.ticks++;
            ticked = true;
        }

        if (ticked){
            var interpolationOffset = this.accumulator / this.tickRate;
        
            this.level.render(this, interpolationOffset);
            this.fps++;
            this.gl.flush();
       }


        if (this.counter > 1000){
            console.log("FPS:"+this.fps+" Ticks:"+this.ticks);
            this.fps = this.ticks = this.counter = 0;
        }
    }
}
export default Game;