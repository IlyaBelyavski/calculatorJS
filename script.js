import "./styles.css";

const divideButton = document.getElementById("divideButton");
const multiplyButton = document.getElementById("multiplyButton");
const subtractButton = document.getElementById("subtractButton");
const addButton = document.getElementById("addButton");
const resultButton = document.getElementById("resultButton");
const currentNumberDiv = document.getElementById("currentNumberDiv");
const display = document.getElementById("display");
const clearButton = document.getElementById("clearButton");
const digitButton = document.querySelectorAll(".digitButton");
const percentButton = document.getElementById("percentButton");
const signButton = document.getElementById("signButton");

let currentNumber = 0;
let lastOperation = null;

function handleOperation(op) {
  currentNumberDiv.style.display = "block";
  const num = Number(display.value);
  if (isNaN(num)) return;

  if (lastOperation) {
    if (lastOperation === "+") currentNumber += num;
    else if (lastOperation === "-") currentNumber -= num;
    else if (lastOperation === "*") currentNumber *= num;
    else if (lastOperation === "/") currentNumber /= num;
  } else {
    currentNumber = num;
  }

  lastOperation = op;
  display.value = "";
  currentNumberDiv.textContent = currentNumber;
}

function handleResult() {
  const num = Number(display.value);
  if (isNaN(num) || lastOperation === null) return;

  if (lastOperation === "+") currentNumber += num;
  else if (lastOperation === "-") currentNumber -= num;
  else if (lastOperation === "*") currentNumber *= num;
  else if (lastOperation === "/") currentNumber /= num;

  currentNumberDiv.textContent = currentNumber;
  display.value = currentNumber;
  lastOperation = null;
  currentNumberDiv.style.display = "none";
}

addButton.addEventListener("click", () => handleOperation("+"));
subtractButton.addEventListener("click", () => handleOperation("-"));
multiplyButton.addEventListener("click", () => handleOperation("*"));
divideButton.addEventListener("click", () => handleOperation("/"));
resultButton.addEventListener("click", handleResult);

display.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleResult();
  }
});

digitButton.forEach((button) => {
  button.addEventListener("click", () => {
    display.value += button.textContent;
    currentNumberDiv.style.display = "block";
  });
});

clearButton.addEventListener("click", () => {
  currentNumber = 0;
  currentNumberDiv.innerHTML = currentNumber;
  display.value = "";
});

percentButton.addEventListener("click", () => {
  const num = Number(display.value);
  if (isNaN(num)) return;
  display.value = (num / 100).toString();
});

signButton.addEventListener("click", () => {
  const num = Number(display.value);
  if (isNaN(num)) return;
  display.value = (-num).toString();
});
