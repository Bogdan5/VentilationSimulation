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
  // console.log('condition', data.minDesirTemp.val, data.minDesirTemp.val < data.temperature.val);
  if (data.minTransmTemp.val < data.maxTransmTemp.val){
    // return true;
  } else {
    console.log('(data.minTransmTemp.val < data.maxTransmTemp.val)');
    return false;
  }
  if (data.minDesirTemp.val < data.maxDesirTemp.val){
    // return true;
  } else {
    console.log('(data.minDesirTemp.val < data.maxDesirTemp.val)');
    return false;
  }
  if (data.minFinContrPress.val < data.maxFinContrPress.val){
    // return true;
  } else {
    console.log('(data.minFinContrPress.val < data.maxFinContrPress.val)');
    return false;
  }
  if (data.minTransmTemp.val < data.minDesirTemp.val){
    // return true;
  } else {
    console.log('(data.minTransmTemp.val < data.minDesirTemp.val)');
    return false;
  }
  if (data.maxDesirTemp.val < data.maxTransmTemp.val){
    // return true;
  } else {
    console.log('(data.maxDesirTemp.val < data.maxTransmTemp.val)');
    return false;
  }
  if (data.minDesirTemp.val < data.temperature.val){
    return true;
  } else {
    console.log('(data.minDesirTemp.val < data.temperature.val)');
    // return false;
  }
  if (data.temperature.val < data.maxDesirTemp.val){
    // return true;    
  } else {
    console.log('(data.temperature.val < data.maxDesirTemp.val)');
  }
  if (data.minFinContrPress.val < data.maxFinContrPress.val){
    // return true;
  } else {
    console.log('(data.minFinContrPress.val < data.maxFinContrPress.val)');
  }
  return true;


  // if ((data.minTransmTemp.val < data.maxTransmTemp.val) && (data.minDesirTemp.val < data.maxDesirTemp.val) &&
  //   (data.minFinContrPress.val < data.maxFinContrPress.val) && (data.minTransmTemp.val < data.minDesirTemp.val) &&
  //   (data.maxDesirTemp.val < data.maxTransmTemp.val) && (data.minDesirTemp.val < data.temperature.val) &&
  //   (data.temperature.val < data.maxDesirTemp.val) && (data.minFinContrPress.val < data.maxFinContrPress.val) &&
  //   (data.minFinContrPress.val > 0) && (data.maxFinContrPress.val > 0))
  //   {
  //     return true;
  //   }
  // return false;
};

let setDecimal = (num) => Math.round((num + Number.EPSILON) * 10) / 10;


//Render calculation results
let renderResults = (data, minOpen, maxOpen) => {
  let sensit = data.maxDesirTemp.val - data.minDesirTemp.val;
  document.getElementById('sensitivityVal').innerHTML = setDecimal(sensit);
  document.getElementById('proportionalBandVal').innerHTML = setDecimal((sensit * 100)/(data.maxTransmTemp.val - data.minTransmTemp.val)) + "%";
  let tempSl = (data.temperature.val - data.minTransmTemp.val)/(data.maxTransmTemp.val - data.minTransmTemp.val);
  document.getElementById('transmitterPressVal').innerHTML = 3 + setDecimal(12 * tempSl);
  document.getElementById('transmPressSlider').value = tempSl * 100;
  document.getElementById('finContrPressVal').innerHTML = setDecimal(data.minFinContrPress.val + ((data.maxFinContrPress.val - data.minFinContrPress.val)*
    (data.temperature.val - data.minDesirTemp.val))/(data.maxDesirTemp.val - data.minDesirTemp.val));
  document.getElementById('openFinContrVal').innerHTML = setDecimal(minOpen + (data.temperature.val - data.minDesirTemp.val)*(maxOpen - minOpen)/
  (data.maxDesirTemp.val - data.minDesirTemp.val));
  document.getElementById('setPointVal').innerHTML = setDecimal((data.maxDesirTemp.val + data.minDesirTemp.val)/2);
}

// Recalculates value on change
exports.recalculate = (data, normalBehaviour) => {
  let minOpen, maxOpen;

  // if (dataCompletenessCheck(data) && dataValidityCheck(data)) {
    if (normalBehaviour === 'normalOpen') {
      minOpen = 100;
      maxOpen = 0;
    } else {
      minOpen = 0;
      maxOpen = 100;
    }
    renderResults(data, minOpen, maxOpen);
  // }
}

// Get the values of the input
exports.saveInputChange = (id) => {
  return () => {
    let x = data[id].val;
    let nod = document.getElementById(id);
    let val = nod.value;
    console.log('value:', val);
    if (val.length === 0){
      data[id].known = false;
      nod.value = '';
    } else {
      data[id].known = true;
      data[id].val = Number(val);
      //Input control
      // let test = /^-?\d+(.\d)?$/.test(val);
      // console.log('test is ', test);
      //Check if the data is complete and valid
      if (dataCompletenessCheck(data)){
        if (!dataValidityCheck(data)){

          data[id].val = x;
          nod.value = x;
          
          //maybe some comment of wrong input
        }
        recalculate(data, type.normalBehaviour);
      }
    }
  }
}

exports.sliderMove = (id) => {
  return () => {
    let nod = document.getElementById(id);
    let inp = document.getElementById(id.slice(7));
    let disp = document.getElementById('slider-val');
    let temp = (nod.value/100)*(data.maxDesirTemp.val - data.minDesirTemp.val) + data.minDesirTemp.val;
    console.log('slider moved');
    inp.value = temp;
    data[id.slice(7)].val = setDecimal(temp);
    disp.style.left = `${(temp * 2.5) + 19}px`;
    recalculate(data);
  }
}







// export {data, recalculate};