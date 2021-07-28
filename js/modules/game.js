import * as BG from "./background.js";                  //Background
import * as SNAKE from "./snake.js";                    //Snake
import * as APPLE from "./apple.js";                    //Apple


//*****************************************************************************************************
// IMPORTANT VARIABLES
//*****************************************************************************************************
//Is the game loop running but not updating?
let gamePaused = true;
//Trigger the game loop breaker to end the loop
let gameOverBreaker = false;
let backToMenuBreaker = false;
//Player's score
let score = 0;
//Get the scoreboard
let scoreboard = document.getElementById("Score");

function updateScore() {
    scoreboard.innerText = score;
}

//Start game message
let startMessage = document.getElementById("Start-Game-Message");
//Paused game message
let pausedMessage = document.getElementById("Paused-Game-Message");







//*****************************************************************************************************
// CANVAS SETUP
//*****************************************************************************************************
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 900;             //Max width resolution
canvas.height = 540;            //Max height resolution







//*****************************************************************************************************
// BACKGROUND SETUP
//*****************************************************************************************************
let rows = 25;
let columns = 43;
//Create instance of background
const background = new BG.Background(canvas, ctx, 20, 20, rows, columns);
//Create background checkerboard array
background.createBackground();







//*****************************************************************************************************
// SNAKE SETUP
//*****************************************************************************************************
//Default snake X and Y Positions
let snakeX = 220;               //Offset to the left; Arbitrary
let snakeY = 260;               //Middle Row; (Rows / 2 + 0.5) * 20
//How fast is the snake?
let snakeSpeed = 8;
//Length of snake
let snakeLength = 3;
//Create instance of Snake
const snake = new SNAKE.Snake(canvas, ctx, 20, 20, snakeX, snakeY);
//Create a snake with 3 sections on load
snake.createSnake(snakeLength);
//Set the borders for the snake
snake.getBorders(20, 20, canvas.width - 40, canvas.height - 40);







//*****************************************************************************************************
// APPLE SETUP
//*****************************************************************************************************
//Default apple X and Y positions
let appleX = 440;               //Offset to the right
let appleY = snakeY;            //Same as snake
//Create instance of Apple
const apple = new APPLE.Apple(canvas, ctx, 20, 20, appleX, appleY);

//Check for if the snake has eaten the apple
function checkForApple() {
    if (snake.getSnakeHead().x === apple.getApple().x &&
        snake.getSnakeHead().y === apple.getApple().y) {
        return true;
    }
    else {
        return false;
    }
}







//*****************************************************************************************************
// CONTROLS
//*****************************************************************************************************
//Object to store key values
let key = {
    up: false,
    down: false,
    left: false,
    right: false
}
//Store quick key presses
let keyQueue = [];

//Key down event
window.addEventListener("keydown", function(e) {
    //Toggle gamePaused
    if (e.code === "Space") {
        if (gamePaused) {
            //Toggle boolean
            gamePaused = false;
            //Remove start message if needed
            startMessage.classList.add("hide-message");
            //Remove paused message
            pausedMessage.classList.add("hide-message");
        }
        else {
            //Toggle boolean
            gamePaused = true;
            //Show paused message
            pausedMessage.classList.remove("hide-message");
        }
    }

    //Only register key presses while game is playing
    if (!gamePaused) {
        if (e.code === "ArrowUp") {
            key = {
                up: true,
                down: false,
                left: false,
                right: false
            }
            keyQueue.push(key);
        }
        else if (e.code === "ArrowDown") {
            key = {
                up: false,
                down: true,
                left: false,
                right: false
            }
            keyQueue.push(key);
        }
        else if (e.code === "ArrowLeft") {
            key = {
                up: false,
                down: false,
                left: true,
                right: false
            }
            keyQueue.push(key);
        }
        else if (e.code === "ArrowRight") {
            key = {
                up: false,
                down: false,
                left: false,
                right: true
            }
            keyQueue.push(key);
        }
    }
        
});

//Key up event
window.addEventListener("keyup", function(e) {
    if (e.code === "ArrowUp" ||
        e.code === "ArrowDown" ||
        e.code === "ArrowLeft" ||
        e.code === "ArrowRight") {
        key = {
            up: false,
            down: false,
            left: false,
            right: false
        }
    }
});







//*****************************************************************************************************
// GO BACK TO MENU
//*****************************************************************************************************
let menuBtn = document.getElementById("Menu-Btn");
let menuCntr = document.getElementById("Menu-Cntr");
let backToMenuModal = document.getElementById("Back-To-Menu-Modal");
let yesBtn = document.getElementById("Yes-Btn");
let noBtn = document.getElementById("No-Btn");

