import ResourceButton from "./resourcebutton.js";
import Button from "./button.js"
class UI{
    constructor() {
        this.cv = document.getElementById("u");
        this.cv.width = W;
        this.cv.height = H;
        this.ctx = this.cv.getContext('2d');
        this.selectedUpgradeButton = 0;
        this.upgradeButtons = [];
        this.showUpgradeAvailableMessage = false;
        this.upgradeMessagePlayed = false;
    }

    tick(game){
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
            this.drawTextAt("New upgrades available! Press E",W/2,20,"#ffffff",14);
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
                this.selectedUpgradeButton++;
                
            if (game.keys[65] == "keydown")
                this.selectedUpgradeButton--;
            if (game.keys[32] == "keydown")
                if (this.upgradeButtons[this.selectedUpgradeButton] != null) this.upgradeButtons[this.selectedUpgradeButton].action(game);
            game.keys[68] = game.keys[65] = game.keys[32] = "keyup";

            if (this.selectedUpgradeButton > 2)
                this.selectedUpgradeButton = 0;
            if (this.selectedUpgradeButton < 0)
                this.selectedUpgradeButton = 2;

            if (selectedUpgradeButtonBeforeLoop != this.selectedUpgradeButton) {
                for (let index = 0; index < this.upgradeButtons.length; index++) {
                    var button = this.upgradeButtons[index];
                    game.playBlip1();
                    if (index == this.selectedUpgradeButton)
                        button.selected = true;

                    else
                        button.selected = false;
                }
                this.upgradePanelNeedUpdate = true;
            }
        }
    }

    render(game){
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
        this.ctx.fillStyle="black";
        this.ctx.fillRect((W/2)-170,(H/2)-235,22*16,(18*16)-5)
        this.generateSquare((W/2)-170,(H/2)-250, 22,12,16);
        if (this.upgradeButtons.length == 0){
            var upgradesForCurrentLevel = game.level.upgradeController.getUpgradesForCurrentLevel();
            if (upgradesForCurrentLevel.length == 0){
                this.drawTextAt("You have all upgrades!",(W/2)-135,(H/2)-60,"white",22);
            }else{
                this.upgradeButtons.push(new ResourceButton((W/2)-150,(H/2)-150,16,10,upgradesForCurrentLevel[0], ()=> {upgradesForCurrentLevel[0].action(game);game.level.showUpgradePanel=false; this.hideUpgradePanel(game);}));
                this.upgradeButtons.push(new ResourceButton((W/2)+40,(H/2)-150,16,10,upgradesForCurrentLevel[1],()=> {upgradesForCurrentLevel[1].action(game);game.level.showUpgradePanel=false; this.hideUpgradePanel(game);}));
                this.upgradeButtons.push(new Button((W/2)-150,(H/2)-30,40,5,"             Cancel",()=>{game.level.showUpgradePanel=false; this.hideUpgradePanel(game);}));
                this.upgradeButtons[0].selected = true;
            }
        }

        this.upgradeButtons.forEach(button => {
            button.update(game,this);
        });
        

        this.drawTextAt("Select an upgrade:",(W/2)-106,(H/2)-200,"white",22);
        this.drawTextAt("Level "+game.level.upgradeController.level,(W/2)-30,(H/2)-160,"yellow",18);
        this.upgradePanelNeedUpdate = false;
        this.updateResources(game);
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
        console.log(text);
        
    }

}

export default UI;