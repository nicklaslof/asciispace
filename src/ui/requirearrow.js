class RequireArrow{
    constructor(x,y,direction,upgrade) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.fullfilled = false;
        this.upgrade = upgrade;
    }

    update(game, ui){
        var char = "\u2190";
        if (this.direction == "right") char = "\u2192";
        if (this.direction == "down") char = "\u2193";
        
        var col = "red" ;
        if (this.upgrade.taken) col = "green";

        ui.drawTextAt(char,this.x, this.y,col,28);
    }
}
export default RequireArrow;