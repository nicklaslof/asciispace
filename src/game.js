import AsciiTexture from "./graphic/asciitexture.js";
import GlTexture from "./graphic/gltexture.js";
import Level from "./level/level.js";
import Intro from "./ui/intro.js";
import RestartGame from "./ui/restartgame.js";
import { TinySprite } from './lib/sprite.js';
import Input from "./input/input.js";

class Game{
    constructor(){
        var canvas = document.getElementById("g");
        canvas.width = W;
        canvas.height = H;
        this.gl = TinySprite(canvas);
        this.gl.flush();

        this.ascii = new AsciiTexture();
        this.texture = new GlTexture(this.gl.g,this.ascii.image);
        this.setupLightBuffer();
        this.level = new Level(this);
        this.intro = new Intro(this);
        this.keys =[];
        onkeydown=onkeyup=e=> this.keys[e.keyCode] = e.type;
        this.counter = 0;
        this.fps = 0;

        this.last = 0;
        this.playBackgroundSound();
        setInterval(()=>{this.playBackgroundSound();},6000);

        this.showIntro = true;
        this.playerDead = false;
        this.restartGameUI = null;

        this.input = new Input();



        
    }
    gameloop(){
        if (this.texture.dirty) return;

        var now = performance.now();
        var deltaTime = now - this.last;
        if (deltaTime>1000){
            deltaTime = 0;
        }
        this.last = now;

        this.input.tick(this,deltaTime/1000);

        if (this.playerDead){
            this.level.tick(this,deltaTime/1000);
            this.level.render(this);
            this.gl.flush();
            if (this.restartGameUI == null) this.restartGameUI = new RestartGame(
                ()=> {this.level = new Level(this, this.level.snapshot); this.playerDead = false});
            this.restartGameUI.tick(this,deltaTime);
            return;
        }
        
       

        if (!this.showIntro){
            this.level.tick(this,deltaTime/1000);

            // Set blend mode and render the level
            this.gl.g.blendFunc(this.gl.g.SRC_ALPHA,this.gl.g.ONE_MINUS_SRC_ALPHA);
            this.level.render(this);
            this.gl.flush();
        
            // Bind the light buffer

            this.gl.g.bindFramebuffer(this.gl.g.FRAMEBUFFER, this.fb);

            // Set the global darkness
            this.gl.bkg(0.3,0.3,0.3,1);
            this.gl.cls();

            this.gl.col = 0xffffffff;
            this.gl.g.enable( this.gl.g.BLEND );
            this.gl.g.blendFunc(this.gl.g.SRC_ALPHA, this.gl.g.ONE);
            // Render the lights on this buffer
            this.level.renderLight(this);
            this.gl.flush();
            this.gl.g.bindFramebuffer(this.gl.g.FRAMEBUFFER, null);
            
            this.gl.col = 0xffffffff;
            this.gl.g.blendFunc(this.gl.g.DST_COLOR, this.gl.g.ZERO);
            // Draw the lightbuffer on top of the game rendering to create fake lights
            this.gl.img(this.lightTexture,0,0,W,H,0,0,0,1,1,0,1,1,0);


            this.gl.flush();
            this.gl.g.blendFunc(this.gl.g.SRC_ALPHA,this.gl.g.ONE_MINUS_SRC_ALPHA);
            this.level.renderOverlay(this);
            this.gl.flush();
            this.fps++;

            this.counter += deltaTime/1000;
            if (this.counter > 1){
                console.log(Date.now()+" FPS:"+this.fps);
                this.fps = this.ticks = this.counter = 0;
                this.counter = 0;
            }
        }else{
            this.intro.tick(this, deltaTime/1000);
            this.intro.render(this);
            this.gl.flush();
        }
        
    }
    playExplosion(){
        zzfx(20000,...[1.44,,375,.03,.05,.35,2,3.15,,.4,,,.06,.7,-6,.7,.05,.59,.06]);
    }
    playPickup(){
        zzfx(20000,...[0.5,.5,1123,,.03,.18,,.23,,,,,,,,,,.59,.01]);
    }

