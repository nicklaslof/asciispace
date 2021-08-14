//WebGL reprentation of an image
class GlTexture {
    constructor(gl, image) {
        this.dirty = true;
        this.tex = gl.createTexture();
        image.onload  = () =>{
            gl.bindTexture(gl.TEXTURE_2D, this.tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            this.tex.width = TEXTURE_SIZE;
            this.tex.height = TEXTURE_SIZE;
            this.dirty = false;
        };
    }
}

export default GlTexture;