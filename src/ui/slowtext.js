class SlowText{

    constructor(text,x,y,delay) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.maxCharacterCount = text.length;
        this.currentBuffer = [];
        this.currentPosition = -1;
        this.counter = 0;
        this.delay = delay;
        this.pauseCounter = 0;
    }

    tick(ui, game, deltaTime){
        ui.drawTextAt(this.currentBuffer.join(""),this.x, this.y, "white",14);
        if (this.currentBuffer.length >= this.maxCharacterCount){
            this.pauseCounter += deltaTime;
            return;
        }
        this.counter += deltaTime;
        if (this.counter >= this.delay){
            this.currentPosition++;
            this.currentBuffer.push(this.text[this.currentPosition]);
            if (this.text[this.currentPosition] != " ") game.playTextBeep();
            this.counter = 0;
        }
    }
    isDone(){
        return this.pauseCounter > 1 && this.currentBuffer.length >= this.maxCharacterCount;
    }
}
export default SlowText;