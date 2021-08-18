class Button{
    constructor(game, cachedTextures,gameOverlay,x,y,textLine1, textLine2,selected) {
        if (cachedTextures.get("button") == null){
            gameOverlay.generateSquare(game, 16,10,"button",8);
        }
        this.buttonTexture = cachedTextures.get("button");
        this.x = x;
        this.y = y;
        this.textLine1 = textLine1;
        this.textLine2 = textLine2;
        this.selected = selected;
    }

    render(game,gameOverlay){
        var col = this.selected ? 0xffffffff:0xff555555;

        gameOverlay.showText(game,this.textLine1,this.x+10, this.y+10,col,16);
        gameOverlay.showText(game,this.textLine2,this.x+10, this.y+36,col,16);
        game.gl.col = col;
        game.gl.img(this.buttonTexture.tex,0,0,1,1,0,this.x,this.y,512,512, 0,0,1,1);
    }

    isDirty(){
        return this.buttonTexture.dirty;
    }

}

export default Button;