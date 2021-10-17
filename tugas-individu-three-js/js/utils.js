function rand(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return min + (max - min) * Math.random();
}

const colors = [
  0xffb703, 
  0x219ebc, 
  0x999a9b, 
  0x1e2019, 
  0x13ff25, 
  0x13ffff, 
  0xcd03ff,
  0xff0310,
];

function randomColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

let logScore = document.getElementById("highScore");
const highScore = localStorage.getItem("highScore");

logScore.textContent = highScore;

function playAudio() {
  let audio = new Audio("audio/ding.mp3");
  audio.play();
}

let score = 0;

function addScore() {
  score += 1;

  if (highScore === null || highScore <= score) {
    localStorage.setItem("highScore", JSON.stringify(score));
  }

  document.getElementById("score").textContent = score;

  playAudio();
}

let logColor = document.getElementById("log");

function changeLogColor(hex) {
  logColor.textContent = hex;
  logColor.style.color = "#" + hex;
}

function resetLogColor() {
  logColor.textContent = "none";
  logColor.style.color = "#000000";
}
