// stored data
let display = document.getElementById("read");
let numberButtons = document.querySelectorAll(".button");
let operatorButtons = document.querySelectorAll(".operator");
let equalsButton = document.querySelector(".equals");
let clearButton = document.querySelector(".clear");


let currentInput = ""; 
let previousInput = "";
let operator = null; 
let resetDisplay = false; 

// updates calculator display
function updateDisplay(value) {
    display.textContent = value; 
}

// clear function
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
        if (value === "." && currentInput.indexOf(".") !== -1) {
            return; 
        }
        currentInput = currentInput + value; 
    }
    updateDisplay(currentInput); 
}

// function handles math operators like +, -, *, /
function handleOperator(value) {
    if (!currentInput && value !== "-") {
        return; 
    }

    if (operator && previousInput && currentInput) { 
        calculate(); 
    }

    operator = value; 
    previousInput = currentInput; 
    currentInput = ""; 
    resetDisplay = true; 
}

// function = does math based off numbers and inputs
function calculate() {
    if (!operator || previousInput === "" || currentInput === "") {
        return; 
    }

    var num1 = parseFloat(previousInput); 
    var num2 = parseFloat(currentInput); 

    if (isNaN(num1) || isNaN(num2)) {
        return; // 
    }

    let result; // Variable = store result

    if (operator === "+") {
        result = num1 + num2; 
    } else if (operator === "-") {
        result = num1 - num2; 
    } else if (operator === "*") {
        result = num1 * num2; 
    } else if (operator === "/") {
        if (num2 !== 0) {
            result = num1 / num2;
        } else {
            result = "Error"; 
        }
    } else {
        return; 
    }

    currentInput = result.toString(); 
    operator = null; 
    previousInput = ""; 
    resetDisplay = true; 
    updateDisplay(currentInput); 
}

// event listener for number buttons
for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function() {
        handleNumber(this.textContent); 
    });
}

// event listener for operator buttons
for (var j = 0; j < operatorButtons.length; j++) {
    operatorButtons[j].addEventListener("click", function() {
        handleOperator(this.textContent); 
    });
}

// event listener for equals button
equalsButton.addEventListener("click", function() {
    calculate(); 
});

// event listener for clear button
clearButton.addEventListener("click", function() {
    clearCalculator(); 
});

// display 0 when calc starts
updateDisplay("0");
