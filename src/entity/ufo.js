import EnemyEntity from "./enemyentity.js";
class UFO extends EnemyEntity{

    constructor(posX, posY, count) {
        super(posX, posY, 0,100,176,66,0xffff8888,48,24,"uf");
        this.count = count+1;
        this.time = 0;
        this.time2 = 0;
        this.orginalPositionX = posX;
        this.orginalPositionY = posY;
        this.shootCounter = count/3;
    }
}
export default UFO;