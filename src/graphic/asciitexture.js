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
        textContext.fillText(".\"#€%&/()=?`©@£$<>|[]≈±´",0,24);
        textContext.fillText("abcdefghijklmnopqrstuvwxyz",0,60);
        this.addAsteriod(textContext);

        this.image = new Image();
        this.image.src = textCanvas.toDataURL();


    }

    addAsteriod(textContext){
        var ascii =
" /‾‾\\__  n\
¡ : .  \\ n\
|. : : ¡ n\
!. :. : \\n\
 \\ . .: ¡n\
  ‾‾\\__/ n";

        this.addAsciiart(textContext,ascii,0,100);
    }


    addAsciiart(textContext,ascii, x,y){
        console.log(ascii);
        var lines = ascii.split("n");
        for (let index = 0; index < lines.length; index++) {
            var line = lines[index];
            console.log(line);
            textContext.fillText(line,x,y);
            y +=28;
        }


    }

}
export default AsciiTexture;