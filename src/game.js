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
    playExplosion(){
        zzfx(...[2.44,,375,.03,.05,.35,2,3.15,,.4,,,.06,.7,-6,.7,.05,.59,.06]);
    }
    playPickup(){
        zzfx(...[,,1123,,.03,.18,,.23,,,,,,,,,,.59,.01]);
    }

    playHit(){
        zzfx(...[1.03,,340,,.06,.09,4,1.15,-2.7,2.3,,,,.8,,.3,,.56,.03,.04]);
    }

    playShoot(){
        zzfx(...[,,475,,.07,.03,,.96,6.3,-0.1,,,,,,,,.83,.01,.29]);
    }

    playPowerup(){
        zzfx(...[1.36,,601,.04,.21,.92,,1.97,,-1.8,69,.03,.2,,,,.12,.92]);
    }

    playDenied(){
        zzfx(...[1.05,,85,,.04,.22,2,1.63,,,,,,.2,,,,.65,.03]);
    }
}
export default Game;