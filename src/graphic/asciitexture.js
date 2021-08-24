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
        textContext.fillText("\u2666",128,60,16);
        this.addBlueShip(textContext);
        this.addHeart(textContext);
        this.addShooter1(textContext);
        this.image = new Image();
        this.image.src = textCanvas.toDataURL();


    }

    addShooter1(textContext){
        var ascii = "‾\\ /‾n";
        this.addAsciiart(textContext,ascii,0,300,64);
    }

    addBlueShip(textContext){
        var ascii =
"    ___    n\
 __/:::\\__ n\
{_________}n";

        this.addAsciiart(textContext,ascii,0,100,172);
    }

    addHeart(textContext){
        var ascii =
" ▄▄ ▄▄  n\
███████ n\
 █████  n\
  ███   n\
   ▀    n";

        this.addAsciiart(textContext,ascii,200,100,128);

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