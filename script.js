/* 
FIRST STEP: --DONE--
When Click Number, It Appears On The Screen;
*/

/* 
SECOND STEP:
The number inserted AFTER the operator must start with a fresh line,
placing the old number on the secondary line
*/

/* 
STEP THREE:
Calculate the values when pressing equals button
*/

const buttonsNumber = document.getElementsByClassName('number');
const buttonsCalc = document.getElementsByClassName('calc');
const multiplier = document.querySelector('.multiplier');
const divider = document.querySelector('.divider');
const equalButton = document.querySelector('.equal');
const firstLineNumbers = document.querySelector('.first-line-numbers');
const firstLineCalcs = document.querySelector('.first-line-calcs');
const secondaryLineNumbers = document.querySelector('.secondary-line-numbers');
const secondaryLineCalcs = document.querySelector('.secondary-line-calcs');

// Create array for numbers inserted
const arrButtonsNumber = [];

// Listen to mouse click on each button
Array.from(buttonsNumber).forEach(button => {
    button.addEventListener('click', (e) => {

        // Allow 10 numbers input max
        if (firstLineNumbers.innerText.length <= 9) {

            // Go to secondary line if operator is present on number input
            if (firstLineCalcs.innerText !== "" ) {
                secondaryLineNumbers.innerText = firstLineNumbers.innerText;
                secondaryLineCalcs.innerText = firstLineCalcs.innerText;
                firstLineNumbers.innerText = "";
                firstLineCalcs.innerText = "";
                firstLineNumbers.innerText += e.target.innerText;
            } else {
                firstLineNumbers.innerText += e.target.innerText;

                // Place number in array to allow for DEL button to work later
                arrButtonsNumber.push(e.target.innerText);
            }

        } else {
            return
        }
    })
})

// Add operators at the end
Array.from(buttonsCalc).forEach(button => {
    button.addEventListener('click', (e) => {

        // Trigger operate when clicking another operator instead of equal button
        if (secondaryLineNumbers.innerText !== "" && firstLineNumbers.innerText !== "") {
            operate();
        }
            // change multiplier and divider style to better fit the font
            if (e.target.classList.contains('multiplier')) {
                firstLineCalcs.innerText = '*';
            } else if (e.target.classList.contains('divider')){
                firstLineCalcs.innerText = "/";
            } else {
                firstLineCalcs.innerText = e.target.innerText
            }

    })
})

// Add equal functionality
equalButton.addEventListener('click', operate);

function operate() {
    switch (true) {

        // Addition
        case secondaryLineCalcs.innerText === '+':
            firstLineNumbers.innerText = parseInt(secondaryLineNumbers.innerText) + parseInt(firstLineNumbers.innerText);
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
        break

        // Subtraction
        case secondaryLineCalcs.innerText === '-':
            firstLineNumbers.innerText = parseInt(secondaryLineNumbers.innerText) - parseInt(firstLineNumbers.innerText);
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
        break

        // Multiplication
        case secondaryLineCalcs.innerText === '*':
            firstLineNumbers.innerText = parseInt(secondaryLineNumbers.innerText) * parseInt(firstLineNumbers.innerText);
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
        break

        // Division
        case secondaryLineCalcs.innerText === '/':
            firstLineNumbers.innerText = parseInt(secondaryLineNumbers.innerText) / parseInt(firstLineNumbers.innerText);
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
        break

        // Throw error if something went wrong
        default:
            firstLineNumbers.innerText = "ERR";
            firstLineCalcs.innerText = "";
            secondaryLineNumbers.innerText = "";
            secondaryLineCalcs.innerText = "";
    }
}