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

  console.log(msg);
}

// Listen to and handle speech event
recognition.addEventListener("result", onSpeak);
