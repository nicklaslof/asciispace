// The base class for all formations
class Formation{
    constructor(level) {
        this.level = level;
    }

    execute(){
        this.entities = [];
        this.done = false;
    }

    tick(game, deltaTime){
        if (this.done) return;
        this.entities.forEach(entity => {
            if (entity.disposed){
                this.removeEntity(entity);
            }
            // Each entity is handled by itself
            else this.handleEntity(game,entity, deltaTime);
        });

        // If all entities are disposed the formation is done
        if (this.entities.length == 0) this.done = true;
        if (this.done){
            this.onDone(game);
        }
    }

    addEntity(entity){
        this.entities.push(entity);
        this.level.addEntity(entity);
    }

    handleEntity(game, entity, deltaTime,counter){
    }

    onDone(game){

    }

    killAllEntities(game){
        this.entities.forEach(entity => {
            entity.invincible = false;
            entity.hit(game,1000,true);
        });
    }

    removeEntity(entity){
        for(let i = this.entities.length - 1; i >= 0; i--) {
            if(this.entities[i] === entity) {
                this.entities.splice(i, 1);
            }
        }
    }

    getRandom(min, max){
        return Math.random() * (max - min) + min
    }


}
export default Formation;