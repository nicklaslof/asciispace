class Formation{
    constructor(level) {
        this.level = level;
    }

    execute(){
        this.entities = [];
        this.done = false;
    }

    tick(game, deltaTime){
        var disposedEntities = 0;
        this.entities.forEach(entity => {
            //entity.tick(game);
            this.handleEntity(game,entity, deltaTime);

            if (entity.disposed) disposedEntities++;
        });

        if (disposedEntities == this.entities.length) this.done = true;
    }

    addEntity(entity){
        this.entities.push(entity);
        this.level.addEntity(entity);
    }

    handleEntity(game, entity, deltaTime){
    }


}
export default Formation;