    playHit(){
        zzfx(20000,...[0.5,,340,,.06,.09,4,1.15,-2.7,2.3,,,,.8,,.3,,.56,.03,.04]);
    }

    playShoot(){
        zzfx(20000,...[0.5,,475,,.07,.03,,.96,6.3,-0.1,,,,,,,,.83,.01,.29]);
    }

    playDroneShoot(){
        zzfx(20000,...[0.5,,622,.02,.06,.06,1,.75,-5,-0.7,,,,,,,.1,.97,.04,.07]);
    }

    playPowerup(){
        zzfx(20000,...[,,345,.04,.21,.14,,.08,,8.1,5,.09,,,,,,.64,.05]);
    }

    playDenied(){
        zzfx(20000,...[1.05,,85,,.04,.22,2,1.63,,,,,,.2,,,,.65,.03]);
    }

    playBlip1(){
        zzfx(20000,...[1.65,,9,.02,.02,.05,1,.49,-0.2,8.5,208,.06,,,,,,.25,.04]);
    }

    playShoot2(){
        zzfx(20000,...[1,,151,.02,.02,,,1.7,2.8,,,,,,,.1,.16,.78,.02,.23]);
    }

    playPlayerHit(){
        zzfx(20000,...[,,81,,.05,.26,2,.33,,,,,,.3,-0.6,.4,,.99,,.06]);
    }

    playPlayerDied(){
        zzfx(20000,...[2.18,,625,,.1,.81,4,.82,,,,,,.5,,.8,.49,.76,.03,.34]);
    }

    playUpgradesAvailable(){
        zzfx(20000,...[,,120,.01,.01,2,1,2.1,,-0.1,70,.05,.15,,,,.46,2.2]);
    }

    playBossExplosion(){
        zzfx(20000,...[1.57,0,571,.04,.25,1.78,4,4.76,.4,.4,,,,,,.5,.17,.8,.08,.09]);
    }

    playCheckpoint(){
        zzfx(20000,...[,,581,.05,.64,.15,1,.69,,,-65,.02,.1,,,,.25,,.06,.1]);
    }

    playHealth(){
        zzfx(20000,...[1.9,,31,.06,.43,.99,1,.94,,.1,80,.03,.18,,,,,.9,.08,.46]);
    }

    playInvincible(){
        zzfx(20000,...[1,0,600,,,,,.7,,,,,,,,,,.51]);
    }

    playLaser(){
        zzfx(20000,...[.2,0,211,.02,1,0,,1.94,7.4,,,,.03,,,,.2,.91,.03,.01]);
    }

    playTextBeep(){
        zzfx(20000,...[,,1e3,,.03,.04,2,10.1,,,,,.2,,,,,.1,.02]);
    }

    playBackgroundSound(){
        var r = Math.random();
        if (r<0.3) zzfx(1500,...[.5,100,3e3,,6,.04,1,7.3,,,3333,,.04]);
        else if (r>0.3 && r < 0.7)
        zzfx(1500,...[.5,100,3e3,,6,0,1,7.3,,,50,,.04]);
        else
        zzfx(1500,...[.2,100,3e3,,3,0,1,11.2,,,250,,.03,,,,.67]);

    }

    setupLightBuffer(){
        this.lightTexture = new GlTexture(this.gl.g,null).tex;
        this.effectTexture = new GlTexture(this.gl.g, null).tex;
        this.fb = this.setupFrameBuffer(this.gl.g,this.lightTexture);
        
    }

    setupFrameBuffer(gl,texture){
        var fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);  
        //this.gl.g.activeTexture(this.gl.g.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);   
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return fb;
    }

    addWinningTrophy(){
        localStorage['OS13kTrophy,🚀,Adventure in ASCII space,Won the game'] = '';
    }

    addFirstBossTrophy(){
        localStorage['OS13kTrophy,🎖,Adventure in ASCII space,Killed first boss'] = '';
    }

    addSecondBossTrophy(){
        localStorage['OS13kTrophy,🏅,Adventure in ASCII space,Killed second boss'] = '';
    }

    addPatienceTrophy(){
        localStorage['OS13kTrophy,📖,Adventure in ASCII space,Read all the instructions'] = '';
    }
}
export default Game;