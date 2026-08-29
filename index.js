const buttonList = document.querySelectorAll(".key"); // Loading the DOM (getting all elements that have a .key class)
console.dir(buttonList);
const screen = document.querySelector(".equation");
const results = document.querySelector(".results");

let calculatorValue = "";
let operator = "";
let calculatorValueTwo = "";

// ================= ESSENTIAL FUNCTIONS ================= //

const screenDisplay = () => {
  if (calculatorValue === "" && operator === "" && calculatorValueTwo === "") {
    screen.innerHTML = "0";
  } else if (operator === "" && calculatorValueTwo === "") {
    screen.innerHTML = calculatorValue;
  } else if (operator != "" && calculatorValueTwo === "") {
    screen.innerHTML = calculatorValue + operator;
  } else if (calculatorValueTwo != "" && operator != "") {
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
  if (!isNaN(event.key)) {
    calculatorClickHandler({ target: { innerText: event.key } });
  } else if (
    event.key === "+" ||
    event.key === "x" ||
    event.key === "/" ||
    event.key === "-"
  ) {
    operatorClickHandler({ target: { innerText: event.key } });
  } else if (event.key === "Enter") {
    equalsClickHandler({ target: { innerText: event.key } });
  } else if (event.key === "Backspace") {
    backspaceHandler({ target: { innerText: event.key } });
  } else if (event.key === "c") {
    clearHandler({ target: { innerText: event.key } });
  }
};

document.addEventListener("keydown", keyboard);
