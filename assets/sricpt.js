function addOperatorOrNot(btnValue, currentValue) {
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

function operatorInFront(btnValue, visor) {
  const operators = ["+", "-", "*", "/", "."];

  if (operators.includes(btnValue) && visor === "") {
    return true;
  }
  return false;
}

function equalAfterNumber(visor) {
  if (visor.length === 1) {
    return true;
  }
  return false;
}

function doesSimpleMath(visor) {
  const operators = ["+", "-", "*", "/"];
  let array = visor.split("");

  let operatorIndex;

  for (let operator of operators) {
    operatorIndex = array.indexOf(operator);

    if (operatorIndex !== -1) {
      break;
    }
  }

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

function startCalculator() {
  const visor = document.querySelector("#result");
  const calcButtons = document.querySelectorAll("button");

  calcButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnValue = e.target.textContent;

      if (operatorInFront(btnValue, visor.value)) {
        return;
      }

      if (!addOperatorOrNot(btnValue, visor.value)) {
        return;
      }

      if (btnValue === "=") {
        if (visor.value === "") {
          return;
        } else if (equalAfterNumber(visor.value)) {
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
