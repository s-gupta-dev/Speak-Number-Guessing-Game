const msgEl = document.getElementById("msg");

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(event) {
  const msg = event.results[0][0].transcript; // You can log the event to view the structure of the data
  console.log(msg);

  writeMessage(msg);
  checkNumber(msg);
}

// Speak result
recognition.addEventListener("result", onSpeak);

// Write what user speaks
function writeMessage(msg) {
  const div = document.createElement("div");
  div.textContent = "You said: ";
  const span = document.createElement("span");
  span.classList.add("box");
  span.textContent = msg;

  msgEl.append(div, span);
}

// Check msg against the secret number
function checkNumber(msg) {
  // Update the value of num if it's a single-digit number
  const wordToNumber = {
    one: 1,
    won: 1,
    two: 2,
    to: 2,
    too: 2,
    three: 3,
    four: 4,
    for: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    ate: 8,
    nine: 9,
    ten: 10,
  };

  if (wordToNumber[msg]) {
    console.log(`Adjusting '${msg}' to ${wordToNumber[msg]}`);
    msg = wordToNumber[msg];
  } // Convert to number after adjustments
  const num = Number(msg);

  // Check if the spoken content is a valid number
  if (Number.isNaN(num)) {
    const div = document.createElement("div");
    div.textContent = "That is not a valid number";
    msgEl.innerHTML = "";
    msgEl.append(div);
    return;
  }
}
