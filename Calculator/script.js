const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let shouldReset = false;

function updateDisplay(value) {
  display.textContent = value || "0";
}

function calculate() {
  try {
    const result = eval(currentInput);
    updateDisplay(result);
    currentInput = result.toString();
    shouldReset = true;
  } catch {
    updateDisplay("Error");
    currentInput = "";
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.classList.contains("clear")) {
      currentInput = "";
      updateDisplay("0");
    } else if (btn.classList.contains("delete")) {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (btn.classList.contains("equal")) {
      calculate();
    } else {
      if (shouldReset && !isNaN(value)) {
        currentInput = "";
        shouldReset = false;
      }
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    currentInput += key;
    updateDisplay(currentInput);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (key.toLowerCase() === "c") {
    currentInput = "";
    updateDisplay("0");
  }
});
