console.log("The file is successfully connected");

const buttonList = document.querySelectorAll(".key");
console.dir(buttonList);

let calculatorValue = "0";

const calculatorClickHandler = (evt) => {
  const alreadyHasADot = calculatorValue.includes(".");
  const isDot = evt.target.innerText.includes(".");
  const shouldSkip = alreadyHasADot && isDot;
  if (!shouldSkip) {
    calculatorValue += evt.target.innerText;
  }
  document.querySelector(".result").innerHTML = calculatorValue;

  console.log({ calculatorValue });
};

for (const element of buttonList) {
  const hasNumber = element.className.includes("number");
  if (hasNumber) element.addEventListener("click", calculatorClickHandler);
}
