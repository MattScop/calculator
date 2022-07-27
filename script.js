/* 
FIRST STEP: --DONE--
When Click Number, It Appears On The Screen;
*/

/* 
SECOND STEP: --DONE--
The number inserted AFTER the operator must start with a fresh line,
placing the old number on the secondary line
*/

/* 
STEP THREE: --DONE--
Calculate the values when pressing equals button
*/

/* 
STEP FOUR: --DONE--
Add Clear and DEL button functionalities
*/

// buttons
const buttonsNumber = document.getElementsByClassName('number');
const buttonsCalc = document.getElementsByClassName('calc');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.del');
const onOffButton = document.querySelector('.on-off-button');

// containers
const firstLine = document.querySelector('.first-line');
const secondLine = document.querySelector('.secondary-line');
const firstLineNumbers = document.querySelector('.first-line-numbers');
const firstLineCalcs = document.querySelector('.first-line-calcs');
const secondaryLineNumbers = document.querySelector('.secondary-line-numbers');
const secondaryLineCalcs = document.querySelector('.secondary-line-calcs');
const firstLineDefaultResult = document.querySelector('.first-line-result-default');

// Listen to mouse click on each button
Array.from(buttonsNumber).forEach(button => {
    button.addEventListener('click', insertInput)
})

// ADD KBD SUPPORT
window.addEventListener('keydown', (e) => {

    // Input Numbers
    insertKbdInput(e)
    
    // Add Operators
    addKbdOperator(e)

    // Equal button
    if (e.key === 'Enter') {
        operate()
        if (firstLineDefaultResult.innerText !== "") {
            firstLineNumbers.innerText = "";
        } else {
            firstLineDefaultResult.innerText = "";
        }
        firstLineCalcs.innerText = "";
        secondaryLineNumbers.innerText = "";
        secondaryLineCalcs.innerText = "";
    }

    // Clear button
    if (e.key === 'Delete') clear()

    // Del button
    if (e.key === 'Backspace') del()
})

function insertInput(e) {

    // Allow 10 numbers input max
    if (firstLineNumbers.innerText.length >= 10 && firstLineCalcs.innerText === "") return

    // Allow 3 decimals max
    if (firstLineNumbers.innerText.includes('.')) {
        let split = firstLineNumbers.innerText.split('.');
        let decimals = split[1];
        if (decimals.length >= 3 && firstLineCalcs.innerText === "") return
    }
    
    // Prevent multiple "." from being inserted
    if (e.target.innerText === '.' && firstLineNumbers.innerText.includes('.') && firstLineCalcs.innerText === "") return

    // Go to secondary line if operator is present on number input
    if (firstLineCalcs.innerText !== "") {

        // Allows to overwrite result number on new input
        if (firstLineDefaultResult.innerText !== "") {
            secondaryLineNumbers.innerText = firstLineDefaultResult.innerText;
        } else {
            secondaryLineNumbers.innerText = firstLineNumbers.innerText;
        }

        secondaryLineCalcs.innerText = firstLineCalcs.innerText;
        firstLineNumbers.innerText = "";
        firstLineDefaultResult.innerText = "";
        firstLineCalcs.innerText = "";

        // Add 0 in front of the dot when there are no integers
        if (e.target.innerText === '.') {
            firstLineNumbers.innerText = "0" + e.target.innerText;
            return
        }
        
        firstLineNumbers.innerText += e.target.innerText;
        return
    } 

    // Overwrite result number on new input
    if (firstLineDefaultResult.innerText !== "") {
        firstLineDefaultResult.innerText = "";

        // Add 0 in front of the dot when there are no integers
        if (e.target.innerText === '.' && firstLineNumbers.innerText === "" || firstLineNumbers.innerText === "0") {
            firstLineNumbers.innerText = "0" + e.target.innerText;
            return
        }

        firstLineNumbers.innerText += e.target.innerText;
        return
    }

    // Add 0 in front of the dot when there are no integers
    if (e.target.innerText === '.') {
        if (firstLineNumbers.innerText === "" || firstLineNumbers.innerText === "0") {
            firstLineNumbers.innerText = "0" + e.target.innerText;
            return
        }
    }

    // Overwrite 0 if it's the only number
    if (firstLineNumbers.innerText.length === 1 && firstLineNumbers.innerText.includes('0')) {
        firstLineNumbers.innerText = e.target.innerText;
        return
    }
    
    firstLineNumbers.innerText += e.target.innerText;
}

