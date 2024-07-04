const typeContainer = $(".typeContainer");
const userInput = [];
let keyCount = 0;
const typeArea = $("#typeArea");
const character = "<span></span>";

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
    typeArea.prepend(`<span>${userInput.splice(userInput.length - 1 )}</span>`);
    keyCount--;
  } else if (e.key.length === 1 && e.key.search(pattern) === 0) {
    if (e.key !== "Shift" && e.key !== "CapsLock") {
      typeArea.text(userInput.join(""));
      keyCount++;
      const result = verifyKey(e.key);
      userInput.push(e.key);
      //   result ? character.addClass("correct") : character.addClass("wrong");
      typeArea.append(`<span>${e.key}</span>`);
    }
  }
});

//function to verify the user input
const verifyKey = (pressedKey) => {
  if (sampleSplitted[keyCount - 1] !== pressedKey) {
    return false;
  }
  return true;
};

//function to change the colour of characters
const chageColour = (result) => {
  result
    ? typeContainer.css("color", "green")
    : typeContainer.css("color", "red");
};
