import Star from "./star.js";

class StarField{
    constructor() {
        this.stars = [];
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,12,2));
        }
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,19,2.1));
        }
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,26,2.2));
        }
    }

    tick(game){
        this.stars.forEach(star => {
            star.tick(game);
        });
    }
    render(game,interpolationOffset){
        this.stars.forEach(star => {
            star.render(game,interpolationOffset);
        });
    }
}
export default StarField;