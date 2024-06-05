const box = document.querySelector('.box'); 
let ball = document.querySelector('#ball'); 
const hole = document.querySelector('#hole'); 
const scoreDisplay = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');
const recordDisplay = document.querySelector('#record');

let ballX = 275; 
let ballY = 300; 
let velocityX = 0; 
let velocityY = 0; 
let score = 0;
let timer = 0;
let record = localStorage.getItem('record') || 0;

recordDisplay.textContent = `Rekord: ${record}`;

function moveBallByRotation(event) {
    const { alpha, beta, gamma } = event; 
    const maxVelocity = 20;

    velocityX = (gamma / 90) * maxVelocity; 
    velocityY = (beta / 180) * maxVelocity; 
}

function updatePosition() {
    ballX += velocityX; 
    ballY += velocityY; 

    if (ballX <= 0) {
        ballX = 0;
        velocityX = -velocityX;
    }
    if (ballX + 50 >= 600) {
        ballX = 550;
        velocityX = -velocityX;
    }
    if (ballY <= 0) {
        ballY = 0;
        velocityY = -velocityY;
    }
    if (ballY + 50 >= 600) {
        ballY = 550;
        velocityY = -velocityY;
    }

    const holeRect = hole.getBoundingClientRect(); 
    const ballRect = ball.getBoundingClientRect(); 

    if (ballRect.left >= holeRect.left && ballRect.right <= holeRect.right &&
        ballRect.top >= holeRect.top && ballRect.bottom <= holeRect.bottom) {
        score++;
        scoreDisplay.textContent = `Wynik: ${score}`;
        resetGame();
    }

    ball.style.left = `${ballX}px`; 
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(updatePosition);
}

function resetGame() {
    ballX = 275; 
    ballY = 300; 
    velocityX = 0; 
    velocityY = 0;
    repositionHole();
}

function repositionHole() {
    const boxWidth = 600;
    const boxHeight = 600;
    const holeSize = 50;

    const newHoleX = Math.random() * (boxWidth - holeSize);
    const newHoleY = Math.random() * (boxHeight - holeSize);

    hole.style.left = `${newHoleX}px`; 
    hole.style.top = `${newHoleY}px`;
}

function startTimer() {
    setInterval(() => {
        timer++;
        timerDisplay.textContent = `Czas: ${timer}`;
        if (timer >= 60) {
            clearInterval();
            checkRecord();
            alert(`Czas minął! Twój wynik: ${score}`);
            resetGame();
            timer = 0;
            score = 0;
            scoreDisplay.textContent = `Wynik: ${score}`;
            timerDisplay.textContent = `Czas: ${timer}`;
        }
    }, 1000);
}

function checkRecord() {
    if (score > record) {
        record = score;
        localStorage.setItem('record', record);
        recordDisplay.textContent = `Rekord: ${record}`;
    }
}

window.addEventListener('deviceorientation', moveBallByRotation);

requestAnimationFrame(updatePosition);
startTimer();
