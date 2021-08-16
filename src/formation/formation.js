class Formation{
    constructor(level) {
        this.level = level;
    }

    execute(){
        this.entities = [];
        this.done = false;
    }

    tick(game){
        var disposedEntities = 0;
        this.entities.forEach(entity => {
            this.handleEntity(game,entity);
            if (entity.disposed) disposedEntities++;
        });

        if (disposedEntities == this.entities.length) this.done = true;
    }

    addEntity(entity){
        this.entities.push(entity);
        this.level.addEntity(entity);
    }

    handleEntity(game, entity){
    }


}
export default Formation;