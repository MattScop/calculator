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

// Create array for numbers inserted for DEL button to work later
let arrButtonsNumber = [];

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
    }

    // Clear button
    if (e.key === 'Delete') {
        clear()
    }

    // Del button
    if (e.key === 'Backspace') {
        del()
    }

})

function insertInput(e) {

    // Allow 10 numbers input max
    if (firstLineNumbers.innerText.length === 10 && firstLineCalcs.innerText === "") {
        return
    }

    // Allow 3 decimals max
    if (firstLineNumbers.innerText.includes('.')) {
        let split = firstLineNumbers.innerText.split('.');
        let decimals = split[1];
        if (decimals.length === 3 && firstLineCalcs.innerText === "") {
            return
        }
    }

    // Prevent multiple 0 from being inserted
    if (e.target.innerText === "0" && firstLineNumbers.innerText.length === 0) {
        return
    } else if (e.target.innerText === "0" && firstLineNumbers.innerText.length === 1 && firstLineNumbers.innerText.includes('0')) {
        if (firstLineCalcs.innerText !== "" || secondaryLineCalcs !== "") {
            return
        }
    }

    // Go to secondary line if operator is present on number input
    if (firstLineCalcs.innerText !== "") {

        // allows to overwrite result number on new input
        if (firstLineDefaultResult.innerText !== "") {
            secondaryLineNumbers.innerText = firstLineDefaultResult.innerText;
        } else {
            secondaryLineNumbers.innerText = firstLineNumbers.innerText;
        }

        secondaryLineCalcs.innerText = firstLineCalcs.innerText;
        firstLineNumbers.innerText = "";
        firstLineDefaultResult.innerText = "";
        firstLineCalcs.innerText = "";
        arrButtonsNumber = [];
        firstLineNumbers.innerText += e.target.innerText;
        arrButtonsNumber.push(e.target.innerText);
    } else if (firstLineDefaultResult.innerText !== "") {
        arrButtonsNumber = [];
        firstLineDefaultResult.innerText = "";
        firstLineNumbers.innerText += e.target.innerText;
        arrButtonsNumber.push(e.target.innerText);
    } else {
        firstLineDefaultResult.innerText = "";
        if (firstLineNumbers.innerText.length === 1 && firstLineNumbers.innerText.includes('0')) {
            firstLineNumbers.innerText = e.target.innerText;
            arrButtonsNumber.push(e.target.innerText);    
        } else {
            firstLineNumbers.innerText += e.target.innerText;
            arrButtonsNumber.push(e.target.innerText);
        }
    }

}

function insertKbdInput(e) {
    const kbdButtonsNumber = document.querySelector(`[data-number="${e.key}"]`);
    if (!kbdButtonsNumber) return // return if no key is found

    // Allow 10 numbers input max
    if (firstLineNumbers.innerText.length === 10 && firstLineCalcs.innerText === "") {
        return
    }

    // Allow 3 decimals max
    if (firstLineNumbers.innerText.includes('.')) {
        let split = firstLineNumbers.innerText.split('.');
        let decimals = split[1];
        if (decimals.length === 3 && firstLineCalcs.innerText === "") {
            return
        }
    }

    // Prevent multiple 0 from being inserted
    if (kbdButtonsNumber.innerText === "0" && firstLineNumbers.innerText.length === 1 && firstLineNumbers.innerText.includes('0')) {
        if (firstLineCalcs.innerText !== "" || secondaryLineCalcs !== "") {
            return
        }
    }

    // Go to secondary line if operator is present on number input
    if (firstLineCalcs.innerText !== "" ) {

        // allows to overwrite result number on new input
        if (firstLineDefaultResult.innerText !== "") {
            secondaryLineNumbers.innerText = firstLineDefaultResult.innerText;
        } else {
            secondaryLineNumbers.innerText = firstLineNumbers.innerText;
        }

        secondaryLineCalcs.innerText = firstLineCalcs.innerText;
        firstLineNumbers.innerText = "";
        firstLineDefaultResult.innerText = "";
        firstLineCalcs.innerText = "";
        arrButtonsNumber = [];
        firstLineNumbers.innerText += kbdButtonsNumber.innerText;
        arrButtonsNumber.push(kbdButtonsNumber.innerText);
    }  else if (firstLineDefaultResult.innerText !== "") {
        arrButtonsNumber = [];
        firstLineDefaultResult.innerText = "";
        firstLineNumbers.innerText += kbdButtonsNumber.innerText;
        arrButtonsNumber.push(kbdButtonsNumber.innerText);
    }  else {
        firstLineDefaultResult.innerText = "";
        if (firstLineNumbers.innerText.length === 1 && firstLineNumbers.innerText.includes('0')) {
            firstLineNumbers.innerText = kbdButtonsNumber.innerText;
            arrButtonsNumber.push(kbdButtonsNumber.innerText);    
        } else {
            firstLineNumbers.innerText += kbdButtonsNumber.innerText;
            arrButtonsNumber.push(kbdButtonsNumber.innerText);
        }
    }
    
}

