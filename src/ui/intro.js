import UI from "./ui.js";
import StarField from "../entity/starfield.js";

class Intro extends UI{

    constructor() {
        super();
        this.ctx.clearRect(0,0,W,H);
        var yStart = (H/2)-100;
        var x = 115;
        this.drawTextAt(
"  _                  _     _                     _____   _____  _____  _____",x,(yStart)-60,"white",12);
        this.drawTextAt(
" | |                | |   (_)            /\\     / ____| / ____||_   _||_   _|",x,(yStart)-48,"white",12);
        this.drawTextAt(
" | |      ___   ___ | |_   _  _ __      /  \\   | (___  | |       | |    | |    ___  _ __    __ _   ___  ___ ",x,(yStart)-36,"white",12);
        this.drawTextAt(
" | |     / _ \\ / __|| __| | || '_ \\    / /\\ \\   \\___ \\ | |       | |    | |   / __|| '_ \\  / _` | / __|/ _ \\",x,(yStart)-24,"white",12);
        this.drawTextAt(
" | |____| (_) |\\__ \\| |_  | || | | |  / ____ \\  ____) || |____  _| |_  _| |_  \\__ \\| |_) || (_| || (__|  __/",x,(yStart)-12,"white",12);
        this.drawTextAt(
" |______|\\___/ |___/ \\__| |_||_| |_| /_/    \\_\\|_____/  \\_____||_____||_____| |___/| .__/  \\__,_| \\___|\\___|",x,(yStart),"white",12);
this.drawTextAt(
"                                                                                   | |",x,(yStart)+12,"white",12);
this.drawTextAt(
"                                                                                   |_|",x,(yStart)+24,"white",12);
        
this.drawTextAt("A game for JS13k 2021 by Nicklas Löf",(W/2)-150,(H/2)+100,"white",14);
this.drawTextAt("Play with WASD, SPACE and E",(W/2)-110,(H/2)+150,"white",14);  
this.drawTextAt("Press SPACE or click your gamepad to start",(W/2)-175,(H/2)+170,"white",14); 
    
    //this.generateSquare((W/2)-170,(H/2)-250, 22,12,16);

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