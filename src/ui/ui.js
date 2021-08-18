import Button from "./button.js";
class UI{
    constructor() {
        this.cv = document.getElementById("u");
        this.cv.width = W;
        this.cv.height = H;
        this.ctx = this.cv.getContext('2d');
    }

    tick(game){
        if (this.upgradePanelNeedUpdate){
            this.updateUpgradePanel(game);
        }
    }

    render(game){
    }

    updateUpgradePanel(game){
        this.generateSquare((W/2)-170,(H/2)-250, 22,12,16);
        new Button(game,this,(W/2)-150,(H/2)-150,16,10,"Increased", "range",true);
        new Button(game,this,(W/2)+40,(H/2)-150,16,10,"Stronger", "bullets",false);
        new Button(game,this,(W/2)-150,(H/2)-30,40,5,"Cancel", "",false);
        this.drawTextAt("Select an upgrade:",(W/2)-106,(H/2)-200,"white",22); 
        this.upgradePanelNeedUpdate = false;
    }

    showUpgradePanel(){
        this.upgradePanelNeedUpdate = true;
    }

    generateSquare(x ,y,width, height, fontSize=16){
        

        this.ctx.font = "normal "+fontSize+"px monospace";
        this.ctx.fillStyle = "white";

        // Top line
        this.ctx.fillText("+",x,y+20);
        for (let w = 1; w < width; w++) {
            this.ctx.fillText("-",x+w*fontSize,y+20)
        }
        this.ctx.fillText("+",x+fontSize*width,y+20);

        // Sides
        for (let h = 1; h < height; h++){
            this.ctx.fillText("|",x,y+fontSize+h*(fontSize*1.5));
            this.ctx.fillText("|",x+fontSize*width,y+fontSize+h*(fontSize*1.5));
        }

        // Bottom line
        this.ctx.fillText("+",x,y+fontSize+height*(fontSize*1.5));

        for (let w = 1; w < width; w++) {
            this.ctx.fillText("-",x+w*fontSize,y+fontSize+height*(fontSize*1.5))
        }
        this.ctx.fillText("+",x+fontSize*width,y+fontSize+height*(fontSize*1.5));
    }

    drawTextAt(text,x,y,col, fontSize=16){
        this.ctx.globalAlpha = 1.0
        this.ctx.font = "normal "+fontSize+"px monospace";
        this.ctx.fillStyle = col;
        this.ctx.fillText(text,x,y);
        
    }

}

export default UI;