// Add operators
Array.from(buttonsCalc).forEach(button => {
    button.addEventListener('click', addOperator)
});

function addOperator(e) {

    // Trigger operate when clicking another operator instead of equal button
    if (secondaryLineNumbers.innerText !== "" && firstLineNumbers.innerText !== "") {
        operate();
    }
        // change multiplier and divider style to better fit the font
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
    }
        // change multiplier and divider style to better fit the font
        if (kbdButtonsCalc.classList.contains('multiplier')) {
            firstLineCalcs.innerText = '*';
        } else if (kbdButtonsCalc.classList.contains('divider')) {
            firstLineCalcs.innerText = "/";
        } else {
            firstLineCalcs.innerText = kbdButtonsCalc.innerText
        }
}

// Add equal functionality
equalButton.addEventListener('click', operate);

function operate() {
    switch (true) {

        // Addition
        case secondaryLineCalcs.innerText === '+':
            arrButtonsNumber = [];
            const resultAddition = Number(secondaryLineNumbers.innerText) + Number(firstLineNumbers.innerText);
            const resultAdditionString = resultAddition.toString();
            
            // if there's dot notation
            if (resultAdditionString.includes('.')) {
                const additionDotIndex = resultAdditionString.indexOf('.');
                const decimalNumbers = resultAdditionString.substring(additionDotIndex);
                const rounded = resultAdditionString.split('.');
                rounded[1] = decimalNumbers.slice(0, 4);
                const newRoundedNumber = rounded[0] + rounded[1];
                
                // return scientific notation if result is longer than 10 numbers
                if (rounded[0].length >= 7) {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber).toExponential(3);
                } else {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber);
                }
            } 
            // if there's NO dot notation
            // return scientific notation if result is longer than 10 numbers
            else if (resultAdditionString.length === 10) {
                firstLineDefaultResult.innerText = resultAddition.toExponential(3);
            } else {
                firstLineDefaultResult.innerText = resultAddition;
            }
            
            firstLineNumbers.innerText = "";
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
            arrButtonsNumber.push(firstLineDefaultResult.innerText);
        break

        // Subtraction
        case secondaryLineCalcs.innerText === '-':
            arrButtonsNumber = [];
            const resultSubtraction = Number(secondaryLineNumbers.innerText) - Number(firstLineNumbers.innerText);
            const resultSubtractionString = resultSubtraction.toString();
            
            // if there's dot notation
            if (resultSubtractionString.includes('.')) {
                const subtractionDotIndex = resultSubtractionString.indexOf('.');
                const decimalNumbers = resultSubtractionString.substring(subtractionDotIndex);
                const rounded = resultSubtractionString.split('.');
                rounded[1] = decimalNumbers.slice(0, 4);
                const newRoundedNumber = rounded[0] + rounded[1];
                
                // return scientific notation if result is longer than 10 numbers
                if (rounded[0].length >= 7) {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber).toExponential(3);
                } else {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber);
                }

            }
            // if there's NO dot notation
            // return scientific notation if result is longer than 10 numbers
            else if (resultSubtractionString.length === 10) {
                firstLineDefaultResult.innerText = resultSubtraction.toExponential(3);
            } else {
                firstLineDefaultResult.innerText = resultSubtraction;
            }
            
            firstLineNumbers.innerText = "";
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
            arrButtonsNumber.push(firstLineDefaultResult.innerText);
        break

        // Multiplication
        case secondaryLineCalcs.innerText === '*':
            arrButtonsNumber = [];
            const resultMultiplication = Number(secondaryLineNumbers.innerText) * Number(firstLineNumbers.innerText);
            const resultMultiplicationString = resultMultiplication.toString();
            
            // if there's dot notation
            if (resultMultiplicationString.includes('.')) {
                const multiplicationDotIndex = resultMultiplicationString.indexOf('.');
                const decimalNumbers = resultMultiplicationString.substring(multiplicationDotIndex);
                const rounded = resultMultiplicationString.split('.');
                rounded[1] = decimalNumbers.slice(0, 4);
                const newRoundedNumber = rounded[0] + rounded[1];
                
                // return scientific notation if result is longer than 10 numbers
                if (rounded[0].length >= 7) {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber).toExponential(3);
                } else {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber);
                }

            }
            // if there's NO dot notation
            // return scientific notation if result is longer than 10 numbers
            else if (resultMultiplicationString.length === 10) {
                firstLineDefaultResult.innerText = resultMultiplication.toExponential(3);
            } else {
                firstLineDefaultResult.innerText = resultMultiplication;
            }
            
            firstLineNumbers.innerText = "";
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
            arrButtonsNumber.push(firstLineDefaultResult.innerText);
        break

        // Division
        case secondaryLineCalcs.innerText === '/':
            arrButtonsNumber = [];
            const resultDivision = Number(secondaryLineNumbers.innerText) / Number(firstLineNumbers.innerText);
            const resultDivisionString = resultDivision.toString();
            
            // if there's dot notation
            if (resultDivisionString.includes('.')) {
                const divisionDotIndex = resultDivisionString.indexOf('.');
                const decimalNumbers = resultDivisionString.substring(divisionDotIndex);
                const rounded = resultDivisionString.split('.');
                rounded[1] = decimalNumbers.slice(0, 4);
                const newRoundedNumber = rounded[0] + rounded[1];
                
                // return scientific notation if result is longer than 10 numbers
                if (rounded[0].length >= 7) {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber).toExponential(3);
                } else {
                    firstLineDefaultResult.innerText = Number(newRoundedNumber);
                }

            }
            // if there's NO dot notation
            // return scientific notation if result is longer than 10 numbers
            else if (resultDivisionString.length === 10) {
                firstLineDefaultResult.innerText = resultDivision.toExponential(3);
            } else {
                firstLineDefaultResult.innerText = resultDivision;
            }
            
            firstLineNumbers.innerText = "";
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
            arrButtonsNumber.push(firstLineDefaultResult.innerText);
        break

        case firstLineCalcs.innerText !== "" && firstLineNumbers.innerText === "":
            arrButtonsNumber = [];
            firstLineNumbers.innerText = "";
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
            arrButtonsNumber.push(firstLineDefaultResult.innerText);
        break

        default: 
            arrButtonsNumber = [];
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
            arrButtonsNumber.push(firstLineNumbers.innerText);
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
    arrButtonsNumber = [];
}

// Add del button functionalities
delButton.addEventListener('click', del);

function del() {
    arrButtonsNumber.pop();
    firstLineNumbers.innerText = arrButtonsNumber.join("");
    if (firstLineNumbers.innerText === "") {
        firstLineDefaultResult.innerText = 0;
    }
}

// Add on-off button functionality
onOffButton.addEventListener('click', powerOnOff);

function powerOnOff() {
    firstLineDefaultResult.innerText = 0;
    firstLineNumbers.innerText = "";
    firstLineCalcs.innerText = "";
    secondaryLineNumbers.innerText = "";
    secondaryLineCalcs.innerText = "";
    arrButtonsNumber = [];
    firstLine.classList.toggle('displayOnOff');
    secondLine.classList.toggle('displayOnOff');
}