class Upgrade{
    constructor(player, string1, string2, metalCost, mineralCost, onAction, level) {
        this.player = player;
        this.string1 = string1;
        this.string2 = string2;
        this.metalCost = metalCost;
        this.mineralCost = mineralCost;
        this.onAction = onAction;
        this.level = level;
        this.taken = false;
        this.player = player;
        console.log(this.player);
    }

    action(){
        if (this.player.mineral < this.mineralCost || this.player.metalScrap < this.metalCost) return;

        this.player.mineral -= this.mineralCost;
        this.player.metalScrap -= this.metalCost;
        this.taken = true;
        this.onAction();
    }


}

export default Upgrade;