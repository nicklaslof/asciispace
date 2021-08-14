class AsciiTexture{

    constructor(){
        var textCanvas = document.getElementById('t');
        textCanvas.width = textCanvas.height= TEXTURE_SIZE;
        let textContext = textCanvas.getContext('2d');
        //textCanvas.imageSmoothingEnabled = false;
        //textContext.imageSmoothingEnabled = false;
        //textContext.globalAlpha = 1.0
        textContext.font = "normal 32px monospace";
        textContext.fillStyle = "white";
        textContext.fillText("!\"#€%&/()=?`©@£$∞§|[]≈±´.",0,24);
        textContext.fillText("abcdefghijklmnopqrstuvwxyz",0,60);

        this.image = new Image();
        this.image.src = textCanvas.toDataURL();
    }
}
export default AsciiTexture;