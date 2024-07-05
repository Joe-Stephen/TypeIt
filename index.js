const typeContainer = $(".typeContainer");
const totalErrorsSpan = $("#totalErrors");
const wpmSpan = $("#wpm");
const accuracySpan = $("#accuracy");
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
  "Storytelling is the social and cultural activity of sharing stories, sometimes with improvisation, theatrics or embellishment. Every culture has its own stories or narratives, which are shared as a means of entertainment, education, cultural preservation or instilling moral values.";

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
    userInput = userInput.slice(0, userInput.length);
    keyCount--;
  } else if (e.key.length === 1 && e.key.search(pattern) === 0) {
    if (e.key !== "Shift" && e.key !== "CapsLock") {
      if (started) {
        calculateAccuracy();
      }
      if (!started) {
        typeStartTime = new Date().getTime();
        started = true;
      }
      userInput.push(e.key);
      keyCount++;
      //calling verify function to check
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
    // if (userInput.length % 5 === 0) {
    typeEndTime = new Date().getTime();
    calculateWPM();
    // }
    totalErrorsSpan.text(totalErrors);
    return false;
  }
  // if (userInput.length % 5 === 0) {
  typeEndTime = new Date().getTime();
  calculateWPM();
  // }
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

//function to calculate the accuracy of the test
const calculateAccuracy = () => {
  const accuracy = Math.ceil((totalCorrect / userInput.length) * 100);
  accuracySpan.text(accuracy);
};
