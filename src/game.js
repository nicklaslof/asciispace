import AsciiTexture from "./graphic/asciitexture.js";
import GlTexture from "./graphic/gltexture.js";
import Level from "./level/level.js";
//import { zzfx } from "./lib/z.js";

class Game{
    constructor(){
        var canvas = document.getElementById("g");
        canvas.width = W;
        canvas.height = H;
        this.gl = TS(canvas);
        this.gl.flush();
        this.ascii = new AsciiTexture();
        this.texture = new GlTexture(this.gl.g,this.ascii.image);

        this.level = new Level(this);
        this.keys =[];
        onkeydown=onkeyup=e=> this.keys[e.keyCode] = e.type;
        this.counter = 0;
        this.fps = 0;

        this.last = 0;
        this.playBackgroundSound();
        setInterval(()=>{this.playBackgroundSound();},6000);
        
    }
    gameloop(){
        if (this.texture.dirty) return;
        
        var now = performance.now();
        var deltaTime = now - this.last;
        if (deltaTime>1000){
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
        

        if (this.counter > 1000){
            console.log("FPS:"+this.fps+" Ticks:"+this.ticks);
            this.fps = this.ticks = this.counter = 0;
        }
    }
    playExplosion(){
        zzfx(20000,...[2.44,,375,.03,.05,.35,2,3.15,,.4,,,.06,.7,-6,.7,.05,.59,.06]);
    }
    playPickup(){
        zzfx(20000,...[,,1123,,.03,.18,,.23,,,,,,,,,,.59,.01]);
    }

    playHit(){
        zzfx(20000,...[1.03,,340,,.06,.09,4,1.15,-2.7,2.3,,,,.8,,.3,,.56,.03,.04]);
    }

    playShoot(){
        zzfx(20000,...[,,475,,.07,.03,,.96,6.3,-0.1,,,,,,,,.83,.01,.29]);
    }

    playPowerup(){
        zzfx(20000,...[1.36,,601,.04,.21,.92,,1.97,,-1.8,69,.03,.2,,,,.12,.92]);
    }

    playDenied(){
        zzfx(20000,...[1.05,,85,,.04,.22,2,1.63,,,,,,.2,,,,.65,.03]);
    }

    playBlip1(){
        zzfx(20000,...[1.99,,58,.03,.01,.02,,.3,,31,-30,.16,,,,,.05,,.01,.13]);
    }

    playBackgroundSound(){
        var r = Math.random();
        if (r<0.3) zzfx(1500,...[.5,100,3e3,,6,.04,1,7.3,,,3333,,.04]);
        else if (r>0.3 && r < 0.7)
        zzfx(1500,...[.5,100,3e3,,6,0,1,7.3,,,50,,.04]);
        else
        zzfx(1500,...[.2,100,3e3,,3,0,1,11.2,,,250,,.03,,,,.67]);

    }
}
export default Game;