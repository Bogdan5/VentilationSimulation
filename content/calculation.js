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

//Check validity of individual input
let validityCheck = (id, inp) => {
  switch (id){
    case 'minTransmTemp':
      if (data.maxTransmTemp.known && (inp >= data.maxTransmTemp.val)){
        console.log('Error: Minimum transmitter temperature should be lower than maximum transmitter temperature');
         return false;
      }
      if (data.temperature.known && (inp >= data.temperature.val)){
        console.log('Error: Minimum transmitter temperature should be lower than the current temperature');
         return false;
      }
      if (data.minDesirTemp.known && (inp >= data.minDesirTemp.val)){
        console.log('Error: Minimum transmitter temperature should be lower than minimum desirable temperature');
         return false;
      }
      if (data.maxDesirTemp.known && (inp >= data.maxDesirTemp.val)){
        console.log('Error: Minimum transmitter temperature should be lower than maximum desirable temperature');
         return false;
      }
      return true;
    case 'maxTransmTemp':
      if (data.minTransmTemp.known && (inp <= data.minTransmTemp.val)){
        console.log('Error: Maximum transmitter temperature should be higher than the minimum transmitter temperature');
         return false;
      }
      if (data.temperature.known && (inp <= data.temperature.val)){
        console.log('Error: Maximum transmitter temperature should be higher than the current temperature');
         return false;
      }
      if (data.minDesirTemp.known && (inp <= data.minDesirTemp.val)){
        console.log('Error: Maximum transmitter temperature should be higher than minimum desirable temperature');
         return false;
      }
      if (data.maxDesirTemp.known && (inp <= data.maxDesirTemp.val)){
        console.log('Error: Maximum transmitter temperature should be higher than maximum desirable temperature');
         return false;
      }
      return true;
    case 'minDesirTemp':
      if (data.minTransmTemp.known && (inp <= data.minTransmTemp.val)){
        console.log('Error: Minimum desirable temperature should be higher than the minimum transmitter temperature');
         return false;
      }
      if (data.maxTransmTemp.known && (inp >= data.maxTransmTemp.val)){
        console.log('Error: Minimum desirable temperature should be lower than the maximum desirable temperature');
         return false;
      }
      if (data.temperature.known && (inp >= data.temperature.val)){
        console.log('Error: Minimum desirable temperature should be lower than the current temperature');
         return false;
      }
      if (data.maxDesirTemp.known && (inp >= data.maxDesirTemp.val)){
        console.log('Error: Minimum desirable temperature should be lower than maximum desirable temperature');
         return false;
      }
      return true;
    case 'maxDesirTemp':
      if (data.minTransmTemp.known && (inp <= data.minTransmTemp.val)){
        console.log('Error: Maximum desirable temperature should be higher than the minimum transmitter temperature');
         return false;
      }
      if (data.maxTransmTemp.known && (inp >= data.maxTransmTemp.val)){
        console.log('Error: Maximum desirable temperature should be lower than the maximum transmitter temperature');
         return false;
      }
      if (data.temperature.known && (inp <= data.temperature.val)){
        console.log('Error: Maximum desirable temperature should be higher than the current temperature');
         return false;
      }
      if (data.minDesirTemp.known && (inp <= data.minDesirTemp.val)){
        console.log('Error: Maximum desirable temperature should be higher than minimum desirable temperature');
         return false;
      }
      return true;
    case 'minFinContrPress':
      if (data.maxFinContrPress.known && (inp >= data.maxFinContrPress.val)){
        console.log('Error: Minimum final control pressure should be lower than the maximum final control pressure');
        return false;
      }
    case 'maxFinContrPress':
      if (data.minFinContrPress.known && (inp <= data.minFinContrPress.val)){
        console.log('Error: Maximum final control pressure should be lower than the minimum final control pressure');
        return false;
      }
      break;
    case 'temperature':
      if (data.minTransmTemp.known && (inp <= data.minTransmTemp.val)){
        console.log('Error: Current temperature should be higher than the minimum transmitter temperature');
         return false;
      }
      if (data.maxTransmTemp.known && (inp >= data.maxTransmTemp.val)){
        console.log('Error: Current temperature should be lower than the maximum transmitter temperature');
         return false;
      }
      if (data.minDesirTemp.known && (inp <= data.minDesirTemp.val)){
        console.log('Error: Current temperature should be higher than the minimum desirable temperature');
         return false;
      }
      if (data.maxDesirTemp.known && (inp >= data.maxDesirTemp.val)){
        console.log('Error: Current temperature should be lower than maximum desirable temperature');
         return false;
      }
    return true;
  }
}

