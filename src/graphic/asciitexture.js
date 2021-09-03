// All graphics in the game are created by this class. Browsers have different fonts even for monospace font and also depending on the OS

class AsciiTexture{

    constructor(){
        var textCanvas = document.getElementById('t');
        textCanvas.width = textCanvas.height = TZ;
        var textContext = textCanvas.getContext('2d');
        textCanvas.imageSmoothingEnabled = false;
        textContext.imageSmoothingEnabled = false;
        textContext.globalAlpha = 1.0
        textContext.font = "normal 32px monospace";
        textContext.fillStyle = "white";
        textContext.fillText(">",0,24,16);
        textContext.fillText("o",32,24,16);
        textContext.fillText("c",64,24,16);
        textContext.fillText(".",0,60,16);
        textContext.fillText("#",32,60,16);
        textContext.fillText(":",64,60,16);
        textContext.fillText("'",96,60,16);
        textContext.fillText("░",160,60,16);
        textContext.fillText("▒",192,60,16);
        textContext.fillText("▓",224,60,16);
        textContext.fillText("Þ",248,60,16);

        textContext.fillText("\u2666",128,60,16);
        textContext.fillText("\u2665",272,60,16);
        this.addBlueShip(textContext);
        this.addShooter1(textContext);
        this.addGroundLaser(textContext);
        textContext.fillRect(0,0,1,1);


        // Create light circle
        var radgrad = textContext.createRadialGradient(270,370,0,270,370,150);
        radgrad.addColorStop(0, 'rgba(255,255,255,1)');
        radgrad.addColorStop(0.5, 'rgba(255,255,255,1)');
        radgrad.addColorStop(1, 'rgba(255,255,255,0)');
        
        textContext.fillStyle = radgrad;
        textContext.fillRect(128,200,450,450);
      
    

        this.image = new Image();
        this.image.src = textCanvas.toDataURL();


    }

    addShooter1(textContext){
        var ascii = "‾\\ /‾n";
        this.addAsciiart(textContext,ascii,0,300,64);
    }

    addGroundLaser(textContext){
        var ascii = 
"■n\
█n";
        this.addAsciiart(textContext,ascii,0,340,64);
    }


    addBlueShip(textContext){
        var ascii =
"    ___    n\
 __/:::\\__ n\
{_________}n";

        this.addAsciiart(textContext,ascii,0,100,172);
    }

    addAsciiart(textContext,ascii, x,y, maxWidth){
        var lines = ascii.split("n");
        for (let index = 0; index < lines.length; index++) {
            var line = lines[index];
            textContext.fillText(line,x,y,maxWidth);
            y +=28;
        }
    }
}
export default AsciiTexture;