const electron = require('electron');
const {ipcRenderer} = electron;

let {data, type} = require('./content/data.js');
let {saveInputChange, debounce, recalculate, sliderMove} = require('./content/calculation.js');
let {mouseMove} = require('./content/sliders.js');

// Default values
// let language = 'english';
let degreeUnit = 'F';
let normalBehaviour = "normalOpen";

// Set the language of the labels
const {languageLabels} = require('./content/languagesLabels.js');
ipcRenderer.on('languageChange', function (e, lang){
  if (lang !== type.language) {
    type.language = lang;
    renderLabels(type.language);
  }
});

//Render the normal behaviour button
let normalBehaviourButton = document.getElementById('normalBehaviourButton');
normalBehaviourButton.innerHTML = languageLabels[type.language][type.normalBehaviour];
normalBehaviourButton.addEventListener('click', () => {
  if (type.normalBehaviour === 'normalOpen') {
    type.normalBehaviour = 'normalClosed';
  } else if (type.normalBehaviour === 'normalClosed'){
    type.normalBehaviour = 'normalOpen';
  }
  normalBehaviourButton.innerHTML = languageLabels[type.language][type.normalBehaviour];
});

// Render the degrees button
let degreesButton = document.getElementById('degreesButton');
degreesButton.innerHTML = '&#176;&#160;' + type.degreeUnit;
degreesButton.addEventListener('click', ()=> {
  if (type.degreeUnit === 'C') {
    type.degreeUnit = 'F';
  } else if (type.degreeUnit === 'F') {
    type.degreeUnit = 'C';
  }
  degreesButton.innerHTML = '&#176;&#160;' + type.degreeUnit;
});

// Render one label
let renderOneLabel = (id, knownVal, lng) => {
  let elem = document.getElementById(id);
  // elem.innerHTML = 
};

// Render all labels
let renderLabels = (lng) => {
  document.getElementById('optionText').innerHTML = languageLabels[lng].changeOptions;
  normalBehaviourButton.innerHTML = languageLabels[type.language][type.normalBehaviour];
  document.getElementById('minTempTransmLabel').innerHTML = languageLabels[lng].transmMinTemp;
  document.getElementById('maxTempTransmLabel').innerHTML = languageLabels[lng].transmMaxTemp;
  document.getElementById('minTempDesirLabel').innerHTML = languageLabels[lng].minDesirTemp;
  document.getElementById('maxTempDesirLabel').innerHTML = languageLabels[lng].maxDesirTemp;
  document.getElementById('setPointLabel').innerHTML = languageLabels[lng].setPoint;
  document.getElementById('sensitivityLabel').innerHTML = languageLabels[lng].sensitivity;
  document.getElementById('minFinContPressLabel').innerHTML = languageLabels[lng].minFinContPress;
  document.getElementById('maxFinContPressLabel').innerHTML = languageLabels[lng].maxFinContPress;
  document.getElementById('currentTempLabel').innerHTML = languageLabels[lng].currTemp;
  document.getElementById('transmitterPressLabel').innerHTML = languageLabels[lng].transmPress;
  document.getElementById('proportionalBandLabel').innerHTML = languageLabels[lng].proportBand;
  document.getElementById('finContrPressLabel').innerHTML = languageLabels[lng].finContrPress;
  document.getElementById('openFinContrLabel').innerHTML = languageLabels[lng].openFinContr;
  //document.getElementById('').innerHTML = languageLabels[lng].
};

//Render the values of inputs
let renderInputs = (data) => {
  for (i in data){
    document.getElementById(i).value = data[i].val;
  }
  console.log(document.getElementById('minDesirTemp').value);
  // document.getElementById('minTransmTemp').value = data.minTransmTemp.val;
  // document.getElementById('maxTransmTemp').value = data.maxTransmTemp.val;
  // document.getElementById('minDesirTemp').value = data.minDesirTemp.val;
  // document.getElementById('maxDesirTemp').value = data.maxDesirTemp.val;
  // document.getElementById('minFinContrPress').value = data.minFinContrPress.val;
  // document.getElementById('maxFinContrPress').value = data.maxFinContrPress.val;
  // document.getElementById('temperature').value = data.temperature.val;
}

//Add event listenders for all inputs
let addEventListenerInput = (id) => {
  document.getElementById(id).addEventListener('input', debounce(saveInputChange(id), 1000));
}

//Add event listener to slider button
let addEventListenerButton = (id) => {
  document.getElementById(id).addEventListener('mousedown', mouseMove(id));
}


//Add event listener for the current temperature slider
document.getElementById('slider-temperature').addEventListener('input', sliderMove('slider-temperature'));

//***************************************************************************************************
//*******************SLIDER**************************************************************************

//Render slider current temperature
let idHandler = document.getElementById('sliderButtonHandle');
let idDisplay = document.getElementById('sliderButtonDisplay');
let idSlider = document.getElementById('sliderBase');
// moveSliderHandle(idHandler, idDisplay, idSlider, 'horizontal');

//Render the results
let renderResults = (resultObj) => {
  document.getElementById('transmitterPressVal').innerHTML = resultObj
  document.getElementById('sensitivityVal').innerHTML = resultObj
  document.getElementById('pressureBandVal').innerHTML = resultObj
  document.getElementById('finControlPressVal').innerHTML = resultObj
  document.getElementById('transmitterPressVal').innerHTML = resultObj
  //document.getElementById('transmitterPressVal').innerHTML = resultObj
  //document.getElementById('transmitterPressVal').innerHTML = resultObj
  //document.getElementById('transmitterPressVal').innerHTML = resultObj

}


renderLabels(type.language);
renderInputs(data);
addEventListenerInput('minTransmTemp');
addEventListenerInput('temperature');
addEventListenerInput('maxTransmTemp');
addEventListenerInput('minDesirTemp');
addEventListenerInput('maxDesirTemp');
// addEventListenerInput('setPointData');
// addEventListenerInput('sensitivityData');
addEventListenerInput('minFinContrPress');
addEventListenerInput('maxFinContrPress');
recalculate(data, type.normalBehaviour);

let sld = document.getElementById('slider-temperature');
let sldVal = document.getElementById('slider-val');
// sld.oninput = () => {
//   let val = Number(sld.value);
//   sldVal.innerHTML = (val/100)*(data.maxDesirTemp.val - data.minDesirTemp.val) + data.minDesirTemp.val;
//   sldVal.style.left = `${val*2 + 20}px`;
// }