function insertKbdInput(e) {
    const kbdButtonsNumber = document.querySelector(`[data-number="${e.key}"]`);
    if (!kbdButtonsNumber) return // return if no key is found

    // Allow 10 numbers input max
    if (firstLineNumbers.innerText.length >= 10 && firstLineCalcs.innerText === "") return

    // Allow 3 decimals max
    if (firstLineNumbers.innerText.includes('.')) {
        let split = firstLineNumbers.innerText.split('.');
        let decimals = split[1];
        if (decimals.length >= 3 && firstLineCalcs.innerText === "") return
    }
    
    // Prevent multiple "." from being inserted
    if (kbdButtonsNumber.innerText === '.' && firstLineNumbers.innerText.includes('.') && firstLineCalcs.innerText === "") return

    // Go to secondary line if operator is present on number input
    if (firstLineCalcs.innerText !== "") {

        // Allows to overwrite result number on new input
        if (firstLineDefaultResult.innerText !== "") {
            secondaryLineNumbers.innerText = firstLineDefaultResult.innerText;
        } else {
            secondaryLineNumbers.innerText = firstLineNumbers.innerText;
        }

        secondaryLineCalcs.innerText = firstLineCalcs.innerText;
        firstLineNumbers.innerText = "";
        firstLineDefaultResult.innerText = "";
        firstLineCalcs.innerText = "";

        // Add 0 in front of the dot when there are no integers
        if (kbdButtonsNumber.innerText === '.') {
            firstLineNumbers.innerText = "0" + kbdButtonsNumber.innerText;
            return
        }
        
        firstLineNumbers.innerText += kbdButtonsNumber.innerText;
        return
    } 

    // Overwrite result number on new input
    if (firstLineDefaultResult.innerText !== "") {
        firstLineDefaultResult.innerText = "";

        // Add 0 in front of the dot when there are no integers
        if (kbdButtonsNumber.innerText === '.' && firstLineNumbers.innerText === "" || firstLineNumbers.innerText === "0") {
            firstLineNumbers.innerText = "0" + kbdButtonsNumber.innerText;
            return
        }

        firstLineNumbers.innerText += kbdButtonsNumber.innerText;
        return
    }

    // Add 0 in front of the dot when there are no integers
    if (kbdButtonsNumber.innerText === '.') {
        if (firstLineNumbers.innerText === "" || firstLineNumbers.innerText === "0") {
            firstLineNumbers.innerText = "0" + kbdButtonsNumber.innerText;
            return
        }
    }

    // Overwrite 0 if it's the only number
    if (firstLineNumbers.innerText.length === 1 && firstLineNumbers.innerText.includes('0')) {
        firstLineNumbers.innerText = kbdButtonsNumber.innerText;
        return
    }
    
    firstLineNumbers.innerText += kbdButtonsNumber.innerText;
    
}

// Add operators
Array.from(buttonsCalc).forEach(button => {
    button.addEventListener('click', addOperator)
});

function addOperator(e) {

    // Trigger operate when clicking another operator instead of equal button
    if (secondaryLineNumbers.innerText !== "" && firstLineNumbers.innerText !== "") {
        operate();
        firstLineNumbers.innerText = "";
        firstLineCalcs.innerText = "";
        secondaryLineNumbers.innerText = "";
        secondaryLineCalcs.innerText = "";
    }

    // Change multiplier and divider style to better fit the font
    if (e.target.classList.contains('multiplier-operator')) {
        firstLineCalcs.innerText = '*';
    } else if (e.target.classList.contains('divider')) {
        firstLineCalcs.innerText = "/";
    } else {
        firstLineCalcs.innerText = e.target.innerText
    }
}

// Add operators (keyboard)
function addKbdOperator(e) {
    const kbdButtonsCalc = document.querySelector(`[data-calc="${e.key}"]`);
    if (!kbdButtonsCalc) return // return if no key is found;

    // Trigger operate when clicking another operator instead of equal button
    if (secondaryLineNumbers.innerText !== "" && firstLineNumbers.innerText !== "") {
        operate();
        firstLineNumbers.innerText = "";
        firstLineCalcs.innerText = "";
        secondaryLineNumbers.innerText = "";
        secondaryLineCalcs.innerText = "";
    }

    // Change multiplier and divider style to better fit the font
    if (kbdButtonsCalc.classList.contains('multiplier')) {
        firstLineCalcs.innerText = '*';
    } else if (kbdButtonsCalc.classList.contains('divider')) {
        firstLineCalcs.innerText = "/";
    } else {
        firstLineCalcs.innerText = kbdButtonsCalc.innerText
    }
}

// Add equal functionality
equalButton.addEventListener('click', () => {
    operate()
    if (firstLineDefaultResult.innerText !== "") {
        firstLineNumbers.innerText = "";
    } else {
        firstLineDefaultResult.innerText = "";
    }
    firstLineCalcs.innerText = "";
    secondaryLineNumbers.innerText = "";
    secondaryLineCalcs.innerText = "";
});

