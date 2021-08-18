class Button{
    constructor(game,ui,x,y,w,h,textLine1, textLine2,selected) {

        ui.generateSquare(x,y,w,h,8);
        this.x = x;
        this.y = y;
        this.textLine1 = textLine1;
        this.textLine2 = textLine2;
        this.selected = selected;

        var col = this.selected ? "white":"gray";

        ui.drawTextAt(this.textLine1,this.x+10, this.y+36,col,16);
        ui.drawTextAt(this.textLine2,this.x+10, this.y+60,col,16);
    }

    isDirty(){
        return this.buttonTexture.dirty;
    }

}

export default Button;