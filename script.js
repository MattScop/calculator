/* 
FIRST STEP:
When Click Number, It Appears On The Screen;
*/

const buttonsNumber = document.getElementsByClassName('number');

// Create array for numbers inserted
const arrButtonsNumber = [];

const buttonsCalc = document.getElementsByClassName('calc');
const multiplier = document.querySelector('.multiplier');
const divider = document.querySelector('.divider')
const displayNumber = document.querySelector('.display-numbers');
const displayCalc = document.querySelector('.display-calcs');

// Listen to mouse click on each button
Array.from(buttonsNumber).forEach(button => {
    button.addEventListener('click', (e) => {

        // Allow 10 numbers input max
        if (displayNumber.innerText.length <= 9) {
            displayNumber.innerText += parseInt(e.target.innerText);
            
            // Place number in array to allow for DEL button to work later
            arrButtonsNumber.push(parseInt(e.target.innerText));
        } else {
            return
        }
    })
})

// Add operators always at the end
Array.from(buttonsCalc).forEach(button => {
    button.addEventListener('click', (e) => {
        
        // change multiplier and divider style to better fit the font
        if (e.target.classList.contains('multiplier')) {
            displayCalc.innerText = '*';
        } else if (e.target.classList.contains('divider')){
            displayCalc.innerText = "/";
        } else {
            displayCalc.innerText = e.target.innerText
        }
    })
})