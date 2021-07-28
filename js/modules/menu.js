import { gameLoop, resetGame } from "./game.js";                 //Import game loop function

let menuCntr = document.getElementById("Menu-Cntr");
let playBtn = document.getElementById("Play-Btn");

playBtn.addEventListener("click", function() {
    //Hide the menu
    menuCntr.classList.add("hide-menu");

    //Reset game variables
    resetGame();

    //Start the game
    requestAnimationFrame(gameLoop);
});


let controlsCntr = document.getElementById("Controls-Cntr");
let showControlsBtn = document.getElementById("Show-Controls-Menu");
let exitBtn = document.getElementById("Exit-Btn");

showControlsBtn.addEventListener("click", function() {
    controlsCntr.classList.remove("hide-controls");
});

exitBtn.addEventListener("click", function() {
    controlsCntr.classList.add("hide-controls");
})