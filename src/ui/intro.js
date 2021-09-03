import UI from "./ui.js";
import StarField from "../entity/starfield.js";

class Intro extends UI{

    constructor() {
        super();
        this.ctx.clearRect(0,0,W,H);
        var yStart = (H/2)-100;
        var x = 247;
        this.drawTextAt(
"             _____   _____  _____  _____                                ",x,(yStart)-60,"white",12);
        this.drawTextAt(
"     /\\     / ____| / ____||_   _||_   _|            ADVENTURE IN      ",x,(yStart)-48,"white",12);
        this.drawTextAt(
"    /  \\   | (___  | |       | |    | |      ___  _ __    __ _   ___  ___ ",x,(yStart)-36,"white",12);
        this.drawTextAt(
"   / /\\ \\   \\___ \\ | |       | |    | |     / __|| '_ \\  / _` | / __|/ _ \\",x,(yStart)-24,"white",12);
        this.drawTextAt(
"  / ____ \\  ____) || |____  _| |_  _| |_    \\__ \\| |_) || (_| || (__|  __/",x,(yStart)-12,"white",12);
        this.drawTextAt(
" /_/    \\_\\|_____/  \\_____||_____||_____|   |___/| .__/  \\__,_| \___|\\___|",x,(yStart),"white",12);
this.drawTextAt(
"                                                 | |",x,(yStart)+12,"white",12);
this.drawTextAt(
"                                                 |_|",x,(yStart)+24,"white",12);
        
this.drawTextAt("A game for JS13k 2021 by Nicklas Löf",(W/2)-150,(H/2)+100,"white",14);
this.drawTextAt("Using ZzFX by Frank Force and Tiny-Canvas by Felipe Alfonso",(W/2)-178,(H/2)+120,"white",10);
this.drawTextAt("Play with WASD, SPACE and E or a gamepad",(W/2)-165,(H/2)+170,"white",14);  
this.drawTextAt("Press SPACE or click your gamepad to start",(W/2)-175,(H/2)+200,"white",14); 
    
    this.starfield = new StarField();
    }

    tick(game,deltaTime){
        if (game.input.firePressed){
                game.showIntro=false;
                game.input.firePressed = false;
        }
        this.starfield.tick(game, deltaTime);
    }

    render(game){
        game.gl.bkg(0.0,0.0,0.04,0);
        game.gl.cls();
        this.starfield.render(game, 0);
    }


}
export default Intro;