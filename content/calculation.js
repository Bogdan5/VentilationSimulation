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
let dataCompletenessCheck = (data) => data.minTransmTemp.known && data.maxTransmTemp.known && data.minFinContrPress.known &&
    data.maxFinContrPress.known && data.minDesirTemp.known && data.maxDesirTemp.known && data.setPoint.known;

let dataValidityCheck = data => {
  if ((data.minTransmTemp.val < data.maxTransmTemp.val) && (data.minDesirTemp.val < data.maxDesirTemp.val) &&
    (data.minFinContrPress.val < data.maxFinContrPress.val) && (data.minTransmTemp.val < data.minDesirTemp.val) &&
    (data.maxDesirTemp.val < data.maxTransmTemp.val) && (data.minDesirTemp.val < data.temperature.val) &&
    (data.temperature.val < data.maxDesirTemp.val) && (data.minFinContrPress.val < data.maxFinContrPress.val)){
      return true;
    }
  return false;
}

//Render calculation results
let renderResults = (data, minOpen, maxOpen) => {
  return function (){
    let sensit = data.maxDesirTemp.val - data.minDesirTemp.val;
    document.getElementById('sensitivityVal').innerHTML = sensit;
    document.getElementById('proportionalBandVal').innerHTML = sensit/(data.maxTransmTemp.val - data.minTransmTemp.val);
    document.getElementById('transmitterPressVal').innerHTML = 3 + (12 * (data.temperature.val - data.minTransmTemp.val))/(data.maxTransmTemp.val - data.minTransmTemp.val);
    document.getElementById('finControlPressVal').innerHTML = data.finControlPress.val + (data.maxFinContrPress.val - data.minFinContrPress.val)*
      (data.temperature.val - data.minDesirTemp.val)/(data.maxDesirTemp.val - data.minDesirTemp.val);
    document.getElementById('openFinContrVal').innerHTML = minOpen + (data.temperature.val - data.minDesirTemp.val)*(maxOpen - minOpen)/
    (data.maxDesirTemp.val - data.maxDesirTemp.val);
  }
}

// Recalculates value on change
const recalculate = (data, normalBehaviour) => {
  let minOpen, maxOpen;
  if (dataCompletenessCheck(data) && dataValidityCheck(data)) {
    if (normalBehaviour === 'normalOpen') {
      minOpen = 100;
      maxOpen = 0;
    } else {
      minOpen = 0;
      maxOpen = 100;
    }
    debounce(renderResults(data, minOpen, maxOpen), 300);
  }
}

// Get the values of the input
exports.saveInputChange = (id, dat) => {
  return () => {
    let val = document.getElementById(id).value;
    if (!val){
      dat[id] = 0;
    } else {
      console.log(val);
      dat[id] = val;
      recalculate();
    }
  }
}





// export {data, recalculate};