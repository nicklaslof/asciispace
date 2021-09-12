import Upgrade from "../upgrade/upgrade.js";
class UpgradeController{

    // All the upgrades in the game with costs and the requirements needed to take one. Requirments are reference to the id of the upgrade.
    constructor(level,snapshot) {
        this.upgrades = [];
        this.level = 1;
        this.addUpgrade(new Upgrade(1,level.player,"Increased", "laser range",1,1,()=>{level.player.shootRange +=100},[]));
        this.addUpgrade(new Upgrade(2,level.player,"Stronger", "laser 1",6,8,()=>{level.player.laserStrength +=1},[]));
        this.addUpgrade(new Upgrade(3,level.player,"Stronger", "laser 2",8,10,()=>{level.player.laserStrength +=1},[2]));
        this.addUpgrade(new Upgrade(4,level.player,"Stronger", "laser 3",11,20,()=>{level.player.laserStrength +=3},[2,3]));
        this.addUpgrade(new Upgrade(5,level.player,"Increased", "laser speed",6,6,()=>{level.player.dualLaser=true},[]));
        this.addUpgrade(new Upgrade(6,level.player,"Rear", "lasers",9,12,()=>{level.player.rearLaser=true},[]));
        this.addUpgrade(new Upgrade(7,level.player,"Side", "lasers",10,11,()=>{level.player.sideLaser=true},[6]));
        this.addUpgrade(new Upgrade(8,level.player,"Drone", "",18,12,()=>{level.player.numberOfDrones=1},[3,7]));    
        this.addUpgrade(new Upgrade(9,level.player,"Dual", "drones",18,12,()=>{level.player.numberOfDrones=2},[8]));
        this.addUpgrade(new Upgrade(10,level.player,"Extra", "max health",50,10,()=>{level.player.maxHealth+=4;level.player.health=level.player.maxHealth},[9]));
        
        // If we are restoring from a checkpoint set all taken upgrades to be taken.
        if (snapshot != null){
           snapshot.upgrades.forEach(snapshotupgrade => {
               if (snapshotupgrade != null) this.upgrades[snapshotupgrade.id].taken = snapshotupgrade.taken;
           });
        }
    }

    addUpgrade(upgrade){
        this.upgrades[upgrade.id] = upgrade;
    }

    tick(game){
        var completedOnCurrentLevel = 0;
        var upgradesShown = 0;
        this.upgrades.forEach(upgrade => {
            if (game.level.player.metalScrap >= upgrade.metalCost && game.level.player.mineral >= upgrade.mineralCost && !upgrade.seen && !upgrade.taken && upgrade.canTake(game)){
                if (upgradesShown <1){
                    upgrade.seen = true;
                    game.level.ui.showUpgradeAvailable();
                    upgradesShown++;
                }
               
            }
        });
    }
}

export default UpgradeController;