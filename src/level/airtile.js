import Tile from "./tile.js";

class AirTile extends Tile{
    constructor(x,y) {
        super(x,y,0,0,0,0,0);
        this.x = x;
        this.y = y;
    }

    render(game){

    }

    addEntityToTile(game,entity){
        this.entities.push(entity);
    }
}
export default AirTile;