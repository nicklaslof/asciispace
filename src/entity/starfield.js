import Star from "./star.js";

class StarField{
    constructor() {
        this.stars = [];
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,2));
        }
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,2.1));
        }
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,2.2));
        }

        this.offsetX = 0;
        this.offsetY = 0;
    }

    tick(game){
        this.stars.forEach(star => {
            star.tick(game, this.offsetX, this.offsetY);
        });
    }
    render(game,interpolationOffset){
        this.stars.forEach(star => {
            star.render(game,interpolationOffset);
        });
    }
}
export default StarField;