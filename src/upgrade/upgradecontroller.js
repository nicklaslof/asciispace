import Upgrade from "../upgrade/upgrade.js";
class UpgradeController{

    constructor(level) {
        this.upgrades = [];
        this.level = 1;
        this.upgrades.push(new Upgrade(level.player,"Increased", "range",1,1,()=>{level.player.shootRange +=100},1));
        this.upgrades.push(new Upgrade(level.player,"Stronger", "bullets",18,12,()=>{level.player.bulletStrength +=1},1));
    }

    getUpgradesForCurrentLevel(){
        var upgradeForLevel = [];
        this.upgrades.forEach(upgrade => {
            upgradeForLevel.push(upgrade);
        });
        return upgradeForLevel;
    }

}

export default UpgradeController;