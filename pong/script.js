// DOM Elements
const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-to-menu-btn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Constants
const paddleWidth = 10;
const paddleHeight = 100;
const maxSpeed = 15;

// Game State
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;

let playerScore = 0;
let aiScore = 0;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  speedX: 5,
  speedY: 5,
};

let gameLoopId;

// Event Listeners
startBtn.onclick = () => {
  menuScreen.style.display = "none";
  gameScreen.style.display = "flex";
  resetGame();
  gameLoopId = requestAnimationFrame(gameLoop);
};

backBtn.onclick = () => {
  cancelAnimationFrame(gameLoopId);
  gameScreen.style.display = "none";
  menuScreen.style.display = "flex";
};

// Reset game (after score)
function resetGame(scoredBy = null) {
  if (scoredBy === "player") playerScore++;
  else if (scoredBy === "ai") aiScore++;

  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speedX = 5 * (Math.random() > 0.5 ? 1 : -1);
  ball.speedY = 5 * (Math.random() > 0.5 ? 1 : -1);
  playerY = canvas.height / 2 - paddleHeight / 2;
  aiY = canvas.height / 2 - paddleHeight / 2;
}

// Game Utility Functions
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawCenterLine() {
  const dashHeight = 10;
  const gap = 10;
  ctx.fillStyle = "#fff";
  for (let y = 0; y < canvas.height; y += dashHeight + gap) {
    ctx.fillRect(canvas.width / 2 - 1, y, 2, dashHeight);
  }
}

function drawScores() {
  ctx.fillStyle = "#fff";
  ctx.font = "32px Arial";
  ctx.fillText(playerScore, canvas.width / 4, 40);
  ctx.fillText(aiScore, (canvas.width * 3) / 4, 40);
}

// Game Update
function update() {
  // Move ball
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Bounce off top/bottom
  if (ball.y <= 0 || ball.y >= canvas.height) ball.speedY *= -1;

  // Player paddle collision
  if (
    ball.x - ball.radius <= paddleWidth &&
    ball.y >= playerY &&
    ball.y <= playerY + paddleHeight
  ) {
    ball.speedX *= -1.1;
    ball.speedY *= 1.05;
    clampBallSpeed();
  }

  // AI paddle collision
  if (
    ball.x + ball.radius >= canvas.width - paddleWidth &&
    ball.y >= aiY &&
    ball.y <= aiY + paddleHeight
  ) {
    ball.speedX *= -1.1;
    ball.speedY *= 1.05;
    clampBallSpeed();
  }

  // Scoring
  if (ball.x < 0) resetGame("ai");
  if (ball.x > canvas.width) resetGame("player");

  // AI movement
  const aiCenter = aiY + paddleHeight / 2;
  if (aiCenter < ball.y) aiY += 4;
  else aiY -= 4;
  aiY = Math.max(0, Math.min(canvas.height - paddleHeight, aiY));
}

// Clamp ball speed to avoid going too fast
function clampBallSpeed() {
  ball.speedX = Math.max(Math.min(ball.speedX, maxSpeed), -maxSpeed);
  ball.speedY = Math.max(Math.min(ball.speedY, maxSpeed), -maxSpeed);
}

// Game Render
function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#111"); // background
  drawCenterLine();
  drawRect(0, playerY, paddleWidth, paddleHeight, "#fff"); // player
  drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "#fff"); // AI
  drawCircle(ball.x, ball.y, ball.radius, "#fff"); // ball
  drawScores();
}

// Game Loop
function gameLoop() {
  update();
  render();
  gameLoopId = requestAnimationFrame(gameLoop);
}

// Mouse Control
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
  playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));
});