function operate() {
    switch (secondaryLineCalcs.innerText) {

        // Addition
        case '+':
            const resultAddition = Number(secondaryLineNumbers.innerText) + Number(firstLineNumbers.innerText);
            const resultAdditionString = resultAddition.toString();
            
            // If there's dot notation
            if (resultAdditionString.includes('.')) {
                const additionDotIndex = resultAdditionString.indexOf('.');
                const decimalNumbers = resultAdditionString.substring(additionDotIndex);
                const rounded = resultAdditionString.split('.');
                rounded[1] = decimalNumbers.slice(0, 4);
                const newRoundedNumber = rounded[0] + rounded[1];
                
                // Return scientific notation if result is longer than 10 numbers
                if (rounded[0].length >= 7) {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber).toExponential(3);
                } else {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber);
                }
            } 
            // If there's NO dot notation
            // Return scientific notation if result is longer than 10 numbers
            else if (resultAdditionString.length >= 11) {
                firstLineDefaultResult.innerText = resultAddition.toExponential(3);
            } else {
                firstLineDefaultResult.innerText = resultAddition;
            }            
        break

        // Subtraction
        case '-':
            const resultSubtraction = Number(secondaryLineNumbers.innerText) - Number(firstLineNumbers.innerText);
            const resultSubtractionString = resultSubtraction.toString();
            
            // If there's dot notation
            if (resultSubtractionString.includes('.')) {
                const subtractionDotIndex = resultSubtractionString.indexOf('.');
                const decimalNumbers = resultSubtractionString.substring(subtractionDotIndex);
                const rounded = resultSubtractionString.split('.');
                rounded[1] = decimalNumbers.slice(0, 4);
                const newRoundedNumber = rounded[0] + rounded[1];
                
                // Return scientific notation if result is longer than 10 numbers
                if (rounded[0].length >= 7) {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber).toExponential(3);
                } else {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber);
                }
            } 
            // If there's NO dot notation
            // Return scientific notation if result is longer than 10 numbers
            else if (resultSubtractionString.length >= 11) {
                firstLineDefaultResult.innerText = resultSubtraction.toExponential(3);
            } else {
                firstLineDefaultResult.innerText = resultSubtraction;
            }            
        break

        // Multiplication
        case '*':
            const resultMultiplication = Number(secondaryLineNumbers.innerText) * Number(firstLineNumbers.innerText);
            const resultMultiplicationString = resultMultiplication.toString();
            
            // If there's dot notation
            if (resultMultiplicationString.includes('.')) {
                const multiplicationDotIndex = resultMultiplicationString.indexOf('.');
                const decimalNumbers = resultMultiplicationString.substring(multiplicationDotIndex);
                const rounded = resultMultiplicationString.split('.');
                rounded[1] = decimalNumbers.slice(0, 4);
                const newRoundedNumber = rounded[0] + rounded[1];
                
                // Return scientific notation if result is longer than 10 numbers
                if (rounded[0].length >= 7) {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber).toExponential(3);
                } else {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber);
                }
            } 
            // If there's NO dot notation
            // Return scientific notation if result is longer than 10 numbers
            else if (resultMultiplicationString.length >= 11) {
                firstLineDefaultResult.innerText = resultMultiplication.toExponential(3);
            } else {
                firstLineDefaultResult.innerText = resultMultiplication;
            }            
        break

        // Division
        case '/':
            const resultDivision = Number(secondaryLineNumbers.innerText) / Number(firstLineNumbers.innerText);
            const resultDivisionString = resultDivision.toString();
            
            // If there's dot notation
            if (resultDivisionString.includes('.')) {
                const divisionDotIndex = resultDivisionString.indexOf('.');
                const decimalNumbers = resultDivisionString.substring(divisionDotIndex);
                const rounded = resultDivisionString.split('.');
                rounded[1] = decimalNumbers.slice(0, 4);
                const newRoundedNumber = rounded[0] + rounded[1];
                
                // Return scientific notation if result is longer than 10 numbers
                if (rounded[0].length >= 7) {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber).toExponential(3);
                } else {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber);
                }
            } 
            // If there's NO dot notation
            // Return scientific notation if result is longer than 10 numbers
            else if (resultDivisionString.length >= 11) {
                firstLineDefaultResult.innerText = resultDivision.toExponential(3);
            } else {
                firstLineDefaultResult.innerText = resultDivision;
            }            
        break

        default: 
            return
    }
}

// Add clear button functionalities
clearButton.addEventListener('click', clear);

function clear() {
    firstLineDefaultResult.innerText = 0;
    firstLineNumbers.innerText = "";
    firstLineCalcs.innerText = "";
    secondaryLineNumbers.innerText = "";
    secondaryLineCalcs.innerText = "";
}

// Add del button functionalities
delButton.addEventListener('click', del);

function del() {
    firstLineNumbers.innerText = firstLineNumbers.innerText.slice(0, -1);
    if (firstLineNumbers.innerText === "") firstLineDefaultResult.innerText = 0;
    if (firstLineCalcs.innerText !== "") firstLineCalcs.innerText = "";
}

// Add on-off button functionality
onOffButton.addEventListener('click', powerOnOff);

function powerOnOff() {
    firstLineDefaultResult.innerText = 0;
    firstLineNumbers.innerText = "";
    firstLineCalcs.innerText = "";
    secondaryLineNumbers.innerText = "";
    secondaryLineCalcs.innerText = "";
    firstLine.classList.toggle('displayOnOff');
    secondLine.classList.toggle('displayOnOff');
}