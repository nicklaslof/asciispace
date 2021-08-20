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

        /*var player = new CPlayer();
        player.init(song);
        //player.generate();
        var done = false;
        var audio = document.createElement("audio");
        audio.play();
        setInterval(function () {
            if (done) {
              return;
            }
            done = player.generate() >= 1;
            if (done) {
                var wave = player.createWave();
                var audio = document.createElement("audio");
                audio.loop = true;
                audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
                audio.play();
            }
        });*/


       

       // this.tickRate = 1000/60;
       // this.accumulator = 0;

        this.level = new Level(this);
        this.keys =[];
        onkeydown=onkeyup=e=> this.keys[e.keyCode] = e.type;
        this.counter = 0;
        this.fps = 0;
       // this.ticks = 0;

        this.last = 0;
    }
    gameloop(){
        if (this.texture.dirty) return;
        
        var now = performance.now();
        var deltaTime = now - this.last;
        if (deltaTime>200){
            console.log(deltaTime);
            deltaTime = 0;
        }
        this.last = now;
        this.level.tick(this,deltaTime/1000);
        this.level.render(this,1);
        this.fps++;
        this.gl.flush();
        this.counter += deltaTime/1000;
        if (this.counter > 1){
           // console.log(Date.now()+" FPS:"+this.fps);
            this.fps = this.ticks = this.counter = 0;
            this.counter = 0;
        }
        /*var now = performance.now();
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

        //if (ticked){
            var interpolationOffset = this.accumulator / this.tickRate;
        
            this.level.render(this, interpolationOffset);
            this.fps++;
            this.gl.flush();
     //  }


        if (this.counter > 1000){
            console.log("FPS:"+this.fps+" Ticks:"+this.ticks);
            this.fps = this.ticks = this.counter = 0;
        }*/
    }
}
export default Game;