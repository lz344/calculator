function addOrNot(btnValue, currentValue) {
  let lastIndex = currentValue.length - 1;
  const operators = ["+", "-", "*", "/", "."];

  if (
    operators.includes(currentValue[lastIndex]) &&
    operators.includes(btnValue)
  ) {
    return false;
  }
  return true;
}

function startCalculator() {
  const visor = document.querySelector("#result");
  const calcButtons = document.querySelectorAll("button");

  calcButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnValue = e.target.textContent;

      if (!addOrNot(btnValue, visor.value)) {
        return;
      }
      visor.value += btnValue;
    });
  });
}

startCalculator();
