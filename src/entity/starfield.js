import Star from "./star.js";

class StarField{
    constructor() {
        this.stars = [];
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,70));
        }
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,80));
        }
        for (let index = 0; index < 30; index++) {
            this.stars.push(new Star(0,0,90));
        }

        this.offsetX = 0;
        this.offsetY = 0;
    }

    tick(game, deltaTime){
        this.stars.forEach(star => {
            star.tick(game, this.offsetX, this.offsetY, deltaTime);
        });
    }
    render(game){
        this.stars.forEach(star => {
            star.render(game);
        });
    }
}
export default StarField;