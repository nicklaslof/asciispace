//WebGL reprentation of an image or the target of a framebuffer
class GlTexture {
    constructor(gl, image) {
        this.dirty = true;
        this.tex = gl.createTexture();
        if (image == null){
            gl.bindTexture(gl.TEXTURE_2D, this.tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, W, H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            this.setupTexture(gl);
        }else{
            image.onload  = () =>{
                gl.bindTexture(gl.TEXTURE_2D, this.tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                this.setupTexture(gl);
                this.tex.width = TZ;
                this.tex.height = TZ;
                this.dirty = false;
            };
        }
        
    }

    setupTexture(gl){
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
}

export default GlTexture;