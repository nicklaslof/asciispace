import Upgrade from "../upgrade/upgrade.js";
class UpgradeController{

    constructor(level,snapshot) {
        this.upgrades = [];
        this.level = 1;
        this.addUpgrade(new Upgrade(1,level.player,"Increased", "laser range",1,1,()=>{level.player.shootRange +=100},[]));
        this.addUpgrade(new Upgrade(2,level.player,"Stronger", "laser 1",3,3,()=>{level.player.laserStrength +=1},[]));
        this.addUpgrade(new Upgrade(3,level.player,"Stronger", "laser 2",5,7,()=>{level.player.laserStrength +=1},[2]));
        this.addUpgrade(new Upgrade(4,level.player,"Stronger", "laser 3",13,15,()=>{level.player.laserStrength +=1},[2,3]));
        this.addUpgrade(new Upgrade(5,level.player,"Dual", "lasers",4,4,()=>{level.player.dualLaser=true},[]));
        this.addUpgrade(new Upgrade(6,level.player,"Rear", "lasers",9,12,()=>{level.player.rearLaser=true},[]));
        this.addUpgrade(new Upgrade(7,level.player,"Side", "lasers",10,11,()=>{level.player.sideLaser=true},[6]));
        this.addUpgrade(new Upgrade(8,level.player,"Drone", "",12,12,()=>{level.player.numberOfDrones=1},[3,7]));    
        this.addUpgrade(new Upgrade(9,level.player,"Dual", "drones",14,16,()=>{level.player.numberOfDrones=2},[8]));
        this.addUpgrade(new Upgrade(10,level.player,"Extra", "max health",15,16,()=>{level.player.maxHealth+=4;level.player.health=level.player.maxHealth},[9]));
        console.log(this.upgrades);
        if (snapshot != null){
            this.level = snapshot.upgradeLevel;
            for (let index = 0; index < snapshot.upgrades.length; index++) {
                console.log(this.upgrades[index]);
                console.log(snapshot.upgrades[index]);
                this.upgrades[index].taken = snapshot.upgrades[index].taken;

            }
        }
    }

    addUpgrade(upgrade){
        this.upgrades[upgrade.id] = upgrade;
    }

    tick(game){
        /*var completedOnCurrentLevel = 0;
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
        }*/
        
    }

    //getUpgradesForCurrentLevel(){
    //    var upgradeForLevel = [];
    //    this.upgrades.forEach(upgrade => {
     //       if (upgrade.level == this.level) upgradeForLevel.push(upgrade);
     //   });
    //    return upgradeForLevel;
    //}
}

export default UpgradeController;