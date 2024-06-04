const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const numBallsInput = document.querySelector('#numBalls');
const distanceInput = document.querySelector('#distance');

let balls = [];
let animationFrameId;
let numBalls = parseInt(numBallsInput.value);
let maxDistance = parseInt(distanceInput.value);

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createBalls(count) {
    balls = [];
    for (let i = 0; i < count; i++) {
        balls.push({
            x: random(0, canvas.width),
            y: random(0, canvas.height),
            vx: random(-2, 2),
            vy: random(-2, 2),
            radius: 5,
            color: `rgb(${Math.floor(random(0, 255))}, ${Math.floor(random(0, 255))}, ${Math.floor(random(0, 255))})`
        });
    }
}

function updateBalls() {
    for (let ball of balls) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.vx *= -1;
        }

        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.vy *= -1;
        }
    }
}

function drawBalls() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let dx = balls[i].x - balls[j].x;
            let dy = balls[i].y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function animate() {
    updateBalls();
    drawBalls();
    animationFrameId = requestAnimationFrame(animate);
}

startButton.addEventListener('click', () => {
    numBalls = parseInt(numBallsInput.value);
    maxDistance = parseInt(distanceInput.value);
    createBalls(numBalls);
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animate();
});

resetButton.addEventListener('click', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

createBalls(numBalls);
animate();
