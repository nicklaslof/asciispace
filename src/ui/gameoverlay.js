import Heart from "../entity/heart.js";
import GlTexture from "../graphic/gltexture.js";
import Button from "./button.js";
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

    showText(game,text,x,y, color, fontSize){
        if (this.cachedTextures.get(text) == null){
            this.generateImageFromText(game, text,fontSize);
        }
        var texture = this.cachedTextures.get(text);
        if (texture.dirty) return;
        game.gl.col = color;
        game.gl.img(texture.tex,0,0,512,512,0,x,y,1,1, 0,0,1,1);
    }

    showUpgrade(game){
        if (this.cachedTextures.get("panel") == null){
            this.generateSquare(game, 22,10,"panel",16);
        }
        var texture = this.cachedTextures.get("panel");

        if (this.upgrade1 == null) this.upgrade1 = new Button(game,this.cachedTextures,this,(W/2)-150,(H/2)-150,"Increased", "range",true);
        if (this.upgrade2 == null) this.upgrade2 = new Button(game,this.cachedTextures,this,(W/2)+40,(H/2)-150,"Stronger", "bullets",false);

        if (texture.dirty || this.upgrade1.isDirty() || this.upgrade2.isDirty()) return;

        game.gl.col = 0xffffffff;
        game.gl.img(texture.tex,0,0,1,1,0,(W/2)-170,(H/2)-250,512,512, 0,0,1,1);

        this.upgrade1.render(game,this);
        this.upgrade2.render(game,this);

        this.showText(game,"Select an upgrade:",(W/2)-106,(H/2)-240,0xffffffff,22);        
    }

    generateSquare(game, width,height,name, fontSize=16){
        var textCanvas = document.getElementById('t');
        textCanvas.width = textCanvas.height = 512;
        var textContext = textCanvas.getContext('2d');

        textContext.font = "normal "+fontSize+"px monospace";
        textContext.fillStyle = "white";

        // Top line
        textContext.fillText("+",0,20);
        for (let w = 1; w < width; w++) {
            textContext.fillText("-",w*fontSize,20)
        }
        textContext.fillText("+",fontSize*width,20);

        // Sides
        for (let h = 1; h < height; h++){
            textContext.fillText("|",0,fontSize+h*(fontSize*1.5));
            textContext.fillText("|",fontSize*width,fontSize+h*(fontSize*1.5));
        }

        // Bottom line
        textContext.fillText("+",0,fontSize+height*(fontSize*1.5));

        for (let w = 1; w < width; w++) {
            textContext.fillText("-",w*fontSize,fontSize+height*(fontSize*1.5))
        }
        textContext.fillText("+",fontSize*width,fontSize+height*(fontSize*1.5));

        // Generate image to GL
        var image = new Image();
        image.src = textCanvas.toDataURL();

        var texture = new GlTexture(game.gl.g,image);
        this.cachedTextures.set(name,texture);
    }

    generateImageFromText(game,text,fontSize=32){
        var textCanvas = document.getElementById('t');
        textCanvas.width = textCanvas.height = TZ;
        var textContext = textCanvas.getContext('2d');
        textCanvas.imageSmoothingEnabled = false;
        textContext.imageSmoothingEnabled = false;
        textContext.globalAlpha = 1.0
        textContext.font = "normal "+fontSize+"px monospace";
        textContext.fillStyle = "white";
        textContext.fillText(text,0,30);
        var image = new Image();
        image.src = textCanvas.toDataURL();

        var texture = new GlTexture(game.gl.g,image);
        this.cachedTextures.set(text,texture);

    }
}

export default GameOverlay