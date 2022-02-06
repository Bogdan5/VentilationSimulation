let {data, type} = require('./data.js');
let {getRangeHeight, getRangeTop, renderVertSliderRange, renderSliderValue} = require('./sliders.js');
let {setDecimal, CtoF, FtoC, debounce, removeExcess} = require('./utilities.js');

//Determines if enough data available for calculation
let dataCompletenessCheck = (data) => {
    return data.minTransmTemp.known && data.maxTransmTemp.known && data.minFinContrPress.known &&
    data.maxFinContrPress.known && data.minDesirTemp.known && data.maxDesirTemp.known;};

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
      if (data.minTransmTemp.known && (inp < data.minTransmTemp.val)){
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
      if (data.maxTransmTemp.known && (inp > data.maxTransmTemp.val)){
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
      return true;
    case 'maxFinContrPress':
      if (data.minFinContrPress.known && (inp <= data.minFinContrPress.val)){
        console.log('Error: Maximum final control pressure should be lower than the minimum final control pressure');
        return false;
      }
      return true;
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
    default:
      return true;
  }
}


//Render calculation results
exports.renderResults = (data) => {
  let minOpen, maxOpen;
  let sensit = data.maxDesirTemp.val - data.minDesirTemp.val;
  let tempSl = (data.temperature.val - data.minTransmTemp.val)/(data.maxTransmTemp.val - data.minTransmTemp.val);
  let sensitivity = setDecimal(sensit);
  let propBand = setDecimal((sensit * 100)/(data.maxTransmTemp.val - data.minTransmTemp.val));
  let transmPress = 3 + setDecimal(12 * tempSl);
  let temp = 100 - 100*(data.temperature.val - data.minDesirTemp.val)/(data.maxDesirTemp.val - data.minDesirTemp.val);
  let contrPress = setDecimal(data.minFinContrPress.val + ((data.maxFinContrPress.val - data.minFinContrPress.val)*
  (data.temperature.val - data.minDesirTemp.val))/(data.maxDesirTemp.val - data.minDesirTemp.val));
  if (type.normalBehaviour === 'normalOpen'){
    minOpen = 100;
    maxOpen = 0;
  } else if (type.normalBehaviour === 'normalClosed'){
    minOpen = 0;
    maxOpen = 100;
  }
  let open = setDecimal(minOpen + (data.temperature.val - data.minDesirTemp.val)*(maxOpen - minOpen)/
  (data.maxDesirTemp.val - data.minDesirTemp.val));
  //Value of the temperature slider - initialization on startup
  document.getElementById('slider-val').innerHTML = setDecimal(data.temperature.val);
  //Results section
  document.getElementById('sensitivityVal').innerHTML = sensitivity;
  document.getElementById('proportionalBandVal').innerHTML = propBand;
  document.getElementById('transmitterPressVal').innerHTML = transmPress;
  document.getElementById('finContrPressVal').innerHTML = contrPress;
  document.getElementById('openFinContrVal').innerHTML = open;
  document.getElementById('setPointVal').innerHTML = setDecimal((data.maxDesirTemp.val + data.minDesirTemp.val)/2);
  //Moving the bottom sliders
  document.getElementById('transmTempSlider').value = 100 - tempSl * 100;
  document.getElementById('transmPressSlider').value = 100 - tempSl * 100;
  document.getElementById('finalControlPressSlider').value = temp;
  document.getElementById('finalControlOpenSlider').value = temp;
  //Display the range on the bottom sliders
  let top1 = getRangeTop(data.maxDesirTemp.val, data.minTransmTemp.val, data.maxTransmTemp.val);
  let height1 = getRangeHeight(data.minDesirTemp.val, data.maxDesirTemp.val, data.minTransmTemp.val, data.maxTransmTemp.val);
  renderVertSliderRange('sliderVertTransmTempRange', top1, height1, data.minDesirTemp.val, data.maxDesirTemp.val, 1);
  //Change display aids for vertical sliders
  renderSliderValue('sliderVertTransmTempVal', 200*(1 - tempSl) + 28, `${setDecimal(data.temperature.val)}&#176;&#160;${type.degreeUnit}`, 1);
  renderSliderValue('sliderVertTransmPressVal', 200*(1 - tempSl) + 28, `${3 + setDecimal(12 * tempSl)} ${type.pressUnit}`, 2);
  renderSliderValue('sliderVertControlPressVal', temp*2 + 28, `${setDecimal(contrPress)} ${type.pressUnit}`, 3);
  renderSliderValue('sliderVertOpenVal', temp*2 + 28, `${setDecimal(open)} %`, 4);
  //Show min and max for each slider
  document.getElementById('qmax1').innerHTML = `${setDecimal(data.minTransmTemp.val)}&#176;&#160;${type.degreeUnit}`;
  document.getElementById('qmin1').innerHTML = `${setDecimal(data.maxTransmTemp.val)}&#176;&#160;${type.degreeUnit}`;
  document.getElementById('qmax3').innerHTML = `${setDecimal(data.minFinContrPress.val)} ${type.pressUnit}`;
  document.getElementById('qmin3').innerHTML = `${setDecimal(data.maxFinContrPress.val)} ${type.pressUnit}`;
  document.getElementById('qmax4').innerHTML = (type.normalBehaviour === 'normalClosed'? '0 %':'100 %' ) ;
  document.getElementById('qmin4').innerHTML = (type.normalBehaviour === 'normalClosed'? '100 %':'0 %' ) ;
}

