import Upgrade from "../upgrade/upgrade.js";
class UpgradeController{

    constructor(level) {
        this.upgrades = [];
        this.level = 1;

        //this.upgrades.push(new Upgrade(level.player,"Increased", "laser range",10,12,()=>{level.player.shootRange +=100},1));
        //this.upgrades.push(new Upgrade(level.player,"Stronger", "laser",18,12,()=>{level.player.bulletStrength +=1},1));
        this.upgrades.push(new Upgrade(level.player,"Increased", "laser range",1,1,()=>{level.player.shootRange +=100},1));
        this.upgrades.push(new Upgrade(level.player,"Stronger", "laser 1",3,3,()=>{level.player.laserStrength +=1},1));
        this.upgrades.push(new Upgrade(level.player,"Dual", "lasers",4,4,()=>{level.player.dualLaser=true},2));
        this.upgrades.push(new Upgrade(level.player,"Stronger", "laser 2",5,7,()=>{level.player.laserStrength +=1},2));
        this.upgrades.push(new Upgrade(level.player,"Rear", "lasers",9,12,()=>{level.player.rearLaser=true},3));
        this.upgrades.push(new Upgrade(level.player,"Side", "lasers",12,15,()=>{level.player.sideLaser=true},3));
        this.upgrades.push(new Upgrade(level.player,"Drone", "",15,18,()=>{level.player.numberOfDrones=1},4));
        this.upgrades.push(new Upgrade(level.player,"Stronger", "laser 3",20,25,()=>{level.player.laserStrength +=1},4));
        this.upgrades.push(new Upgrade(level.player,"Dual", "drones",23,26,()=>{level.player.numberOfDrones=2},5));
        this.upgrades.push(new Upgrade(level.player,"Extra", "max health",30,30,()=>{level.player.maxHealth+=4;level.player.health=level.player.maxHealth},5));
    }

    tick(game){
        var completedOnCurrentLevel = 0;
        var upgradesShown = 0;
        this.upgrades.forEach(upgrade => {
            if (upgrade.level == this.level && game.level.player.metalScrap >= upgrade.metalCost && game.level.player.mineral >= upgrade.mineralCost && !upgrade.taken){
                if (upgradesShown <1){
                    game.level.ui.showUpgradeAvailable();
                    upgradesShown++;
                }
               
            }
            if (upgrade.level == this.level)
                if (upgrade.taken) completedOnCurrentLevel++;  
        });

        if (completedOnCurrentLevel == 2){
            this.level++;
        }
        
    }

    getUpgradesForCurrentLevel(){
        var upgradeForLevel = [];
        this.upgrades.forEach(upgrade => {
            if (upgrade.level == this.level) upgradeForLevel.push(upgrade);
        });
        return upgradeForLevel;
    }
}

export default UpgradeController;