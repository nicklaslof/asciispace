import ResourceButton from "./resourcebutton.js";
import Button from "./button.js"
import RequireArrow from "./requirearrow.js";
class UI{
    constructor() {
        this.cv = document.getElementById("u");
        this.cv.width = W;
        this.cv.height = H;
        this.ctx = this.cv.getContext('2d');
        this.selectedUpgradeButton = 0;
        this.upgradeButtons = [];
        this.requireArrows = [];
        this.showUpgradeAvailableMessage = false;
        this.upgradeMessagePlayed = false;
        this.showCheckpointTakenMessage = true;
        this.checkpointMessageTimer = 0;
        this.buttonX = 0;
        this.buttonY = 0;
    }

    tick(game, deltaTime){
        if (this.checkpointMessageTimer >0) this.checkpointMessageTimer -=deltaTime ;
        if (this.checkpointMessageTimer<=0) this.showCheckpointTakenMessage = false;
        this.tickUpgradePanel(game);
        this.tickResourcesAndUpgradeAvailable(game);
    }

    tickResourcesAndUpgradeAvailable(game){
        if (this.upgradePanelShown) return;
        this.ctx.clearRect(0,0,W,H);
        this.updateResources(game);
        if (!this.upgradeMessagePlayed && this.showUpgradeAvailableMessage){
            game.playUpgradesAvailable();
            this.upgradeMessagePlayed = true;
        }
        if (this.showUpgradeAvailableMessage){
            this.drawTextAt("Upgrades are available! Press E",W/2,20,"#ffffff",14);
        }

        if (this.showCheckpointTakenMessage){
            this.drawTextAt("Checkpoint saved",(W/2)-80,H/2,"#ffffff",14);
        }
    }

    tickUpgradePanel(game) {
        if (!this.upgradePanelShown) return;
        if (this.upgradePanelNeedUpdate){
            this.updateUpgradePanel(game);
        }
        if (this.upgradePanelShown) {
            this.showUpgradeAvailableMessage = false;
            this.upgradeMessagePlayed = false;
            var selectedUpgradeButtonBeforeLoop = this.selectedUpgradeButton;

            if (game.keys[68] == "keydown")
                this.buttonX++;
            if (game.keys[65] == "keydown" && !(this.buttonX -1 == 0 && this.buttonY>0))
                this.buttonX--;
            if (game.keys[83] == "keydown" && this.buttonX >0)
                this.buttonY++;
            if (game.keys[87] == "keydown" )
                this.buttonY--;

            if (game.keys[32] == "keydown")
                if (this.upgradeButtons[this.selectedUpgradeButton] != null) this.upgradeButtons[this.selectedUpgradeButton].action(game);
            
            game.keys[68] = game.keys[65] = game.keys[83] = game.keys[87] = game.keys[32] = "";

            this.buttonX = this.buttonX > 3 ? 3: this.buttonX;
            this.buttonX = this.buttonX < 0 ? 0: this.buttonX;
            this.buttonY = this.buttonY > 2 ? 2: this.buttonY;
            this.buttonY = this.buttonY < 0 ? 0: this.buttonY;

            this.selectedUpgradeButton = (this.buttonX + (this.buttonY * 4) );

            if (selectedUpgradeButtonBeforeLoop != this.selectedUpgradeButton) {
                this.upgradeButtons.forEach(button => {
                    button.selected = false;
                });

                this.upgradeButtons[(this.buttonX + (this.buttonY * 4))].selected = true;
                game.playBlip1();
                this.upgradePanelNeedUpdate = true;
            }
        }  
    }

    render(game){
    }

    showCheckpointTaken(){
        this.showCheckpointTakenMessage = true;
        this.checkpointMessageTimer = 2;
    }
    showUpgradeAvailable(){
        this.showUpgradeAvailableMessage = true;
    }

    updateResources(game){
        var posX = 15;
        var posY = 54;
        var mineral = game.level.player.mineral;
        var metal = game.level.player.metalScrap;
        if (mineral > 999) mineral = "999"; else mineral = (""+mineral).padStart(3,0);
        if (metal > 999) metal = "999"; else metal = (""+metal).padStart(3,0);
        this.drawTextAt("Mineral:",posX,posY,"#e180ff",14);
        this.drawTextAt(mineral,posX+70,posY,"white",14);
        this.drawTextAt("Metal:",posX+154,posY,"#999999",14);
        this.drawTextAt(metal,posX+154+55,posY,"white",14);
        this.lastmineral = game.level.player.mineral;
        this.lastMetalScrap = game.level.player.metalScrap;
    }

