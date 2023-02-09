const INPUTS_CHECKBOX = [
    document.getElementById('lUpper'),
    document.getElementById('lLower'),
    document.getElementById('num'),
    document.getElementById('simb')
];
const SIZE = document.getElementById('size');
const BTN = document.getElementById('btn');
const COPY = document.getElementById('copy-password');
const PASSWORD_RESULT = document.getElementById('password-result');

const UPPER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUM = '0123456789';
const SIMBOLS = '[]{}/\\|!@#$%&*()-+';
const VAL = '1px solid #FF0000';

let PASSWORD = "";

INPUTS_CHECKBOX.forEach(el => {
    el.oninput = function() {
        switch (this.id) {
            case 'lUpper':
                includeValues(el, UPPER_LETTERS);
                break;

            case 'lLower':
                includeValues(el, LOWER_LETTERS);
                break;

            case 'num':
                includeValues(el, NUM);
                break;

            case 'simb':
                includeValues(el, SIMBOLS);
                break;
        
            default:
                break;
        }          
    }
});

SIZE.oninput = function() {
    this.style.border = 'none';
    
    if (SIZE.value > 22) {
        SIZE.value = 22;
    } else if (SIZE.value < 0) {
        SIZE.value = 0;
    }
}

BTN.onclick = function() {
    if(PASSWORD_RESULT.innerText != '') PASSWORD_RESULT.textContent = '';
 
    if (SIZE.value.length == 0 && PASSWORD.length == 0) {
        SIZE.style.border = VAL;

        INPUTS_CHECKBOX.forEach(el => {
            el.style.outline = VAL;
        });
    } else if (SIZE.value.length == 0) {
        SIZE.style.border = VAL;
    } else if(PASSWORD.length == 0) {       
        INPUTS_CHECKBOX.forEach(el => {
            el.style.outline = VAL;
        });
    } else {
        for (let i = 1; i <= SIZE.value; i++) { //size
            PASSWORD_RESULT.textContent += PASSWORD[Math.floor(Math.random() * PASSWORD.length)];
        }
    }
}

COPY.onclick = function() {
    navigator.clipboard.writeText(PASSWORD_RESULT.textContent);
}

function includeValues(el, val) {
    if(el.checked) {
        PASSWORD += val;

        INPUTS_CHECKBOX.forEach(el => {
            el.style.outline = 'none';
        });
    } else {
        PASSWORD = PASSWORD.substring(0, PASSWORD.length - val.length);
    }
}