const INPUTS_CHECKBOX = [
    document.getElementById('lUpper'),
    document.getElementById('lLower'),
    document.getElementById('num'),
    document.getElementById('simb')
];

const PASSWORD_SIZE = document.getElementById('size');
const BTN_GEN = document.getElementById('btn');
const BTN_COPY = document.getElementById('copy-password');
const PASSWORD_RESULT = document.getElementById('password-result');

const UPPER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMS = "0123456789";
const SIMBOLS = "[]{}/\\|!@#$%&*()-+";

const OPTION = "1px solid #FF0000";
const TOOLTIP = document.getElementById('txt');

let password = "";

BTN_GEN.onclick = function() {
    if(PASSWORD_RESULT.textContent !== '') PASSWORD_RESULT.textContent = '';

    if (PASSWORD_SIZE.value.length === 0 && password.length === 0) {
        PASSWORD_SIZE.style.border = OPTION;

        INPUTS_CHECKBOX.forEach(el => {
            el.style.outline = OPTION;
        });
    } else if (PASSWORD_SIZE.value.length === 0) {
        PASSWORD_SIZE.style.border = OPTION;
    } else if(password.length === 0) {       
        INPUTS_CHECKBOX.forEach(el => {
            el.style.outline = OPTION;
        });
    } else {
        for (let i = 1; i <= PASSWORD_SIZE.value; i++) { //size
            PASSWORD_RESULT.textContent += password[Math.floor(Math.random() * password.length)];
        }
    }
}

PASSWORD_SIZE.oninput = function() {
    this.style.border = 'none';
    
    if (PASSWORD_SIZE.value > 22) {
        PASSWORD_SIZE.value = 22;
    } else if (PASSWORD_SIZE.value < 0) {
        PASSWORD_SIZE.value = 0;
    }
}

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
                includeValues(el, NUMS);
                break;

            case 'simb':
                includeValues(el, SIMBOLS);
                break;
        
            default:
                break;
        }          
    }
});

BTN_COPY.onclick = function() {
    navigator.clipboard.writeText(PASSWORD_RESULT.textContent);
    TOOLTIP.textContent = 'Copiado!';
}

BTN_COPY.onmouseleave = function() {
    TOOLTIP.textContent = 'Copiar!';
}

function includeValues(el, val) {
    if(el.checked) {
        password += val;

        INPUTS_CHECKBOX.forEach(el => {
            el.style.outline = 'none';
        });
    } else {
        password = password.substring(0, password.length - val.length);
    }
}