    updateUpgradePanel(game){

        this.ctx.clearRect(0,0,W,H);
        this.ctx.fillStyle="#001";
        this.ctx.fillRect((W/2)-348,(H/2)-215,707,475)
        this.generateSquare((W/2)-350,(H/2)-230, 44,20,16);

        var startX = (W/2)-315;
        var startY = (H/2)-170;
        var distanceX = 170;
        var distanceY = 140;
        var w = 16;
        var h = 10;
        
        if (this.upgradeButtons.length == 0){
            var upgrades = game.level.upgradeController.upgrades;
            this.addButton(game,startX,startY,w,h,upgrades,1,0,0);
            this.addButton(game,startX+(distanceX),startY,w,h,upgrades,2,0,1);
            this.addButton(game,startX+(distanceX*2),startY,w,h,upgrades,5,0,2);
            this.addButton(game,startX+(distanceX*3),startY,w,h,upgrades,6,0,3);

            this.addButton(game,startX+(distanceX),startY+(distanceY),w,h,upgrades,3,1,1);
            this.addButton(game,startX+(distanceX*2),startY+(distanceY),w,h,upgrades,8,1,2);
            this.addButton(game,startX+(distanceX*3),startY+(distanceY),w,h,upgrades,7,1,3);

            this.addButton(game,startX+(distanceX),startY+(distanceY*2),w,h,upgrades,4,2,1);
            this.addButton(game,startX+(distanceX*2),startY+(distanceY*2),w,h,upgrades,9,2,2);
            this.addButton(game,startX+(distanceX*3),startY+(distanceY*2),w,h,upgrades,10,2,3);
            
            this.addRequireArrow(startX+((distanceX*1)+(distanceX/3)),startY + (distanceY)+9,"down",upgrades,2);
            this.addRequireArrow(startX+((distanceX*3)+(distanceX/3)),startY + (distanceY)+9,"down",upgrades,6);

            this.addRequireArrow(startX+((distanceX*3)-28),startY + (distanceY*1)+(distanceY/2),"left",upgrades,7);
            this.addRequireArrow(startX+((distanceX*2)-28),startY + (distanceY*1)+(distanceY/2),"right",upgrades,3);

            this.addRequireArrow(startX+((distanceX*1)+(distanceX/3)),startY + (distanceY*2)+9,"down",upgrades,3);
            this.addRequireArrow(startX+((distanceX*2)+(distanceX/3)),startY + (distanceY*2)+9,"down",upgrades,8);

            this.addRequireArrow(startX+((distanceX*3)-28),startY + (distanceY*2)+(distanceY/2),"right",upgrades,9);
            
            this.upgradeButtons[(this.buttonX + (this.buttonY * 4))].selected = true;
        }

        this.upgradeButtons.forEach(button => {
            button.update(game,this);
        });
        this.requireArrows.forEach(arrow => {
            arrow.update(game,this);
        });
    
        
        this.drawTextAt("Select an upgrade:",(W/2)-106,(H/2)-180,"white",22);
        this.upgradePanelNeedUpdate = false;
        this.updateResources(game);
    }

    addRequireArrow(x,y,direction,upgrades,upgradeId){
        this.requireArrows.push(new RequireArrow(x,y,direction,upgrades[upgradeId]));
    }

    addButton(game, x, y, w, h, upgrades,upgradeId,buttonY,buttonX){
        this.upgradeButtons[buttonX + (buttonY * 4)] = new ResourceButton(x,y,w,h,upgrades[upgradeId], ()=> {upgrades[upgradeId].action(game);game.level.showUpgradePanel=false; this.hideUpgradePanel(game);});

    }

    showUpgradePanel(){
        this.upgradePanelNeedUpdate = true;
        this.upgradePanelShown = true;
    }

    hideUpgradePanel(game){
        this.ctx.clearRect(0,0,W,H);
        this.upgradeButtons = [];
        this.selectedUpgradeButton = 0;
        this.upgradePanelShown = false;

        this.updateResources(game);
    }

    generateSquare(x ,y,width, height, fontSize=16, c = "white"){
        

        this.ctx.font = "normal "+fontSize+"px monospace";
        this.ctx.fillStyle = c;

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