const ball = document.getElementById('ball');
const box = document.getElementById('box');

let x = 0, y = 0;
let vx = 2, vy = 2;
const gravity = 0.1; 

function animate() {
  vy += gravity;
  
  let newX = x + vx;
  let newY = y + vy;
  
  if (newX + ball.offsetWidth > box.offsetWidth || newX < 0) {
    vx *= -1;
    newX = newX < 0 ? 0 : box.offsetWidth - ball.offsetWidth;
  }
  if (newY + ball.offsetHeight > box.offsetHeight || newY < 0) {
    vy *= -1;
    newY = newY < 0 ? 0 : box.offsetHeight - ball.offsetHeight;
  }

  x = newX;
  y = newY;
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';

  requestAnimationFrame(animate);
}

window.addEventListener('deviceorientation', (event) => {
  const { beta, gamma } = event;

  vx += gamma * 0.05; // zwiększenie prędkości w poziomie zależnie od przechyłu w osi y
  vy += beta * 0.05; // zwiększenie prędkości w pionie zależnie od przechyłu w osi x
});

animate(); // rozpoczęcie animacji
