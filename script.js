const msgEl = document.getElementById("msg");

// Generate random number
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = generateRandomNumber();
console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();

//Start recognition and game
recognition.start();

// Capture user speech
function onSpeak(event) {
  const msg = event.results[0][0].transcript;
  writeMessage(msg);
}

// Listen to and handle speech event
recognition.addEventListener("result", onSpeak);

// See in the DOM what the user has spoken
function writeMessage(msg) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  span.classList.add("box");
  span.textContent = msg;
  msgEl.append(div, span);
}
