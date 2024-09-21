//Complete the given scaffold to implement all the functionalities mentioned in the problem Statement.
const sentences = `The quick brown fox jumps over the lazy dog.
  Sphinx of black quartz, judge my vow.
  Pack my box with five dozen liquor jugs.
  How vexingly quick daft zebras jump!`;

let timer;
let seconds = 4;
const guessInput = document.getElementById("input");
const start = document.getElementById("start-btn");
const retry = document.getElementById("retry-btn");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");

function displayContent() {
  const descriptionElement = document.getElementById("description");
  descriptionElement.textContent = sentences;
  // timerElement.textContent = `Time: ${seconds}s`;
}

function startTimer() {
  timer = setInterval(() => {
    seconds--;

    timerElement.textContent = `00:${seconds}`;
    if (seconds <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  guessInput.disabled = true;
  start.disabled = true;
  timerElement.textContent = "00:00";
  resultElement.style.display = "block";

  calculateResult();
}

function calculateResult() {
  const inputText = guessInput.value.trim();
  const sentenceText = sentences.trim();

  // Calculate Words Per Minute (WPM)
  const wordsTyped = inputText.split(" ").length;
  const wpm = Math.round((wordsTyped / 10) * 60); // Assuming game is 10 seconds

  // Calculate accuracy (optional)
  let correctChars = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === sentenceText[i]) {
      correctChars++;
    }
  }
  const accuracy = Math.round((correctChars / sentenceText.length) * 100);

  // Update the result section
  document.getElementById("speed").textContent = wpm;
  document.getElementById("accuracy").textContent = accuracy;
}

start.addEventListener("click", () => {
  document.getElementById("input").disabled = false;
  timerElement.textContent = `00:${seconds}`;
  startTimer();
});

retry.addEventListener("click", () => {
  start.disabled = false;
  guessInput.value = "";
  guessInput.focus();
  seconds = 4;
});

document.addEventListener("DOMContentLoaded", () => {
  displayContent();
});
