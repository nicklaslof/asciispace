import Game from "./game.js";
window.onload = function () {
    /*document.getElementById("s").addEventListener("click", (e) => {
        e.target.style.display = "none";
        var game = new Game();
        gameloop();
        
        function gameloop(){
            requestAnimationFrame(gameloop);
            game.gameloop();
        }
    });*/
    var game = new Game();
        gameloop();
        
        function gameloop(){
            requestAnimationFrame(gameloop);
            game.gameloop();
        }
};
