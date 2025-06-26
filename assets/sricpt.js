function addOperatorOrNot(btnValue, currentValue, operators) {
  let lastIndex = currentValue.length - 1;

  if (
    operators.includes(currentValue[lastIndex]) &&
    operators.includes(btnValue)
  ) {
    return false;
  }
  return true;
}

function operatorInFront(btnValue, visor, operators) {
  if (operators.includes(btnValue) && visor === "") {
    return true;
  }
  return false;
}

function equalOrOperatorAfterNumber(visor, btnValue, operators) {
  const lastIndex = visor.length - 1;

  const hasOperator = visor.split("").some((char) => {
    return operators.includes(char);
  });
  const equalPressedTooEarly = !hasOperator && btnValue === "=";
  const pressedEqualAfterOperator =
    operators.includes(visor[lastIndex]) && btnValue === "=";

  if (equalPressedTooEarly || pressedEqualAfterOperator) {
    return true;
  }
  return false;
}

function parseAndCalculate(visor) {
  let array = visor.split("");

  const operatorIndex = getLastOperatorIndex(visor);

  const left = array.slice(0, operatorIndex).join("");
  const right = array.slice(operatorIndex + 1).join("");

  const num1 = Number(left);
  const num2 = Number(right);

  const operator = array[operatorIndex];

  return calculate(num1, num2, operator);
}

function calculate(num1, num2, operator) {
  if (operator === "-") return num1 - num2;
  else if (operator === "+") return num1 + num2;
  else if (operator === "*") return num1 * num2;
  else if (operator === "/") {
    if (
      (num1 === 0 && num2 === 0) ||
      (num1 === -0 && num2 === 0) ||
      (num1 === 0 && num2 === -0) ||
      (num1 === -0 && num2 === -0)
    ) {
      alert("Erro de divisão: 0 não pode ser dividido por ele mesmo!");
      return "";
    } else if (num2 === 0 || num2 === -0) {
      alert("Erro de divisão: Não é possivel dividir por 0!");
      return "";
    } else {
      return num1 / num2;
    }
  }
}

function expressionHasOperator(visor) {
  const operatorIndex = getLastOperatorIndex(visor);

  if (operatorIndex === -1) {
    return false;
  }

  return true;
}

function getOperatorIndex(visor) {
  const operators = ["+", "-", "*", "/"];
  let array = visor.split("");

  for (let operator of operators) {
    const index = array.indexOf(operator);

    if (index !== -1) {
      return index;
    }
  }
  return -1;
}

function addDotOrNot(visorValue, btnValue) {
  if (btnValue !== ".") {
    return false;
  }

  let operatorIndex = getOperatorIndex(visorValue);

  if (operatorIndex === -1) {
    let leftPart = visorValue;
    const hasDotInLeft = leftPart.split("").some((char) => char === ".");
    return hasDotInLeft;
  } else {
    let rightPart = visorValue.slice(operatorIndex + 1);
    const hasDotInRight = rightPart.split("").some((char) => char === ".");
    return hasDotInRight;
  }
}

function getLastOperatorIndex(expression) {
  const operators = ["+", "-", "*", "/"];

  for (let i = expression.length - 1; i >= 0; i--) {
    if (
      operators.includes(expression[i]) &&
      !isNaN(Number(expression[i - 1]))
    ) {
      return i;
    }
  }
  return -1;
}

function calculatePercentage(visorValue) {
  let array = visorValue.split("");

  const operatorIndex = getLastOperatorIndex(visorValue);

  const firstNumber = Number(array.slice(0, operatorIndex).join(""));
  const secondNumber = Number(array.slice(operatorIndex + 1).join(""));
  let calc;

  if (array[operatorIndex] === "+" || array[operatorIndex] === "-") {
    calc = (firstNumber / 100) * secondNumber;
  } else {
    calc = secondNumber / 100;
  }

  return calculate(firstNumber, calc, array[operatorIndex]);
}

function shouldOverwriteVisor(visor, btnValue, overwriteFlag) {
  const lastChar = visor[visor.length - 1];
  return overwriteFlag && !isNaN(lastChar) && !isNaN(btnValue);
}

function clearVisor(visor) {
  visor.value = "";
}

function startCalculator() {
  const visor = document.querySelector("#result");
  const calcButtons = document.querySelectorAll("button");
  const operators = ["+", "-", "*", "/", "."];
  let overwriteOnNextInput = false;

  calcButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnValue = e.target.textContent;

      if (btnValue === "AC") {
        clearVisor(visor);
        return;
      }

      if (shouldOverwriteVisor(visor.value, btnValue, overwriteOnNextInput)) {
        visor.value = btnValue;
        overwriteOnNextInput = false;
        return;
      }

      if (btnValue === "%") {
        if (visor.value === "") {
          return;
        }
        if (!expressionHasOperator(visor.value)) {
          visor.value = visor.value / 100;
        } else {
          const expression = calculatePercentage(visor.value);
          visor.value = expression;
        }
        return;
      }

      if (btnValue === "+/-") {
        if (visor.value === "") {
          return;
        }

        let lastIndex = getLastOperatorIndex(visor.value);

        if (lastIndex === -1) {
          if (visor.value.startsWith("-")) {
            visor.value = visor.value.slice(1);
            return;
          } else {
            visor.value = "-" + visor.value;
            return;
          }
        } else {
          if (visor.value[lastIndex + 1] === "-") {
            const arrayExpression = [...visor.value];
            arrayExpression.splice(lastIndex + 1, 1);
            visor.value = arrayExpression.join("");
            return;
          } else {
            const arrayExpression = [...visor.value];
            arrayExpression.splice(lastIndex + 1, 0, "-");
            visor.value = arrayExpression.join("");
            return;
          }
        }
      }

      if (addDotOrNot(visor.value, btnValue)) {
        return;
      }

      if (operatorInFront(btnValue, visor.value, operators)) {
        return;
      }

      if (!addOperatorOrNot(btnValue, visor.value, operators)) {
        return;
      }

      if (expressionHasOperator(visor.value)) {
        const operators = ["+", "-", "*", "/"];
        if (operators.includes(btnValue)) {
          let calc = parseAndCalculate(visor.value);
          visor.value = "";
          visor.value += calc;
        }
      }

      if (btnValue === "=") {
        if (visor.value === "") {
          return;
        } else if (
          equalOrOperatorAfterNumber(visor.value, btnValue, operators)
        ) {
          return;
        } else {
          let calc = parseAndCalculate(visor.value);
          visor.value = "";
          visor.value += calc;
          overwriteOnNextInput = true;
          return;
        }
      }

      visor.value += btnValue;
    });
  });
}

startCalculator();
