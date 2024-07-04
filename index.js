const typeContainer = $(".typeContainer");
const totalErrorsSpan = $("#totalErrors");
const wpmSpan = $("#wpm");
let typeStartTime;
let typeEndTime;
let wpm = 0;
let userInput = [];
let started = false;
let keyCount = 0;
let totalErrors = 0;
let pastErrors = 0;
let totalCorrect = 0;
const typeArea = $("#typeArea");

//sample paragraph
const sample =
  "In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper (Matthew McConaughey) and a team of researchers through the wormhole and across the galaxy to find out which of three planets could be mankind's new home.";

//splitting sample paragraph
const sampleSplitted = sample.split("");

//finding the sample text area
const sampleTextArea = $(".sampleText");
sampleTextArea.html(`<p>${sample}</p>`);
const pattern = /^[a-zA-Z0-9!@#$%^&*()_+=-{};:'"<>,./?~`|\\ ]*$/;

//event listner for catching keydown events
window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" && keyCount !== 0) {
    const textNow = typeArea.html().split("><");
    for (let i = 0; i < textNow.length; i++) {
      if (i === 0) {
        textNow[i] = textNow[i] + ">";
      } else if (i === textNow.length - 1) {
        textNow[i] = "<" + textNow[i];
      } else {
        textNow[i] = "<" + textNow[i] + ">";
      }
    }
    typeArea.html(textNow.slice(0, textNow.length - 1).join(""));
    keyCount--;
  } else if (e.key.length === 1 && e.key.search(pattern) === 0) {
    if (e.key !== "Shift" && e.key !== "CapsLock") {
      if (!started) {
        typeStartTime = new Date().getTime();
        started = true;
      }
      keyCount++;
      //calling verify function to check
      userInput.push(e.key);
      const result = verifyKey(e.key);
      let character = "";
      result
        ? (character = `<span class="char-span correct">${e.key}</span>`)
        : (character = `<span class="char-span wrong">${e.key}</span>`);
      typeArea.append(character);
    }
  }
});

//function to verify the user input
const verifyKey = (pressedKey) => {
  if (sampleSplitted[keyCount - 1] !== pressedKey) {
    totalErrors++;
    if (userInput.length % 5 === 0) {
      typeEndTime = new Date().getTime();
      calculateWPM();
    }
    totalErrorsSpan.text(totalErrors);
    return false;
  }
  if (userInput.length % 5 === 0) {
    typeEndTime = new Date().getTime();
    calculateWPM();
  }
  totalCorrect++;
  return true;
};

//function to calculate total words per minute
const calculateWPM = () => {
  const timeTaken = (typeEndTime - typeStartTime) / 60000;
  typeEndTime = 0;
  const wordsByFive = userInput.length / 5;
  const errorRate = (totalErrors - pastErrors) / timeTaken;
  pastErrors = totalErrors;
  const grossWPM = Math.ceil(wordsByFive / timeTaken);
  const netWPM = Math.ceil(grossWPM - errorRate);
  wpmSpan.text(netWPM);
};

//function to change the colour of characters
const chageColour = (result) => {
  result
    ? typeContainer.css("color", "green")
    : typeContainer.css("color", "red");
};
