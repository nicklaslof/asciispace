import Heart from "../entity/heart.js";
import GlTexture from "../graphic/gltexture.js";
class GameOverlay{

    constructor() {
        this.heart = new Heart();
        this.cachedTextures = new Map();
    }

    tick(game){

    }

    render(game, interpolationOffset){
        this.renderHealth(game, interpolationOffset);
    }

    renderHealth(game, interpolationOffset){
        for (let index = 0; index < game.level.player.maxHealth; index++) {
            if (game.level.player.health <= index)
                this.heart.c = 0xff000055;
            else
                this.heart.c = 0xff0000ff;
            this.heart.position.x = 22 + 32*index;
            this.heart.position.y = 22;
            this.heart.tick(game);
            this.heart.render(game, interpolationOffset);
            
        }
    }

    showText(game,text,x,y, color){
        if (this.cachedTextures.get(text) == null){
            this.generateImageFromText(game, text);
        }
        var texture = this.cachedTextures.get(text);
        if (texture.dirty) return;
        game.gl.col = color;
        game.gl.img(texture.tex,0,0,512,512,0,x,y,1,1, 0,0,1,1);
    }

    showUpgrade(game){
        if (this.cachedTextures.get("panel") == null){
            this.generateUpgradePanel(game, "panel");
        }
        var texture = this.cachedTextures.get("panel");
        if (texture.dirty) return;

        //game.gl.col = 0x99663333;
        game.gl.col = 0xffffffff;
        game.gl.img(texture.tex,0,0,1,1,0,(W/2)-245,(H/2)-250,512,368, 0,0,1,1);
        this.showText(game,"Select an upgrade",(W/2)-158,(H/2)-240,0xffffffff);

        
    }

    generateUpgradePanel(game,name){
        var textCanvas = document.getElementById('t');
        textCanvas.width = textCanvas.height = 64;
        var textContext = textCanvas.getContext('2d');
        textContext.beginPath();
        textContext.rect(0, 0, 64, 12);
        textContext.fillStyle = "#4444";
        textContext.fill();
        textContext.beginPath();
        textContext.rect(0, 12, 64, 52);
        textContext.fillStyle = "#5555";
        textContext.fill();
        textContext.strokeStyle = "white";
        textContext.strokeRect(0, 0, 64, 64);
        var image = new Image();
        image.src = textCanvas.toDataURL();

        var texture = new GlTexture(game.gl.g,image);
        this.cachedTextures.set(name,texture);
    }

    generateImageFromText(game,text){
        var textCanvas = document.getElementById('t');
        textCanvas.width = textCanvas.height = TZ;
        var textContext = textCanvas.getContext('2d');
        textCanvas.imageSmoothingEnabled = false;
        textContext.imageSmoothingEnabled = false;
        textContext.globalAlpha = 1.0
        textContext.font = "normal 32px monospace";
        textContext.fillStyle = "white";
        textContext.fillText(text,0,30);
        var image = new Image();
        image.src = textCanvas.toDataURL();

        var texture = new GlTexture(game.gl.g,image);
        this.cachedTextures.set(text,texture);

    }
}

export default GameOverlay