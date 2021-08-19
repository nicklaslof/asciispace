import Tile from "./tile.js";

class AirTile extends Tile{
    constructor(x,y) {
        super(x,y,0,0,0,0,0);
        this.x = x;
        this.y = y;
        //console.log("airtile at "+x+" "+y);
    }

    render(game){

    }
}
export default AirTile;