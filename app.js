document.addEventListener('DOMContentLoaded', () => {
  const instructionContainer = document.querySelector('.instruction-container');
  const startButton = document.querySelector('.start-button');
  const gameDisplay = document.querySelector('.game-container');

  const bird = document.querySelector('.bird');

  const ground = document.querySelector('.ground-moving');
  const scoreDisplay = document.querySelector('.score');
  const highScoreDisplay = document.querySelector('.high-score');
  const reStartButton = document.querySelector(".reStartButton")

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 3;
  let isGameOver = false;
  let gap = 430;
  let score = 0;
  let highestScore = localStorage.getItem('highestScore') || 0;
  highScoreDisplay.textContent = highestScore;

  startButton.addEventListener("click",()=>{
      gameDisplay.style.display ="block"
      instructionContainer.style.display="none"
      startGame()
  })
  
  
  
  function startGame() {
    if (birdBottom > 0) {
      document.addEventListener('keyup', control);
      birdBottom -= gravity;
      bird.style.bottom = birdBottom + 'px';
      bird.style.left = birdLeft + 'px';
    } else { 
      gameOver()
    }
  }

  let gameTimerId = setInterval(startGame, 20);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
    console.log(birdBottom);
  }

  document.addEventListener('keyup', control);

  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');

    if (!isGameOver) {
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
    }

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.bottom = obstacleBottom + gap + 'px';

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + 'px';
      topObstacle.style.left = obstacleLeft + 'px';

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
        score += 1;
        scoreDisplay.textContent = score;
        if (score > highestScore) {
          highestScore = score;
          highScoreDisplay.textContent = highestScore;
          localStorage.setItem('highestScore', highestScore);
        }
      }

      if (
        obstacleLeft > 200 &&
        obstacleLeft < 280 &&
        birdLeft === 220 &&
        (birdBottom < obstacleBottom + 153 ||
          birdBottom > obstacleBottom + gap - 200) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }

    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }

  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    console.log('game over');
    isGameOver = true;
    document.removeEventListener('keyup', control);
    ground.classList.add('ground');
    ground.classList.remove('ground-moving');

    const gameOverMessage = document.createElement('div');
    gameOverMessage.classList.add('game-over');
    gameOverMessage.textContent = 'Game Over';
    gameDisplay.appendChild(gameOverMessage);

    localStorage.setItem('highestScore', highestScore);
  }
  

reStartButton.addEventListener("click",()=>{
  location.reload()
  // isGameOver = false;
  // startGame()
})



  

  
});
