const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const numBallsInput = document.querySelector('#numBalls');
const distanceInput = document.querySelector('#distance');
const forceInput = document.querySelector('#force');

let balls = [];
let animationFrameId;
let numBalls = parseInt(numBallsInput.value);
let maxDistance = parseInt(distanceInput.value);
let force = parseInt(forceInput.value);
let mouseX = 0;
let mouseY = 0;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createBalls(count) {
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

        let dx = ball.x - mouseX;
        let dy = ball.y - mouseY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
            let angle = Math.atan2(dy, dx);
            let attractionForce = (maxDistance - distance) / maxDistance * force;
            ball.vx += Math.cos(angle) * attractionForce;
            ball.vy += Math.sin(angle) * attractionForce;
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

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    balls = balls.filter(ball => {
        let dx = ball.x - clickX;
        let dy = ball.y - clickY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < ball.radius) {
            createBalls(2);
            return false;
        }
        return true;
    });
});

startButton.addEventListener('click', () => {
    numBalls = parseInt(numBallsInput.value);
    maxDistance = parseInt(distanceInput.value);
    force = parseInt(forceInput.value);
    balls = [];
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
    balls = [];
});

createBalls(numBalls);
animate();
