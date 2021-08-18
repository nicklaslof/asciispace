class Button{
    constructor(game,ui,x,y,w,h,textLine1, textLine2, onAction) {


        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.textLine1 = textLine1;
        this.textLine2 = textLine2;
        this.selected = false;
        this.onAction = onAction;

        
    }

    action(){
        this.onAction();
    }

    update(ui){
        ui.generateSquare(this.x,this.y,this.w,this.h,8);
        var col = this.selected ? "white":"gray";

        ui.drawTextAt(this.textLine1,this.x+10, this.y+36,col,16);
        ui.drawTextAt(this.textLine2,this.x+10, this.y+60,col,16);
    }

}

export default Button;