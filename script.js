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
  checkNumber(msg);
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

// Check msg against the secret number
function checkNumber(msg) {
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
    console.log(`adjusting ${msg} to ${wordToNumber[msg]}`);
    msg = wordToNumber[msg];
  }

  let num = Number(msg);

  // Check if the spoken content is a valid number
  if (Number.isNaN(num)) {
    const div = document.createElement("div");
    div.textContent = "Crystal Ball doesn't believe that’s a number, try again";
    msgEl.append(div);
    return;
  }

  // Check if it's in range
  if (num < 1 || num > 100) {
    const div = document.createElement("div");
    div.textContent =
      "Number must be between 1 and 100, the spectrum of mystics";
    msgEl.append(div);
    return;
  }

  // Check the number and provide feedback
  if (num === randomNum) {
    const h2 = document.createElement("h2");
    h2.textContent = `ALAS IT IS CORRECT! ALL HAIL THE ONE! The number was ${num}`;

    const button = document.createElement("button");
    button.classList.add("play-again");
    button.id = "play-again";
    button.textContent = "Play Again";

    msgEl.append(h2, button);
  } else if (num > randomNum) {
    const div = document.createElement("div");
    div.textContent = "Crystal Ball says it's Too high, Try again";

    msgEl.append(div);
  } else {
    const div = document.createElement("div");
    div.textContent = "GO HIGHER Psychics don't think that low";

    msgEl.append(div);
  }
}
