class Upgrade{
    constructor(id,player, string1, string2, metalCost, mineralCost, onAction, required) {
        this.id = id;
        this.player = player;
        this.string1 = string1;
        this.string2 = string2;
        this.metalCost = metalCost;
        this.mineralCost = mineralCost;
        this.onAction = onAction;
        this.required = required;
        this.taken = false;
        this.player = player;
        this.seen = false;
    }

    canTake(game){
        if (this.player.mineral < this.mineralCost || this.player.metalScrap < this.metalCost) return false;
        var required = this.required.length;
        var has = 0;
        this.required.forEach(i => {
            if (game.level.upgradeController.upgrades[i].taken)has++;
        });
        return has == required;
    }

    action(game){
        if (!this.canTake(game)){
            game.playDenied();
            return;
        }
        game.playPowerup();
        this.player.mineral -= this.mineralCost;
        this.player.metalScrap -= this.metalCost;
        this.taken = true;
        this.onAction();
    }


}

export default Upgrade;