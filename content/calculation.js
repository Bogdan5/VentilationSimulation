let {data} = require('./data.js');

exports.debounce = (func, delay) => {
  let debouncing
  return function() {
    const context = this
    const args = arguments
    clearTimeout(debouncing)
    debouncing = setTimeout(() => func.apply(context, args), delay)
  }
}

//Determines if enough data available for calculation
let dataCompletenessCheck = (data) => {
    return data.minTransmTemp.known && data.maxTransmTemp.known && data.minFinContrPress.known &&
    data.maxFinContrPress.known && data.minDesirTemp.known && data.maxDesirTemp.known;};

let dataValidityCheck = data => {
  if ((data.minTransmTemp.val < data.maxTransmTemp.val) && (data.minDesirTemp.val < data.maxDesirTemp.val) &&
    (data.minFinContrPress.val < data.maxFinContrPress.val) && (data.minTransmTemp.val < data.minDesirTemp.val) &&
    (data.maxDesirTemp.val < data.maxTransmTemp.val) && (data.minDesirTemp.val < data.temperature.val) &&
    (data.temperature.val < data.maxDesirTemp.val) && (data.minFinContrPress.val < data.maxFinContrPress.val) &&
    (data.minFinContrPress.val > 0) && (data.maxFinContrPress.val > 0))
    {
      return true;
    }
  return false;
};

let setDecimal = (num) => Math.round((num + Number.EPSILON) * 10) / 10;


//Render calculation results
let renderResults = (data, minOpen, maxOpen) => {
  let sensit = data.maxDesirTemp.val - data.minDesirTemp.val;
  document.getElementById('sensitivityVal').innerHTML = setDecimal(sensit);
  document.getElementById('proportionalBandVal').innerHTML = setDecimal((sensit * 100)/(data.maxTransmTemp.val - data.minTransmTemp.val)) + "%";
  document.getElementById('transmitterPressVal').innerHTML = 3 +
    setDecimal((12 * (data.temperature.val - data.minTransmTemp.val))/(data.maxTransmTemp.val - data.minTransmTemp.val));
  document.getElementById('finContrPressVal').innerHTML = setDecimal(data.minFinContrPress.val + ((data.maxFinContrPress.val - data.minFinContrPress.val)*
    (data.temperature.val - data.minDesirTemp.val))/(data.maxDesirTemp.val - data.minDesirTemp.val));
  document.getElementById('openFinContrVal').innerHTML = setDecimal(minOpen + (data.temperature.val - data.minDesirTemp.val)*(maxOpen - minOpen)/
  (data.maxDesirTemp.val - data.minDesirTemp.val));
  document.getElementById('setPointVal').innerHTML = setDecimal((data.maxDesirTemp.val + data.minDesirTemp.val)/2);
}

// Recalculates value on change
exports.recalculate = (data, normalBehaviour) => {
  let minOpen, maxOpen;
  if (dataCompletenessCheck(data) && dataValidityCheck(data)) {
    if (normalBehaviour === 'normalOpen') {
      minOpen = 100;
      maxOpen = 0;
    } else {
      minOpen = 0;
      maxOpen = 100;
    }
    renderResults(data, minOpen, maxOpen);
  }
}

// Get the values of the input
exports.saveInputChange = (id) => {
  let x = data[id].val;
  let nod = document.getElementById(id);
  return () => {
    let val = nod.value;
    if (val.length === 0){
      data[id].known = false;
    } else {
      data[id].val = Number(val);
      //Check if the data is complete and valid
      if (dataCompletenessCheck(data) && dataValidityCheck(data)){
        recalculate(data, type.normalBehaviour);
      } else {
        data[id].val = x;
        nod.value = x;
        //maybe some comment of wrong input
      }
      // data[id].known = true;
    }
  }
}

exports.sliderMove = (id) => {
  let nod = document.getElementById(id);
  let inp = document.getElementById(id.slice(7));
  let temp = (nod.value/100)*(data.maxDesirTemp.val - data.minDesirTemp.val) + data.minDesirTemp.val;
  inp.value = temp;
  data[id.slice(7)].val = temp;
  recalculate(data);
}





// export {data, recalculate};