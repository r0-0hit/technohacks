let calc='';
function input (ip){
    calc+=ip;
};

function screen() {
    document.querySelector('.display-value').innerHTML = calc; 
};

function calculate() {
    calc= eval(calc);
    document.querySelector('.display-value').innerHTML = calc;
};

function clearDisplay() {
    calc = '0';
    screen();
    calc = '';
};