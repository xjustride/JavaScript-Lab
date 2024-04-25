const ball = document.querySelector('#ball');
const box = document.querySelector('#box');

document.addEventListener("DOMContentLoaded", function() {
  const ball = document.querySelector('#ball');
  const hole = document.querySelector('#hole');
  const box = document.querySelector('#box');
  let dx = 2; // Change in x-coordinate (speed and direction)
  let dy = 2; // Change in y-coordinate (speed and direction)

  function moveBall() {
      let rect = ball.getBoundingClientRect();
      let boxRect = box.getBoundingClientRect();
      let holeRect = hole.getBoundingClientRect();

      // Check for collisions with the box
      if (rect.bottom >= boxRect.bottom || rect.top <= boxRect.top) {
          dy = -dy;
      }
      if (rect.right >= boxRect.right || rect.left <= boxRect.left) {
          dx = -dx;
      }

      // Check if the ball is in the hole
      if (rect.top < holeRect.bottom && rect.bottom > holeRect.top &&
          rect.left < holeRect.right && rect.right > holeRect.left) {
          alert('You win!');
          clearInterval(interval); // Stop the game
      }

      // Move the ball
      ball.style.left = rect.left - boxRect.left + dx + 'px';
      ball.style.top = rect.top - boxRect.top + dy + 'px';
  }

  // Move the ball every 10ms
  let interval = setInterval(moveBall, 10);
});