// Get the values of the input
exports.saveInputChange = (id) => {
  return () => {
    let nod = document.getElementById(id);
    let val = nod.value;
    if (val.length === 0){
      data[id].known = false;
    } else {
      let test = /^\-?\d+(.\d+)?$/.test(val);
      if (test) {
        let trimmed = removeExcess(val);
        console.log('node ', id, trimmed);
        nod.value = trimmed;
        //Test validity of entry
        //*****************************************************To redo*********************************** */
        if (validityCheck(id, Number(trimmed))){
          data[id].known = true;
          data[id].val = Number(trimmed);
          console.log('Entry is valid', id);
          if (dataCompletenessCheck(data)){
            console.log('data is complete');
            if (id === 'temperature'){
              let currTemp = removeExcess(document.getElementById('temperature').value);
              document.getElementById('slider-temperature').value = currTemp;
              let disp = document.getElementById('slider-val');
              disp.style.left = `${val*2 + 20}px`;
              disp.innerHTML = setDecimal(currTemp);
            }
            this.renderResults(data);
          }
          return;
        }
      }
      data[id].known = false;
      nod.value = '';
    }
  }
}

//Temperature change slider moved

let sliderMovedEffect = (val, temp) => {
  let disp = document.getElementById('slider-val');
  data.temperature.val = temp;
  disp.innerHTML = setDecimal(temp);
  disp.style.left = `${val*2 + 20}px`;
  renderResults(data);
}

exports.sliderMove = () => {
  return () => {
    let nod = document.getElementById('slider-temperature');
    let inp = document.getElementById('temperature');
    let val = setDecimal(Number(nod.value));
    let temp = (val/100)*(data.maxDesirTemp.val - data.minDesirTemp.val) + data.minDesirTemp.val;
    inp.value = temp;
    sliderMovedEffect(val, temp);
  }
}

//Move left and right arrows
exports.arrowButtonClick = (direction) => {
  return () => {let temp = data.temperature.val;
  if (direction === 'left'){
    temp = Math.round(10*temp - 1)/10;
  } else if (direction === 'right'){
    temp = Math.round(10*temp + 1)/10;
  }
  if (temp >= data.minDesirTemp.val && temp <= data.maxDesirTemp.val){
    let val = ((temp - data.minDesirTemp.val)/(data.maxDesirTemp.val - data.minDesirTemp.val))*100;
    sliderMovedEffect(val, temp);
    document.getElementById('slider-temperature').value = val;
    document.getElementById('temperature').value = temp;
  }}
}

//***********************************************TRANSFORMATIONS IN TEMPERATURE UNITS************************* */
//************************************************************************************************************ */

//Changes variables from C to F or vice versa and rerenders them
exports.transformAllTempsData = (data) => {
  //Change the data
  let list = ['minTransmTemp', 'maxTransmTemp', 'minDesirTemp', 'maxDesirTemp', 'temperature'];
  let datum, newDatum;
  list.forEach(i => {
    datum = data[i].val;
    if (type.degreeUnit === 'C') {
      newDatum = FtoC(datum);
    } else if (type.degreeUnit === 'F'){
      newDatum = CtoF(datum);
    }
    data[i].val = newDatum;
    document.getElementById(i).value = setDecimal(newDatum);
  });
}