import AsciiTexture from "./graphic/asciitexture.js";
import GlTexture from "./graphic/gltexture.js";
import Level from "./level/level.js";

class Game{
    constructor(){
        this.gl = TS(document.getElementById("g"));
        this.ascii = new AsciiTexture();
        this.texture = new GlTexture(this.gl.g,this.ascii.image);

        this.last = performance.now();
        this.deltaTime = 1000/60;
        this.accumulator = 0;

        this.level = new Level();

    }
    gameloop(){
        if (this.texture.dirty) return;

        var now = performance.now();
        var passed = now - this.last;

        this.last = now;

        if (passed > 1000) return;

        this.accumulator += passed;

        while (this.accumulator >= this.deltaTime) {
            this.level.tick(this);
            this.accumulator -= this.deltaTime;
        }

        this.level.render(this);
        this.gl.flush();
    }
}
export default Game;