const buttonList = document.querySelectorAll(".key");
console.dir(buttonList);

const screen = document.querySelector(".equation");
const results = document.querySelector(".results");

let calculatorValue = "";
let operator = "";
let calculatorValueTwo = "";

const calculatorClickHandler = (evt) => {
  if (operator === "") {
    const alreadyHasADot = calculatorValue.includes(".");
    const isDot = evt.target.innerText.includes(".");
    const shouldSkip = alreadyHasADot && isDot;
    if (!shouldSkip) {
      calculatorValue += evt.target.innerText;
    }
  } else {
    const alreadyHasADot = calculatorValueTwo.includes(".");
    const isDot = evt.target.innerText.includes(".");
    const shouldSkip = alreadyHasADot && isDot;
    if (!shouldSkip) {
      calculatorValueTwo += evt.target.innerText;
    }
  }
  screen.innerHTML =
    operator === ""
      ? calculatorValue
      : operator != ""
        ? calculatorValue + operator
        : calculatorValue + operator + calculatorValueTwo;
  console.log({ calculatorValue, operator, calculatorValueTwo });
};

const operatorClickHandler = (evt) => {
  if (calculatorValueTwo === "") {
    operator = evt.target.innerText;
  }
  console.log({ calculatorValue, operator, calculatorValueTwo });
};

const equalsClickHandler = (evt) => {
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

const clearHandler = (evt) => {
  screen.innerHTML = "0";
  results.innerHTML = "0";
  calculatorValue = "";
  operator = "";
  calculatorValueTwo = "";
};

for (const element of buttonList) {
  const hasNumber = element.className.includes("number");
  const hasOperator = element.className.includes("math");
  const equal = element.className.includes("equals");
  const clear = element.className.includes("clear");
  if (hasNumber) element.addEventListener("click", calculatorClickHandler);
  if (hasOperator) element.addEventListener("click", operatorClickHandler);
  if (equal) element.addEventListener("click", equalsClickHandler);
  if (clear) element.addEventListener("click", clearHandler);

  // if (clear) {
  //   console.log("clear");
  //   element.addEventListener("click", clearHandler);
  // }
}
