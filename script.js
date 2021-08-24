let numberItem = document.querySelectorAll('.number-item');
let operatorItem = document.querySelectorAll('.item-red');
let inputCalculatorKecil = document.querySelector('.result-input-kecil');
let inputCalculatorBesar = document.querySelector('.result-input-besar');
let removeAllItem = document.querySelector('.remove-all-item');
let removeOneItem = document.querySelector('.remove-one-item');
let resultItem = document.querySelector('.result-item');

numberItem.forEach(m => {
    m.addEventListener('click', function () {
        inputNumber = m.dataset.value;
        if (inputCalculatorKecil.value == '0') {
            inputCalculatorKecil.value = '';
        }

        inputCalculatorKecil.value += inputNumber;
        if (inputCalculatorKecil.value == '00' || inputCalculatorKecil.value == '000') {
            inputCalculatorKecil.value = '0';
        }
    })
});

function inputMatch100() {
    inputCalculatorKecil.value = eval(inputCalculatorKecil.value);
    inputCalculatorBesar.value = eval(inputCalculatorKecil.value);
    document.querySelector('.btn-copy').style.display = "flex";
}

operatorItem.forEach(m => {
    let inputOperatorValue = m.dataset.value;

    m.addEventListener('click', function () {
        const inputOperator = /[+*\/-]/g;
        let inputKecilOperator = inputCalculatorKecil.value.match(inputOperator);

        if (inputKecilOperator == null) {
            inputCalculatorKecil.value += inputOperatorValue;
            if (inputCalculatorKecil.value.match('/100')) {
                inputMatch100();
                riwayatCode();
            }
        } else {
            if (inputCalculatorKecil.value.slice(-1).match(inputOperator)) {
                let removeInputOperator = inputCalculatorKecil.value.split('').reverse().join('').substr(1, inputCalculatorKecil.value.length);
                inputCalculatorKecil.value = removeInputOperator.split('').reverse().join('');
                inputCalculatorKecil.value += inputOperatorValue;
                if (inputCalculatorKecil.value.match('/100')) {
                    inputMatch100();
                    riwayatCode();
                    inputKecilOperator = null;
                }
                inputKecilOperator = null;
            } else {
                inputCalculatorKecil.value += inputOperatorValue;
                if (inputCalculatorKecil.value.match('/100')) {
                    inputMatch100();
                    riwayatCode();
                    inputKecilOperator = null;
                }
                inputKecilOperator = null;
            }
        }
    })
});

removeAllItem.addEventListener('click', function () {
    inputCalculatorKecil.value = '0';
    inputCalculatorBesar.value = '0';
    document.querySelector('.btn-copy').style.display = "none";
})

removeOneItem.addEventListener('click', function () {
    if (inputCalculatorKecil.value == '0' || inputCalculatorKecil.value == '0.') {
        document.querySelector('.btn-copy').style.display = "none";
        inputCalculatorKecil.value = '0';
        inputCalculatorBesar.value = '0';
    } else {
        let inputValue = inputCalculatorKecil.value;
        if (inputValue.length == 1) {
            inputCalculatorBesar.value = '0';
            inputCalculatorKecil.value = '0';
            document.querySelector('.btn-copy').style.display = "none";
        } else {
            inputValue = inputValue.split('').reverse().join('').substr(1, inputValue.length);
            inputCalculatorKecil.value = inputValue.split('').reverse().join('');
        }
    }
})

