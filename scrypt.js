let inputDirection = { x: 0, y: 0 };
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let gameSound = new Audio('music.mp3');
let score = 0;
let highScore = window.localStorage.getItem("High Score");
highScoreBox.innerHTML = " High Score : " + highScore;
let speed = 4;
let up = document.getElementById('upArrow');
let down = document.getElementById('downArrow');
let left = document.getElementById('leftArrow');
let right = document.getElementById('rightArrow');
let lastPaintTime = 0;
let snakeArr = [
    { x: Math.round(1 + (20 - 1) * Math.random()), y: Math.round(1 + (20 - 1) * Math.random()) }
]
let food = { x: Math.round(1 + (20 - 1) * Math.random()), y: Math.round(1 + (20 - 1) * Math.random()) };

function main(currTime) {
    speed = (score / 5) + 4;
    window.requestAnimationFrame(main);
    if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currTime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true;
        }
    }
    if (snake[0].x <= 0 || snake[0].y <= 0 || snake[0].y > 20 || snake[0].x > 20) {
        return true;
    }
}

function gameEngine() {

    // gameSound.play();

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameSound.pause();
        inputDirection = { x: 0, y: 0 };
        alert("game over press any key to play again");
        snakeArr = [
            { x: 2, y: 2 }
        ]
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
    }

    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        let a = 1;
        let b = 20;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score += 1;
        scoreBox.innerHTML = "Score : " + score;
        if (score > highScore) {
            highScore = score;
        }
        window.localStorage.clear();
        window.localStorage.setItem("High Score", highScore);
        highScoreBox.innerHTML = " High Score : " + highScore;
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
            if(inputDirection.x == 0 && inputDirection.y == 1){
                snakeElement.classList.add('head');
            }

            if(inputDirection.x == 0 && inputDirection.y == -1){
                snakeElement.classList.add('headUp');
            }

            if(inputDirection.x == 1 && inputDirection.y == 0){
                snakeElement.classList.add('headRight');
            }

            if(inputDirection.x == -1 && inputDirection.y == 0){
                snakeElement.classList.add('headLeft');
            }
        }
        else {
            snakeElement.classList.add('middle');
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

up.addEventListener('click', () => {
    moveSound.play();
    if (inputDirection.y != 1) {
        inputDirection.x = 0;
        inputDirection.y = -1;
    }
})

down.addEventListener('click', () => {
    moveSound.play();
    if (inputDirection.y != -1) {
        inputDirection.x = 0;
        inputDirection.y = 1;
    }
})

left.addEventListener('click', () => {
    moveSound.play();
    if (inputDirection.x != 1) {
        inputDirection.x = -1;
        inputDirection.y = 0;
    }
})

right.addEventListener('click', () => {
    moveSound.play();
    if (inputDirection.x != -1) {
        inputDirection.x = 1;
        inputDirection.y = 0;
    }
})

window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            moveSound.play();
            if (inputDirection.y != 1) {
                inputDirection.x = 0;
                inputDirection.y = -1;
            }
            break;

        case "ArrowDown":
            moveSound.play();
            if (inputDirection.y != -1) {
                inputDirection.x = 0;
                inputDirection.y = 1;
            }
            break;

        case "ArrowLeft":
            moveSound.play();
            if (inputDirection.x != 1) {
                inputDirection.x = -1;
                inputDirection.y = 0;
            }
            break;

        case "ArrowRight":
            moveSound.play();
            if (inputDirection.x != -1) {
                inputDirection.x = 1;
                inputDirection.y = 0;
            }
            break;

        default:
            break;
    }
})