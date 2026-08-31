const buttonList = document.querySelectorAll(".key"); // Loading the DOM (getting all elements that have a .key class)
console.dir(buttonList);
const screen = document.querySelector(".equation");
const results = document.querySelector(".results");

document.addEventListener("keydown", keyboard); // this is an event listener:
//This tells the browser: watch the whole document,
// and whenever a key is pressed down, run the keyboard function

let calculatorValue = "";
let operator = "";
let calculatorValueTwo = "";
let equalButton = "";
let backspaceButton = "";
let pointButton = "";

// ================= ESSENTIAL FUNCTIONS ================= //

const screenDisplay = () => {
  if (calculatorValue === "" && operator === "" && calculatorValueTwo === "") {
    screen.innerHTML = "0";
  } else if (operator === "" && calculatorValueTwo === "") {
    screen.innerHTML = calculatorValue;
  } else if (operator !== "" && calculatorValueTwo === "") {
    screen.innerHTML = calculatorValue + operator;
  } else if (calculatorValueTwo !== "" && operator !== "") {
    screen.innerHTML = calculatorValue + operator + calculatorValueTwo;
  }
};

const calculatorClickHandler = (event) => {
  if (operator === "") {
    const alreadyHasADot = calculatorValue.includes("."); // if the calculatorVlaue already has a dot.
    const isDot = event.target.innerText.includes("."); // if the EVENT (the button that was clicked) is a dot.
    const shouldSkip = alreadyHasADot && isDot;
    if (!shouldSkip) {
      calculatorValue += event.target.innerText;
      backspaceButton.disabled = false;
    }
  } else {
    const alreadyHasADot = calculatorValueTwo.includes(".");
    const isDot = event.target.innerText.includes(".");
    const shouldSkip = alreadyHasADot && isDot;
    if (!shouldSkip) {
      calculatorValueTwo += event.target.innerText;
      equalButton.disabled = false; // pato, ur a good teacher, but i moved this assignment statement instead of keeping it in the operatorClickHandler :P
    }
  }
  screenDisplay();
};

const operatorClickHandler = (event) => {
  if (calculatorValueTwo === "") {
    operator = event.target.innerText;
  }
  screenDisplay();
};

const equalsClickHandler = () => {
  const num1 = Number(calculatorValue);
  const num2 = Number(calculatorValueTwo);

  results.innerHTML = mathSolver(operator, num1, num2);
};

const mathSolver = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return "";
  }
};

const clearHandler = (event) => {
  screen.innerHTML = "0";
  results.innerHTML = "0";
  calculatorValue = "";
  operator = "";
  calculatorValueTwo = "";
  equalButton.disabled = true;
  backspaceButton.disabled = true; // i also add the disabling statement in the clearHandler so the equal button is disabled again after clearing everything.
};

const backspaceHandler = () => {
  if (calculatorValueTwo !== "") {
    calculatorValueTwo = calculatorValueTwo.slice(0, -1);
  } else if (operator !== "") {
    operator = operator.slice(0, -1);
  } else if (calculatorValue !== "") {
    calculatorValue = calculatorValue.slice(0, -1);
  }
  screenDisplay();
};

const plusMinusOperator = () => {
  if (operator === "" && calculatorValueTwo === "") {
    calculatorValue = calculatorValue * -1;
  } else if (calculatorValueTwo != "" && operator != "") {
    calculatorValueTwo = calculatorValueTwo * -1;
  }
  screenDisplay();
};

const pointClickHandler = () => {
  if (calculatorValue === ".") {
    calculatorValue = "0.";
  } else if (calculatorValueTwo === ".") calculatorValueTwo = "0.";
};
// ================= The Loop where the calculator actually works ================= //

for (const element of buttonList) {
  const hasNumber = element.className.includes("number");
  const hasOperator = element.className.includes("math");
  const equal = element.className.includes("equals");
  const clear = element.className.includes("clear");
  const backspace = element.className.includes("backspace");
  const plusMinus = element.className.includes("plusMinus");
  const isPoint = element.className.includes("point");
  if (hasNumber) element.addEventListener("click", calculatorClickHandler);
  if (isPoint) element.addEventListener("click", pointClickHandler);
  if (hasOperator) element.addEventListener("click", operatorClickHandler);
  if (equal) {
    element.addEventListener("click", equalsClickHandler);
    element.disabled = true;
    equalButton = element;
  }
  if (clear) element.addEventListener("click", clearHandler);
  if (backspace) {
    element.addEventListener("click", backspaceHandler);
    element.disabled = true;
    backspaceButton = element;
  }
  if (plusMinus) element.addEventListener("click", plusMinusOperator);
}

const keyboard = (event) => {
  if (
    !isNaN(event.key) || //checks if event key (the key that was pressed, which was listened to throught the listener in line 6)
    ["*", "+", "-", "/", "c"].includes(event.key) // or they key belongs to this array
  ) {
    const button = [...buttonList].find(
      // we convert buttonList "a nodeList" to an array to able to use find()
      (button) => button.innerText === event.key,
    );
    button?.click(); // optional operator.. If button is undefined (no match found), it just skips calling .click() instead of throwing an error.
  } else if (event.key === "Enter") {
    equalButton.click();
  } else if (event.key === "Backspace") {
    backspaceButton.click();
  }
};