menuBtn.addEventListener("click", function() {
    if (gameOverModal.classList.contains("hide-modal")) {
        //Pause the game
        gamePaused = true;
        pausedMessage.classList.remove("hide-message");

        //Show modal
        backToMenuModal.classList.remove("hide-modal");

        function closeModal() {
            backToMenuModal.classList.add("hide-modal");
        }

        function backToMenu() {
            //Trigger loop breaker
            backToMenuBreaker = true;

            pausedMessage.classList.add("hide-message");

            //Rehide the modal
            menuCntr.classList.remove("hide-menu");

            //Close modal
            closeModal();
            //Remove event listeners
            removeListeners();
        }

        function backToGame() {
            //Close modal
            closeModal();
            //Remove event listeners
            removeListeners();
        }

        function removeListeners() {
            yesBtn.removeEventListener("click", backToMenu);
            noBtn.removeEventListener("click", backToGame);
        }

        yesBtn.addEventListener("click", backToMenu);
        noBtn.addEventListener("click", backToGame);
    }
        
})







//*****************************************************************************************************
// GAME OVER MODAL
//*****************************************************************************************************
//Game over modal
let gameOverModal = document.getElementById("Game-Over-Modal");
let playAgainBtn = document.getElementById("Player-Again-Btn");
let finalScore = document.getElementById("Final-Score");

function showGameOver() {
    //Update final score
    finalScore.innerText = score;

    //Show the game over modal
    gameOverModal.classList.remove("hide-modal");

    //Hide game over modal
    function hideModal() {
        gameOverModal.classList.add("hide-modal");
    }

    //Reset the game when play button is clicked
    function playAgain() {
        //Reset and restart the game
        resetGame();
        restartLoop();

        hideModal();

        removeListeners();
    }

    //Remove any event listeners
    function removeListeners() {
        playAgainBtn.removeEventListener("click", playAgain);
    }

    //Add event listener for the play again button
    playAgainBtn.addEventListener("click", playAgain);
}







//*****************************************************************************************************
// RESET GAME
//*****************************************************************************************************
export function resetGame() {
    //Reset variables
    gamePaused = true;
    gameOverBreaker = false;
    backToMenuBreaker = false;
    //Reset score and scoreboard
    score = 0;
    scoreboard.innerText = score;
    finalScore.innerText = score;
    //Reset starting message
    startMessage.classList.remove("hide-message");
    //Reset the snake
    snake.resetSnake(snakeLength, snakeX, snakeY);
    //Reset the apple
    apple.resetApple(appleX, appleY);
}

function restartLoop() {
    //Restart the game loop
    requestAnimationFrame(gameLoop);
}







//*****************************************************************************************************
// THE GAME LOOP
//*****************************************************************************************************
//Time variables
let secondsPassed;
let oldTimeStamp;
//Keep track of iterations
let loop = 0;

export function gameLoop(timestamp) {
    //----------------------------- TIME UPDATES -----------------------------
    //Calculate how much time has passed
    secondsPassed = (timestamp - oldTimeStamp) / 1000;
    oldTimeStamp = timestamp;

    //If secondsPassed is NaN; Set to 0
    if (isNaN(secondsPassed)) {
        secondsPassed = 0;
    }

    //Prevent time jumps
    if (secondsPassed > 0.1) {
        secondsPassed = 0.017;
    }

    //----------------------------- CANVAS FUNCTIONS -----------------------------
    //----------- CLEAR PREVIOUS FRAME -----------
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    


    //----------- BACKGROUND -----------
    background.draw();



    //----------- APPLE -----------
    if (checkForApple()) {
        //Increase snake size
        snake.increaseSize();
        //Update the apple and compare with snake
        apple.update(snake.snakeArray, rows, columns);
        //Update score
        score++;
    }
    apple.draw();


    //----------- SNAKE -----------
    if (loop % snakeSpeed === 0) {
        //Update the snake
        snake.updateDirection(keyQueue[0]);
        snake.update(gamePaused);
        //Remove front of array
        keyQueue.shift();
    }
    snake.draw();

    //Trigger loop breaker if snake hit wall or self
    if (snake.checkHitSelf() || snake.checkHitWall()) {
        gameOverBreaker = true;
    }



    //----------- UPDATE LOOP TRACKER -----------
    if (!gamePaused) {
        loop++;
    }


    //----------- UPDATE SCORE -----------
    updateScore();

    //----------- GAME LOOP BREAKERS -----------
    if (gameOverBreaker === true) {
        //Reset variables
        gameOverBreaker = false;
        //Show game over modal
        showGameOver();
        //Break out of loop
        return;
    }

    if (backToMenuBreaker === true) {
        return;
    }

    //----------- RECURSION LOOP -----------
    requestAnimationFrame(gameLoop);
}