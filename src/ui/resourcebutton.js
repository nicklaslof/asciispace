class ResourceButton{
    constructor(x,y,w,h,upgrade,onAction) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.textLine1 = upgrade.string1;
        this.textLine2 = upgrade.string2;
        this.textLine3 = "Mineral cost:"+upgrade.mineralCost;
        this.textLine4 = "Metal cost:"+upgrade.metalCost;

        this.selected = false;
        this.upgrade = upgrade;
        this.onAction = onAction;
    }

    action(){
        if (!this.upgrade.taken) this.onAction();
    }

    update(game,ui){
        ui.generateSquare(this.x,this.y,this.w,this.h,8);

        var col = this.selected ? this.upgrade.canTake(game) ? "white" : "red" : "gray";

        ui.drawTextAt(this.textLine1,this.x+10, this.y+36,col,16);
        ui.drawTextAt(this.textLine2,this.x+10, this.y+60,col,16);
        if (this.upgrade.taken){
            ui.drawTextAt("Upgrade",this.x+10, this.y+96,"green",11);
            ui.drawTextAt("done",this.x+10, this.y+116,"green",11);
        }else{
            ui.drawTextAt(this.textLine3,this.x+10, this.y+96,this.upgrade.mineralCost > game.level.player.mineral? "red": "white",11);
            ui.drawTextAt(this.textLine4,this.x+10, this.y+116,this.upgrade.metalCost > game.level.player.metalScrap? "red": "white",11);
        }

    }

}

export default ResourceButton;