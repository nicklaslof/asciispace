import Game from "./game.js";

var game = new Game();
gameloop();

function gameloop(){
    requestAnimationFrame(gameloop);
    game.gameloop();
}