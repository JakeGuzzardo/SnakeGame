let blocksize = 16
let rows = 10;
let cols = 10;
let board;
let canvas;

let snakeX = blocksize * 0;
let snakeY = blocksize * 0;

let fruitX;
let fruitY;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

let gameOver = false;

let gameOverText = document.querySelector('div');
let restartButton = document.querySelector('button');
let text = document.querySelector('p');

restartButton.onclick = function () {
    gameOver = false;
    gameOverText.style.display = 'none';
    board.style.display = '';
    snakeX = blocksize * 0;
    snakeY = blocksize * 0;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    placeFruit();
}

window.onload = startGame();

function startGame() {
    gameOverText.style.display = 'none';
    board = document.querySelector('#board');
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    canvas = board.getContext("2d");

    placeFruit();
    document.addEventListener('keydown', changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {

    if (gameOver) {
        return;
    }

    canvas.fillStyle = "black";
    canvas.fillRect(0, 0, board.width, board.height);

    if (snakeX == fruitX && snakeY == fruitY) {
        snakeBody.push([fruitX, fruitY])
        snakeBody.push([fruitX, fruitY])
        placeFruit();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    canvas.fillStyle = "green";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    canvas.fillRect(snakeX, snakeY, blocksize, blocksize);

    for (let i = 0; i < snakeBody.length; i++) {
        canvas.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOverFunc();
        }
    }

    canvas.fillStyle = "red";
    canvas.fillRect(fruitX, fruitY, blocksize, blocksize);

    if (snakeX < 0 || snakeY < 0 || snakeX >= rows * blocksize || snakeY >= rows * blocksize) {
        gameOverFunc();
    }
    if(snakeBody.length >= rows*cols - 1){
        youWin();
    }
}


function gameOverFunc() {
    gameOver = true;
    //board.style.display = 'none';
    gameOverText.style.display = 'block';
}

function placeFruit() {
    fruitX = Math.floor(Math.random() * cols) * blocksize;
    fruitY = Math.floor(Math.random() * rows) * blocksize;
    if (fruitX == snakeX && fruitY == snakeY) {
        placeFruit();
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (fruitX == snakeBody[i][0] && fruitY == snakeBody[i][1]) {
            placeFruit();
        }
    }
}

function changeDirection(e) {
    if (e.code == "KeyW" && velocityY != 1) {
        velocityY = -1;
        velocityX = 0;
    } else if (e.code == "KeyS" && velocityY != -1) {
        velocityY = 1;
        velocityX = 0;
    } else if (e.code == "KeyD" && velocityX != -1) {
        velocityY = 0;
        velocityX = 1;
    } else if (e.code == "KeyA" && velocityX != 1) {
        velocityY = 0;
        velocityX = -1;
    }
}

function youWin(){
    gameOver = true;
    text.innerText = 'YOU WIN!';
    gameOverText.style.display = 'block';
}


