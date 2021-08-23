let numberItem = document.querySelectorAll('.number-item');
let operatorItem = document.querySelectorAll('.item-red');
let inputCalculatorKecil = document.querySelector('.result-input-kecil');
let inputCalculatorBesar = document.querySelector('.result-input-besar');
let removeAllItem = document.querySelector('.remove-all-item');
let removeOneItem = document.querySelector('.remove-one-item');
let resultItem = document.querySelector('.result-item');

let inputNumber = '';

numberItem.forEach(m => {
    m.addEventListener('click', function () {
        inputNumber = m.dataset.value
        if (inputCalculatorKecil.value == '0') inputCalculatorKecil.value = '';

        inputCalculatorKecil.value += inputNumber;
    })
});

operatorItem.forEach(m => {
    let inputOperatorValue = m.dataset.value;

    m.addEventListener('click', function () {
        const inputOperator = /[+*\/-]/g;
        let inputKecilOperator = inputCalculatorKecil.value.match(inputOperator);

        if (inputKecilOperator == null) {
            inputCalculatorKecil.value += inputOperatorValue;
            if (inputCalculatorKecil.value.match('/100')) {
                inputCalculatorKecil.value = eval(inputCalculatorKecil.value)
            }
        } else {
            if (inputCalculatorKecil.value.match('/100')) {
                inputCalculatorKecil.value = eval(inputCalculatorKecil.value)
                inputKecilOperator = null
            } else if (inputCalculatorKecil.value.slice(-1).match(inputOperator)) {
                let removeInputOperator = inputCalculatorKecil.value.split('').reverse().join('').substr(1, inputCalculatorKecil.value.length);
                inputCalculatorKecil.value = removeInputOperator.split('').reverse().join('');
                inputCalculatorKecil.value += inputOperatorValue;
                if (inputCalculatorKecil.value.match('/100')) {
                    inputCalculatorKecil.value = eval(inputCalculatorKecil.value)
                    inputKecilOperator = null
                } 
                inputKecilOperator = null
            } else {
                inputCalculatorKecil.value += inputOperatorValue;
                if (inputCalculatorKecil.value.match('/100')) {
                    inputCalculatorKecil.value = eval(inputCalculatorKecil.value)
                    inputKecilOperator = null
                } 
                inputKecilOperator = null
            }
        }
    })
});

removeAllItem.addEventListener('click', function () {
    inputCalculatorKecil.value = '0';
    inputCalculatorBesar.value = '0';
})

removeOneItem.addEventListener('click', function () {
    if (inputCalculatorKecil.value == '0') {
        inputCalculatorKecil.value = '0'
    } else {
        let inputValue = inputCalculatorKecil.value;
        if (inputValue.length == 1) {
            inputCalculatorKecil.value = '0';
        } else {
            inputValue = inputValue.split('').reverse().join('').substr(1, inputValue.length);
            inputCalculatorKecil.value = inputValue.split('').reverse().join('');
        }
    }
})

resultItem.addEventListener('click', function () {
    const inputOutput = inputCalculatorKecil.value;
    const inputOperator = /[+*\/-]/g;

    if (inputOutput.slice(-1).match(inputOperator)) {
        let errorText = `ERROR\n${inputOutput}?\nPERSAMAAN TIDAK LENGKAP !`;
        alert(errorText);

        inputCalculatorKecil.value = '0'
        inputCalculatorBesar.value = '0';
    } else {
        let result = eval(inputOutput);
        inputCalculatorBesar.value = result;
    }
})


let btnLightTheme = document.querySelector('.light-theme');
let btnDarkTheme = document.querySelector('.dark-theme');

btnLightTheme.addEventListener('click', function () {
    document.body.setAttribute('data-theme', 'light');
})

btnDarkTheme.addEventListener('click', function () {
    document.body.setAttribute('data-theme', '');
})