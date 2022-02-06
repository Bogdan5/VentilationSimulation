//Makes sure numbers have at most a decimal
exports.setDecimal = (num) => Math.round((num + Number.EPSILON) * 10) / 10;

//Transform Celsius to Fahrenheit
exports.CtoF = (num) => (9*num)/5 + 32;


//Transform Fahrenheit to Celsius
exports.FtoC = (num) => ((num - 32)*5)/9;

//Debouncing
exports.debounce = (func, delay) => {
    let debouncing
    return function() {
        const context = this
        const args = arguments
        clearTimeout(debouncing)
        debouncing = setTimeout(() => func.apply(context, args), delay)
    }
}

//Remove excess decimals
exports.removeExcess = (str) => {
    if (str.indexOf('.') > 0){
        let start = str.indexOf('.');
        return str.slice(0, start + 2);
    }
    return str;
}