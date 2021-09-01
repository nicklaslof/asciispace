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
        this.availableCounter = 0;
        this.availableShown = false;
    }

    action(){
        if (!this.upgrade.taken) this.onAction();
    }

    update(game,ui, deltaTime){

        var col = "white";

        if (this.selected){
            if (!this.upgrade.taken){
                if (this.upgrade.canTake(game)) col = "green";
                else col = "red";
            }else{
                col = "gray";
            }
        }else{
            if (this.upgrade.canTake(game)) col = "green";
            else if (this.upgrade.taken) col = "green";
            else col = "red";
        }

        ui.generateSquare(this.x,this.y,this.w,this.h,8,col, this.selected);

        if (this.selected){
            ui.generateSquare(this.x-8,this.y-8,this.w,this.h,9,col, this.selected);
        }

        ui.drawTextAt(this.textLine1,this.x+10, this.y+36,col,16);
        ui.drawTextAt(this.textLine2,this.x+10, this.y+60,col,16);

        if (this.upgrade.canTake(game) && !this.upgrade.taken){
            if (this.availableCounter >0) this.availableCounter -= deltaTime;
            else{
                this.availableShown = !this.availableShown;
                this.availableCounter = 0.5;
            }
            if (this.availableShown) ui.drawTextAt("Available!",this.x+10, this.y+78,"white",12);
        }

        if (this.upgrade.taken){
            ui.drawTextAt("Upgrade",this.x+10, this.y+96,"green",11);
            ui.drawTextAt("done",this.x+10, this.y+116,"green",11);
        }else{
            ui.drawTextAt(this.textLine3,this.x+10, this.y+96,this.upgrade.mineralCost > game.level.player.mineral? "red": "green",11);
            ui.drawTextAt(this.textLine4,this.x+10, this.y+116,this.upgrade.metalCost > game.level.player.metalScrap? "red": "green",11);
        }

    }

}

export default ResourceButton;