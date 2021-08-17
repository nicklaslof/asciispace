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
        this.deltaTime = 1000/60;
        this.accumulator = 0;

        this.level = new Level(this);
        this.keys =[];
        onkeydown=onkeyup=e=> this.keys[e.keyCode] = e.type;
    }
    gameloop(){
        if (this.texture.dirty) return;
       
        var now = performance.now();
        var passed = now - this.last;

        this.last = now;

        if (passed > 1000){
            passed = this.deltaTime;
        }

        this.accumulator += passed;

        var c = 0;
        while(this.accumulator >= this.deltaTime) {
            this.level.tick(this);
            this.accumulator -= this.deltaTime;
           // if (c>0) console.log(c);
            c++;
        }


        var interpolationOffset = this.accumulator / this.deltaTime;
        //console.log(interpolationOffset);
        
        this.level.render(this, interpolationOffset);
        this.gl.flush();
    }
}
export default Game;