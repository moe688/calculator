const buttonList = document.querySelectorAll(".key");
console.dir(buttonList);

const k = document.getElementById("calculator");
console.dir(k);

const screen = document.querySelector(".equation");
const results = document.querySelector(".results");

const screenDisplay = () => {
  if (operator === "" && calculatorValueTwo === "") {
    screen.innerHTML = calculatorValue;
  } else if (operator != "" && calculatorValueTwo === "") {
    screen.innerHTML = calculatorValue + operator;
  } else if (calculatorValueTwo != "" && operator != "") {
    screen.innerHTML = calculatorValue + operator + calculatorValueTwo;
  }
};

let calculatorValue = "";
let operator = "";
let calculatorValueTwo = "";

const calculatorClickHandler = (event) => {
  if (operator === "") {
    const alreadyHasADot = calculatorValue.includes(".");
    const isDot = event.target.innerText.includes(".");
    const shouldSkip = alreadyHasADot && isDot;
    if (!shouldSkip) {
      calculatorValue += event.target.innerText;
    }
  } else {
    const alreadyHasADot = calculatorValueTwo.includes(".");
    const isDot = event.target.innerText.includes(".");
    const shouldSkip = alreadyHasADot && isDot;
    if (!shouldSkip) {
      calculatorValueTwo += event.target.innerText;
    }
  }
  screenDisplay();
  console.log({ calculatorValue, operator, calculatorValueTwo });
};

const operatorClickHandler = (event) => {
  if (calculatorValueTwo === "") {
    operator = event.target.innerText;
  }
  screenDisplay();
  console.log({ calculatorValue, operator, calculatorValueTwo });
};

const equalsClickHandler = () => {
  const num1 = Number(calculatorValue);
  const num2 = Number(calculatorValueTwo);
  const result = solver;

  results.innerHTML = solver(operator, num1, num2);
};

const solver = (operator, num1, num2) => {
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

const clearHandler = () => {
  screen.innerHTML = "0";
  results.innerHTML = "0";
  calculatorValue = "";
  operator = "";
  calculatorValueTwo = "";
};

const backspaceHandler = () => {
  if (calculatorValueTwo !== "") {
    calculatorValueTwo = calculatorValueTwo.slice(0, -1);
  } else if (operator !== "") {
    operator = operator.slice(0, -1);
  } else if (calculatorValue !== "") {
    calculatorValue = calculatorValue.slice(0, -1);
  }
  console.log({ calculatorValue, operator, calculatorValueTwo });
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

for (const element of buttonList) {
  const hasNumber = element.className.includes("number");
  const hasOperator = element.className.includes("math");
  const equal = element.className.includes("equals");
  const clear = element.className.includes("clear");
  const backspace = element.className.includes("backspace");
  const plusMinus = element.className.includes("plusMinus");
  if (hasNumber) element.addEventListener("click", calculatorClickHandler);
  if (hasOperator) element.addEventListener("click", operatorClickHandler);
  if (equal) element.addEventListener("click", equalsClickHandler);
  if (clear) element.addEventListener("click", clearHandler);
  if (backspace) {
    element.addEventListener("click", backspaceHandler);
  }
  if (plusMinus) {
    element.addEventListener("click", plusMinusOperator);
  }
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
