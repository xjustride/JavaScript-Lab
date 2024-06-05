const box = document.querySelector('.box'); 
let ball = document.querySelector('#ball'); 
const hole = document.querySelector('#hole'); 
const scoreDisplay = document.querySelector('#score'); 

let ballX = 275; // Początkowa pozycja X piłki
let ballY = 300; // Początkowa pozycja Y piłki
let velocityX = 0; // Początkowa prędkość X piłki
let velocityY = 0; // Początkowa prędkość Y piłki
let score = 0; // Początkowy wynik

function moveBallByRotation(event) {
    const { alpha, beta, gamma } = event; // Pobierz wartości kątów alpha, beta i gamma z obiektu event
    const maxVelocity = 20; // Maksymalna prędkość piłki

    velocityX = (gamma / 90) * maxVelocity; // Oblicz prędkość X piłki na podstawie kąta gamma
    velocityY = (beta / 180) * maxVelocity; // Oblicz prędkość Y piłki na podstawie kąta beta
}

function updatePosition() {
    ballX += velocityX; // Zaktualizuj pozycję X piłki na podstawie prędkości X
    ballY += velocityY; // Zaktualizuj pozycję Y piłki na podstawie prędkości Y

    if (ballX <= 0) { // Jeśli piłka dotyka lewej krawędzi
        ballX = 0; // Ustaw pozycję X piłki na 0
        velocityX = -velocityX; // Odwróć prędkość X piłki
    }
    if (ballX + 50 >= 600) { // Jeśli piłka dotyka prawej krawędzi
        ballX = 550; // Ustaw pozycję X piłki na 550
        velocityX = -velocityX; // Odwróć prędkość X piłki
    }
    if (ballY <= 0) { // Jeśli piłka dotyka górnej krawędzi
        ballY = 0; // Ustaw pozycję Y piłki na 0
        velocityY = -velocityY; // Odwróć prędkość Y piłki
    }
    if (ballY + 50 >= 600) { // Jeśli piłka dotyka dolnej krawędzi
        ballY = 550; // Ustaw pozycję Y piłki na 550
        velocityY = -velocityY; // Odwróć prędkość Y piłki
    }

    const holeRect = hole.getBoundingClientRect(); // Pobierz prostokątne wymiary elementu hole
    const ballRect = ball.getBoundingClientRect(); // Pobierz prostokątne wymiary elementu ball

    if (ballRect.left >= holeRect.left && ballRect.right <= holeRect.right &&
        ballRect.top >= holeRect.top && ballRect.bottom <= holeRect.bottom) { // Jeśli piłka znajduje się wewnątrz elementu hole
        score++; // Zwiększ wynik o 1
        scoreDisplay.textContent = `Wynik: ${score}`; // Zaktualizuj wyświetlany wynik
        resetGame(); // Zresetuj grę
    }

    ball.style.left = `${ballX}px`; // Ustaw pozycję X piłki na podstawie ballX
    ball.style.top = `${ballY}px`; // Ustaw pozycję Y piłki na podstawie ballY

    requestAnimationFrame(updatePosition); // Wywołaj funkcję updatePosition w następnym cyklu animacji
}

function resetGame() {
    ballX = 275; // Przywróć początkową pozycję X piłki
    ballY = 300; // Przywróć początkową pozycję Y piłki
    velocityX = 0; // Zatrzymaj piłkę w miejscu
    velocityY = 0; // Zatrzymaj piłkę w miejscu
    repositionHole(); // Przesuń element hole w losowe miejsce
}

function repositionHole() {
    const boxWidth = 600; // Szerokość obszaru gry
    const boxHeight = 600; // Wysokość obszaru gry
    const holeSize = 50; // Rozmiar elementu hole

    const newHoleX = Math.random() * (boxWidth - holeSize); // Losowa pozycja X dla elementu hole
    const newHoleY = Math.random() * (boxHeight - holeSize); // Losowa pozycja Y dla elementu hole

    hole.style.left = `${newHoleX}px`; // Ustaw pozycję X elementu hole na podstawie newHoleX
    hole.style.top = `${newHoleY}px`; // Ustaw pozycję Y elementu hole na podstawie newHoleY
}

window.addEventListener('deviceorientation', moveBallByRotation); // Nasłuchuj zdarzenia 'deviceorientation' i wywołaj funkcję moveBallByRotation

requestAnimationFrame(updatePosition); // Wywołaj funkcję updatePosition w następnym cyklu animacji
