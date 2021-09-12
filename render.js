const electron = require('electron');
const {ipcRenderer} = electron;

let {data} = require('./content/data.js');
let {recalculate, saveInputChange, debounce} = require('./content/calculation.js');
let {moveSliderHandle} = require('./content/sliders.js');

// Default values
let language = 'english';
let degreeUnit = 'F';
let normalBehaviour = "normalOpen";

// Set the language of the labels
const {languageLabels} = require('./content/languagesLabels.js');
ipcRenderer.on('languageChange', function (e, lang){
  if (lang !== language) {
    language = lang;
    renderLabels(language);
  }
});

//Render the normal behaviour button
let normalBehaviourButton = document.getElementById('normalBehaviourButton');
normalBehaviourButton.innerHTML = languageLabels[language][normalBehaviour];
normalBehaviourButton.addEventListener('click', () => {
  if (normalBehaviour === 'normalOpen') {
    normalBehaviour = 'normalClosed';
  } else if (normalBehaviour === 'normalClosed'){
    normalBehaviour = 'normalOpen';
  }
  normalBehaviourButton.innerHTML = languageLabels[language][normalBehaviour];
});

// Render the degrees button
let degreesButton = document.getElementById('degreesButton');
degreesButton.innerHTML = '&#176;&#160;' + degreeUnit;
degreesButton.addEventListener('click', ()=> {
  if (degreeUnit === 'C') {
    degreeUnit = 'F';
  } else if (degreeUnit === 'F') {
    degreeUnit = 'C';
  }
  degreesButton.innerHTML = '&#176;&#160;' + degreeUnit;
});

// Render one label
let renderOneLabel = (id, knownVal, lng) => {
  let elem = document.getElementById(id);
  // elem.innerHTML = 
};

// Render all labels
let renderLabels = (lng) => {
  document.getElementById('optionText').innerHTML = languageLabels[lng].changeOptions;
  normalBehaviourButton.innerHTML = languageLabels[language][normalBehaviour];
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
  document.getElementById('minTransmTempData').value = data.minTransmTemp.val;
  document.getElementById('maxTransmTempData').value = data.maxTransmTemp.val;
  document.getElementById('minDesirTempData').value = data.minDesirTemp.val;
  document.getElementById('maxDesirTempData').value = data.maxDesirTemp.val;
  document.getElementById('minFinContrPressData').value = data.minFinContrPress.val;
  document.getElementById('maxFinContrPressData').value = data.maxFinContrPress.val;
}

//Add event listenders for all inputs
let addEventListenerInput = (id) => {
  // document.getElementById(id).addEventListener('input', debounce(saveInputChange(id, data), 300));
}

//***************************************************************************************************
//*******************SLIDER**************************************************************************

//Render slider current temperature
let idHandler = document.getElementById('sliderButtonHandle');
let idDisplay = document.getElementById('sliderButtonDisplay');
let idSlider = document.getElementById('sliderBase');
moveSliderHandle(idHandler, idDisplay, idSlider, 'horizontal');

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


renderLabels(language);
renderInputs(data);
addEventListenerInput('minTransmTempData');
addEventListenerInput('maxTransmTempData');
addEventListenerInput('minDesirTempData');
addEventListenerInput('maxDesirTempData');
addEventListenerInput('setPointData');
// addEventListenerInput('sensitivityData');
addEventListenerInput('minFinContrPressData');
addEventListenerInput('maxFinContrPressData');
