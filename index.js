console.log("The file is successfully connected");

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
  screen.innerHTML = operator === "" ? calculatorValue : calculatorValueTwo;
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
  let result = "";

  if (operator === "+") {
    result = num1 + num2;
  }
  results.innerHTML = result;
};

for (const element of buttonList) {
  const hasNumber = element.className.includes("number");
  const hasOperator = element.className.includes("math");
  const equal = element.className.includes("equals");
  if (hasNumber) element.addEventListener("click", calculatorClickHandler);
  if (hasOperator) element.addEventListener("click", operatorClickHandler);
  if (equal) element.addEventListener("click", equalsClickHandler);
}
