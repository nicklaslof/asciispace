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
        var disposedEntities = 0;
        this.entities.forEach(entity => {
            if (entity.disposed){
                disposedEntities++;
                this.removeEntity(entity);
            }
            else this.handleEntity(game,entity, deltaTime);
        });

        if (disposedEntities == this.entities.length) this.done = true;
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


}
export default Formation;