let setDecimal = (num) => Math.round((num + Number.EPSILON) * 10) / 10;


//Render calculation results
let renderResults = (data, minOpen, maxOpen) => {
  let sensit = data.maxDesirTemp.val - data.minDesirTemp.val;
  document.getElementById('sensitivityVal').innerHTML = setDecimal(sensit);
  document.getElementById('proportionalBandVal').innerHTML = setDecimal((sensit * 100)/(data.maxTransmTemp.val - data.minTransmTemp.val)) + "%";
  let tempSl = (data.temperature.val - data.minTransmTemp.val)/(data.maxTransmTemp.val - data.minTransmTemp.val);
  let temp = 100 - 100*(data.temperature.val - data.minDesirTemp.val)/(data.maxDesirTemp.val - data.minDesirTemp.val);
  document.getElementById('transmitterPressVal').innerHTML = 3 + setDecimal(12 * tempSl);
  document.getElementById('finContrPressVal').innerHTML = setDecimal(data.minFinContrPress.val + ((data.maxFinContrPress.val - data.minFinContrPress.val)*
    (data.temperature.val - data.minDesirTemp.val))/(data.maxDesirTemp.val - data.minDesirTemp.val));
  document.getElementById('openFinContrVal').innerHTML = setDecimal(minOpen + (data.temperature.val - data.minDesirTemp.val)*(maxOpen - minOpen)/
  (data.maxDesirTemp.val - data.minDesirTemp.val));
  document.getElementById('setPointVal').innerHTML = setDecimal((data.maxDesirTemp.val + data.minDesirTemp.val)/2);
  //Moving the bottom sliders
  document.getElementById('transmTempSlider').value = 100 - tempSl * 100;
  document.getElementById('transmPressSlider').value = 100 - tempSl * 100;
  document.getElementById('finalControlPressSlider').value = temp;
  document.getElementById('finalControlOpenSlider').value = temp;
  //Change display aids for vertical sliders
  // document.getElementById()
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

//Remove excess decimals
let removeExcess = (str) => {
  if (str.indexOf('.') > 0){
    let start = str.indexOf('.');
    return str.slice(0, start + 2);
  }
  return str;
}

// Get the values of the input
exports.saveInputChange = (id) => {
  return () => {
    let nod = document.getElementById(id);
    let val = nod.value;
    if (val.length === 0){
      data[id].known = false;
      // nod.value = '';
    } else {
      let test = /^-?\d+(.\d+)?$/.test(val);
      if (test) {
        let trimmed = removeExcess(val);
        nod.value = trimmed;
        //Test validity of entry
        if (validityCheck(id, Number(trimmed))){
          data[id].known = true;
          data[id].val = Number(trimmed);
          if (dataCompletenessCheck(data)){
            recalculate(data);
          }
          return;
        }
      }
      data[id].known = false;
      nod.value = '';
    }
  }
}

exports.sliderMove = (id) => {
  return () => {
    let nod = document.getElementById(id);
    let inp = document.getElementById(id.slice(7));
    let disp = document.getElementById('slider-val');
    let val = Number(nod.value);
    let temp = (val/100)*(data.maxDesirTemp.val - data.minDesirTemp.val) + data.minDesirTemp.val;
    console.log('slider moved');
    inp.value = temp;
    data[id.slice(7)].val = setDecimal(temp);
    disp.innerHTML = Math.round(10*((val/100)*(data.maxDesirTemp.val - data.minDesirTemp.val) + data.minDesirTemp.val))/10;
    disp.style.left = `${val*2 + 20}px`;
    recalculate(data);
  }
}







// export {data, recalculate};