function riwayatCode() {
    let inputCalculatorKecilArr = [];
    let inputCalculatorBesarArr = [];
    inputCalculatorKecilArr.push(inputCalculatorKecil.value);
    inputCalculatorBesarArr.push(inputCalculatorBesar.value);

    let bodyRiwayat = document.querySelector('.body-riwayat');
    let bodyRiwayatDiv = document.createElement('div');
    let bodyRiwayatTxt = document.createTextNode(inputCalculatorKecilArr[inputCalculatorKecilArr.length - 1] + " = " + inputCalculatorBesarArr[inputCalculatorBesarArr.length - 1]);

    if (bodyRiwayat.innerHTML == 'Belum Ada Riwayat') {
        bodyRiwayat.innerHTML = '';
    }

    bodyRiwayatDiv.classList.add('riwayat-kalkulator')

    bodyRiwayatDiv.appendChild(bodyRiwayatTxt);
    bodyRiwayat.appendChild(bodyRiwayatDiv);

    let riwayatKalkulator = document.querySelectorAll('.riwayat-kalkulator');

    riwayatKalkulator.forEach(m => {
        m.addEventListener('click', function () {
            let riwayatKalkulatorSplit = m.innerHTML.split(' = ');
            let riwayatContainer = document.querySelector('.riwayat-container');
            let riwayatBox = document.querySelector('.riwayat-box');

            inputCalculatorKecil.value = riwayatKalkulatorSplit[0];
            inputCalculatorBesar.value = riwayatKalkulatorSplit[1];

            riwayatContainer.style.opacity = '0';
            riwayatContainer.style.visibility = 'hidden';
            riwayatBox.style.right = '-300px';
        })
    })
}

resultItem.addEventListener('click', function () {
    const inputOutput = inputCalculatorKecil.value;
    const inputOperator = /[+*\/-]/g;

    if (inputOutput.slice(-1).match(inputOperator)) {
        let errorText = `ERROR\n${inputOutput}?\nPERSAMAAN TIDAK LENGKAP !`;
        alert(errorText);

        inputCalculatorKecil.value = '0';
        inputCalculatorBesar.value = '0';
        document.querySelector('.btn-copy').style.display = "none";
    } else {
        let result = eval(inputOutput);
        inputCalculatorBesar.value = result;
        document.querySelector('.btn-copy').style.display = "flex";
    }

    riwayatCode();
})

let btnLightTheme = document.querySelector('.light-theme');
let btnDarkTheme = document.querySelector('.dark-theme');

btnLightTheme.addEventListener('click', function () {
    document.body.setAttribute('data-theme', 'light');
})

btnDarkTheme.addEventListener('click', function () {
    document.body.setAttribute('data-theme', '');
})

document.querySelector('.btn-copy').addEventListener('click', function () {
    document.querySelector('.btn-copy').innerHTML = `<div class="fas fa-clipboard-list"></div>`;
    inputCalculatorBesar.select();
    inputCalculatorBesar.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputCalculatorBesar.value);
    setTimeout(() => {
        alert(`Hasil Perhitungan Berhasil Di Copy\nAngka Yang Di Copy = ${inputCalculatorBesar.value}`);
        document.querySelector('.btn-copy').innerHTML = `<div class="far fa-clipboard"></div>`;
    }, 500);
})

let riwayatContainer = document.querySelector('.riwayat-container');
let riwayatBox = document.querySelector('.riwayat-box');

document.querySelector('.btn-riwayat').addEventListener('click', function () {
    riwayatContainer.style.opacity = '1';
    riwayatContainer.style.visibility = 'visible';
    riwayatBox.style.right = '0';
})

document.querySelector('.close-riwayat').addEventListener('click', function () {
    riwayatContainer.style.opacity = '0';
    riwayatContainer.style.visibility = 'hidden';
    riwayatBox.style.right = '-300px';
})

document.querySelector('.btn-trash').addEventListener('click', function () {
    let bodyRiwayat = document.querySelector('.body-riwayat');
    if (bodyRiwayat.innerHTML == 'Belum Ada Riwayat') {
        bodyRiwayat.innerHTML = 'Belum Ada Riwayat';
    } else {
        bodyRiwayat.innerHTML = '';
        bodyRiwayat.innerHTML = 'Belum Ada Riwayat';
    }
})

riwayatContainer.addEventListener('click', function (e) {
    if(e.target.classList.value == 'riwayat-container') {
        riwayatContainer.style.opacity = '0';
        riwayatContainer.style.visibility = 'hidden';
        riwayatBox.style.right = '-300px';
    }
})