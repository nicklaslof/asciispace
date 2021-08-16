import CollisionEntity from "./collisionentity.js";
class Resource extends CollisionEntity{

    constructor(posX, posY, c, type) {
        super(posX, posY,0,52,16,12,c,32,32,type);
    }

    tick(game){
        let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
        let dist = this.distance(this.position, playerPos);
        if (dist < 500){
            let velocity = {x:playerPos.x - this.position.x, y: playerPos.y - this.position.y};
            this.normalize(velocity);
            this.position.x += velocity.x*(Math.min(5,500/dist));
            this.position.y += velocity.y*(Math.min(5,500/dist));
            super.tick(game);
        }
    }

}
export default Resource;