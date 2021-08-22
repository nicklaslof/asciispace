#!/usr/bin/env node
//Compiles the level image to two text files. One with the leveltiles and the other one with metadata using the alpha value of the color.
//The resulting files will be 8kb but zip will compress them alot resulting in two files much smaller than using the png itself.
const { createCanvas, loadImage,ImageData } = require('canvas');
const width = 1024;
const height = 20;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
canvas.imageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

let level = new Array(width*height);
level.fill("x");
let metaData = new Array(width*height);
metaData.fill("x");

loadImage("level.png").then((image) => {
    ctx.drawImage(image, 0, 0);
        //Draw the image and then loop over it
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                //console.log(x+" "+y);
                //Get the color of the pixel
                let c = new Uint32Array(ctx.getImageData(x, y, 1, 1).data.buffer);
                //Bit shift the color to extract just the alpha value
                let alpha = (c >>> 24 );
                //If we have an alpha value save it to the metadata values using the matching asciicode of the alpha value. Also substract 126 from the asciivalue to avoid using weird characters (had some issues with this)
                if (alpha != 0 && alpha < 255){
                    addToLevel(metaData,x,y,String.fromCharCode(126-(255-alpha)));
                    let b = 126-(255-alpha);
                }
                //Bitmask the color so we don't have to use the alpha value in the rest of the checks
                c = (c & 0x0FFFFFF);

                //Based on the color set an asciicharacter in the level textfile
                if (c == 0xffffff) addToLevel(level,x,y,"#"); // Ground
                if (c == 0xaaaaaa) addToLevel(level,x,y,"."); // Below ground 

                if (c == 0x3333ff) addToLevel(level,x,y,"A"); // Sineball movements
                if (c == 0x0000ff) addToLevel(level,x,y,"B"); // Formation 1
                if (c == 0x6666ff) addToLevel(level,x,y,"C"); // Formation 2
                if (c == 0x9999ff) addToLevel(level,x,y,"D"); // Formation 3
                if (c == 0xff0000) addToLevel(level,x,y,"U"); // UFO formation
                if (c == 0x00ffff) addToLevel(level,x,y,"M"); // Boss1

                if (c == 0xee4feb) addToLevel(level,x,y,"a"); // Shooter 1
                if (c == 0xaa4feb) addToLevel(level,x,y,"b"); // Shooter 2
                if (c == 0x774feb) addToLevel(level,x,y,"c"); // Shooter 3

            }
        }
    
        saveLevel("../src/l.txt",getLevelString(level));
        saveLevel("../src/m.txt",getLevelString(metaData));
});

// Save the metadata and level data to a text file that will be used in the game.
function saveLevel(filename, data){
    fs = require('fs');
    fs.writeFile(filename, data, "ascii", function (err) {
        if (err) return console.log(err);
        console.log("save successfully");
      });   
}

function addToLevel(level,x,y,data){
    //if (x == 33 && y == 3) console.log(x+" "+ y +" " +data);
    console.log(x+ " "+y+" "+data);
    level[x + (y*width)] = data;
}

function getLevelString(level){
    let txt = "";
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            txt += level[y + (x*height)];
        }
    }
    return txt;
}

