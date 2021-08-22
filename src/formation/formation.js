class Formation{
    constructor(level) {
        this.level = level;
        this.counter = 0;
    }

    execute(){
        this.entities = [];
        this.done = false;
    }

    tick(game, deltaTime){
        var disposedEntities = 0;
        this.counter += deltaTime;
        this.entities.forEach(entity => {
            //entity.tick(game);
            this.handleEntity(game,entity, deltaTime,this.counter);

            if (entity.disposed) disposedEntities++;
        });

        if (disposedEntities == this.entities.length) this.done = true;
    }

    addEntity(entity){
        this.entities.push(entity);
        this.level.addEntity(entity);
    }

    handleEntity(game, entity, deltaTime,counter){
    }


}
export default Formation;