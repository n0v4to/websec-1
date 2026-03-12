let history = [];

const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calcBtn = document.getElementById('calculateBtn');
const errorMessage = document.getElementById('errorMessage');
const historyList = document.getElementById('historyList');

function clearErrors() {
    num1Input.classList.remove('error');
    num2Input.classList.remove('error');
    errorMessage.textContent = '';
}

function validateNumber(value, input) {
    if (value === '' || value === null) {
        input.classList.add('error');
        return NaN;
    }
    
    const num = Number(value);
    if (isNaN(num)) {
        input.classList.add('error');
        return NaN;
    }
    
    input.classList.remove('error');
    return num;
}

function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString();
    }
    return num.toFixed(8).replace(/\.?0+$/, '');
}

function updateHistory() {
    if (history.length === 0) {
        historyList.innerHTML = '';
        return;
    }
    
    historyList.innerHTML = history.map(item => 
        `<div class="history-item">${item}</div>`
    ).join('');
}

function calculate() {
    clearErrors();
    
    const num1 = validateNumber(num1Input.value, num1Input);
    const num2 = validateNumber(num2Input.value, num2Input);
    const op = operationSelect.value;
    
    if (isNaN(num1) || isNaN(num2)) {
        errorMessage.textContent = 'Введите числа';
        return;
    }
    
    if (op === '/' && num2 === 0) {
        num2Input.classList.add('error');
        errorMessage.textContent = 'Деление на ноль';
        return;
    }
    
    let result;
    switch(op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
    }
    
    const num1Str = formatNumber(num1);
    const num2Str = formatNumber(num2);
    const resultStr = formatNumber(result);
    
    let displayOp = op;
    if (op === '*') displayOp = '×';
    if (op === '/') displayOp = '÷';
    
    const expression = `${num1Str} ${displayOp} ${num2Str} = ${resultStr}`;
    
    history.unshift(expression);
    
    if (history.length > 4) history.pop();
    
    updateHistory();
}

num1Input.addEventListener('input', () => {
    num1Input.classList.remove('error');
    if (!num1Input.classList.contains('error') && !num2Input.classList.contains('error')) {
        errorMessage.textContent = '';
    }
});

num2Input.addEventListener('input', () => {
    num2Input.classList.remove('error');
    if (!num1Input.classList.contains('error') && !num2Input.classList.contains('error')) {
        errorMessage.textContent = '';
    }
});

calcBtn.addEventListener('click', calculate);

num1Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculate();
});

num2Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculate();
});