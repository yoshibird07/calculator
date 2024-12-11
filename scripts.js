// elements from HTML, stored data
const display = document.getElementById("read"); 
const numberButtons = document.querySelectorAll(".button"); 
const operatorButtons = document.querySelectorAll(".operator"); 
const equalsButton = document.querySelector(".equals"); 
const clearButton = document.querySelector(".clear"); 

// keep track of what someones typing
let currentInput = ""; 
let previousInput = "";
let operator = null; 
let resetDisplay = false; 

//updates calculator display
function updateDisplay(value) {
    display.textContent = value; 
}

// function clears everything and starts fresh
function clearCalculator() {
    currentInput = ""; // Clear current input
    previousInput = ""; // Clear previous input
    operator = null; // Clear operator
    resetDisplay = false; // Reset display flag
    updateDisplay("0"); // Set display back to 0
}

// function handles numbers and decimal points
function handleNumber(value) {
    if (resetDisplay) { 
        currentInput = value; 
        resetDisplay = false; 
    } else {
        if (value === "." && currentInput.includes(".")) return; 
        currentInput += value; 
    }
    updateDisplay(currentInput); 
}

// function handles math operators like +, -, *, /
function handleOperator(value) {
    if (currentInput === "" && value !== "-") return; 

    if (operator && previousInput && currentInput) { 
        calculate(); // Perform the calculation first
    }

    operator = value; // Set new operator
    previousInput = currentInput; // Save current input as previous input
    currentInput = ""; // Clear current input
    resetDisplay = true; // Flag to reset display on next input
}

// function = does math based off numbers and inputs
function calculate() {
    if (!operator || !previousInput || !currentInput) return; // If not enough info, stop

    const num1 = parseFloat(previousInput); // previous input to number
    const num2 = parseFloat(currentInput); // current input to number

    if (isNaN(num1) || isNaN(num2)) return; 

    let result; // store result
    switch (operator) { 
        case "+":
            result = num1 + num2; 
            break;
        case "-":
            result = num1 - num2; 
            break;
        case "*":
            result = num1 * num2; 
            break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : "Error"; 
            break;
        default:
            return; 
    }

    currentInput = result.toString(); // Save result current input
    operator = null; // Clear operator
    previousInput = ""; // Clear previous input
    resetDisplay = true; // reset display on next input
    updateDisplay(currentInput); // Show result on display
}

// event listener for number buttons
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleNumber(button.textContent); 
    });
});

// event listener for operator buttons
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleOperator(button.textContent); 
    });
});

// event listener for equals button
equalsButton.addEventListener("click", () => {
    calculate(); 
});

// event listener for clear button
clearButton.addEventListener("click", () => {
    clearCalculator(); 
});

// display 0 when calc starts
updateDisplay("0"); 
