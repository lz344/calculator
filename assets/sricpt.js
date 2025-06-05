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

function doesSimpleMath(visor) {
  let array = visor.split("");

  const operatorIndex = getOperatorIndex(visor);

  let num1 = Number(array.slice(0, operatorIndex).join(""));
  let num2 = Number(array.slice(operatorIndex + 1).join(""));

  const operator = array[operatorIndex];

  if (operator === "+") return num1 + num2;
  else if (operator === "-") return num1 - num2;
  else if (operator === "*") return num1 * num2;
  else if (operator === "/") {
    if (num1 === 0 && num2 === 0) {
      alert("Erro de divisão: 0 não pode ser divido por ele mesmo!");
      return "";
    } else if (num2 === 0) {
      alert("Erro de divisão: Não é possivel dividir por 0!");
      return "";
    } else {
      return num1 / num2;
    }
  }
}

function expressionHasOperator(visor) {
  const operatorIndex = getOperatorIndex(visor);

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

function startCalculator() {
  const visor = document.querySelector("#result");
  const calcButtons = document.querySelectorAll("button");
  const operators = ["+", "-", "*", "/", "."];

  calcButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnValue = e.target.textContent;

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
          let calc = doesSimpleMath(visor.value);
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
          let calc = doesSimpleMath(visor.value);
          visor.value = "";
          visor.value += calc;
          return;
        }
      }

      visor.value += btnValue;
    });
  });
}

startCalculator();
