import ResourceButton from "./resourcebutton.js";
import RequireArrow from "./requirearrow.js";
import SlowText from "./slowtext.js";
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
        this.currentSelectedUpgradeButtonColor = "white";

        this.spaceDelay = 1;
        this.inputDelay = 0;

        this.trophyAdded = false;

        this.cinematicText = [];
        this.cinematicTextEnd = [];
        var startY = (H/2)-180;
        var distance = 30;
        var delay = 0.05;
        this.cinematicText.push(new SlowText("Welcome to sector 13.37 04",(W/2)-110,startY,delay));
        this.cinematicText.push(new SlowText("This sector has been overtaken by the evil O",(W/2)-185,startY+(distance*2),delay));
        this.cinematicText.push(new SlowText("Your mission: Destroy him!",(W/2)-110,startY+(distance*3),delay));
        this.cinematicText.push(new SlowText("Oh by the way . . . . . ",(W/2)-95,startY+(distance*5),delay*2));
        this.cinematicText.push(new SlowText("We forgot to equip your ship",(W/2)-115,startY+(distance*7),delay));
        this.cinematicText.push(new SlowText("again . . .",(W/2)-35,startY+(distance*8),delay*3));
        this.cinematicText.push(new SlowText("but you can probably find some material around here",(W/2)-210,startY+(distance*9),delay));
        this.cinematicText.push(new SlowText("and upgrade your ship",(W/2)-85,startY+(distance*10),delay));
        this.cinematicText.push(new SlowText("Dont forget to pick up the floating C",(W/2)-150,startY+(distance*12),delay));
        this.cinematicText.push(new SlowText("those are checkpoints in case you die",(W/2)-150,startY+(distance*13),delay));
        this.cinematicText.push(new SlowText("Good luck 04 and have fun!",(W/2)-110,startY+(distance*14),delay));



        this.cinematicTextEnd.push(new SlowText("You did it 04!",(W/2)-80,startY,delay));
        this.cinematicTextEnd.push(new SlowText("You destroyed the evil O",(W/2)-120,startY+(distance*2),delay));

        this.cinematicTextEnd.push(new SlowText("Now head over to sector 64.128",(W/2)-140,startY+(distance*4),delay));
        this.cinematicTextEnd.push(new SlowText("They have some issues with an",(W/2)-135,startY+(distance*5),delay));
        this.cinematicTextEnd.push(new SlowText("escaped C threating to start a war",(W/2)-155,startY+(distance*6),delay));

        this.cinematicTextEnd.push(new SlowText("Thanks for playing! /Nicklas",(W/2)-125,startY+(distance*8),delay));
    }

    tick(game, deltaTime){
        if (this.checkpointMessageTimer >0) this.checkpointMessageTimer -=deltaTime ;
        if (this.checkpointMessageTimer<=0) this.showCheckpointTakenMessage = false;
        this.tickUpgradePanel(game, deltaTime);
        this.tickResourcesAndUpgradeAvailable(game);
    }

    tickCinematicText(game, deltaTime){
        if (this.spaceDelay <= 0 && game.input.firePressed){
            game.input.firePressed = false;
            game.level.showCinematicText = false;
        }else this.spaceDelay -= deltaTime;

        this.cinematicText.some((t)=>{
            t.tick(this,game,deltaTime);
            return !t.isDone();
        });

        var shown = this.cinematicText.filter((t)=>{
            return t.isDone();
        })

        if (shown.length == this.cinematicText.length && !this.trophyAdded){
            game.addPatienceTrophy();
            this.trophyAdded = true;
        }
    }

    tickCinematicTextEnd(game, deltaTime){


        this.cinematicTextEnd.some((t)=>{
            t.tick(this,game,deltaTime);
            return !t.isDone();
        });
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
            if (game.input.hasGamepad){
                this.drawTextAt("New upgrade available! Click to show",W/2,20,"#ffffff",14);
            }else{
                this.drawTextAt("New upgrade available! Press E",W/2,20,"#ffffff",14);
            }
            
        }

        if (this.showCheckpointTakenMessage){
            this.drawTextAt("Checkpoint saved",(W/2)-80,H/2,"#ffffff",14);
        }
    }

    tickUpgradePanel(game, deltaTime) {
        if (!this.upgradePanelShown) return;
        this.updateUpgradePanel(game, deltaTime);
        if (this.upgradePanelShown) {
            this.showUpgradeAvailableMessage = false;
            this.upgradeMessagePlayed = false;
            var selectedUpgradeButtonBeforeLoop = this.selectedUpgradeButton;
            if (this.inputDelay > 0) this.inputDelay -= deltaTime;
            else{
                var oldButtonX = this.buttonX;
                var oldButtonY = this.buttonY;
                if (game.input.axes.x > 0)
                    this.buttonX++;
                if (game.input.axes.x < 0 && !(this.buttonX -1 == 0 && this.buttonY>0))
                    this.buttonX--;
                if (game.input.axes.y > 0 && this.buttonX >0)
                    this.buttonY++;
                if (game.input.axes.y < 0)
                    this.buttonY--;
                
                if (oldButtonX != this.buttonX || oldButtonY != this.buttonY)
                    this.inputDelay = 0.2;
            }
            

            if (game.input.firePressed)
                if (this.upgradeButtons[this.selectedUpgradeButton] != null) this.upgradeButtons[this.selectedUpgradeButton].action(game);

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

    updateUpgradePanel(game, deltaTime){

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
            button.update(game,this, deltaTime);
        });
        this.requireArrows.forEach(arrow => {
            arrow.update(game,this);
        });
    
        
        this.drawTextAt("Select an upgrade:",(W/2)-106,(H/2)-180,"gray",22);
        this.drawTextAt("Navigate with WASD",(W/2)-325,(H/2)-10,"gray",14);
        this.drawTextAt("Select upgrade with",(W/2)-325,(H/2)+10,"gray",14);
        this.drawTextAt("space",(W/2)-325,(H/2)+28,"gray",14);
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

    generateSquare(x ,y,width, height, fontSize=16, c = "white", bold = false){

        var style = bold ? "bold" : "normal";
        this.ctx.font = style + " "+fontSize+"px monospace";
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