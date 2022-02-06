const electron = require('electron');
const {ipcRenderer} = electron;

let {data, type} = require('./content/data.js');
let {saveInputChange, renderResults, sliderMove, arrowButtonClick, transformAllTempsData} =
  require('./content/calculation.js');
const {languageLabels} = require('./content/languagesLabels.js');
let {renderVertSliderRange} = require('./content/sliders.js');
let {setDecimal, CtoF, FtoC, debounce, removeExcess} = require('./content/utilities.js');

//****************************************************EVENT LISTENERS****************************************
//********************************************************************************************************** */

// Event listener for language change in the menu
let languageChange = () => {
  ipcRenderer.on('languageChange', function (e, lang){
    if (lang !== type.language) {
      type.language = lang;
      renderLabels(type.language);
    }
  });
}

//Initial render of the buttons for degrees
let renderDegreesButtons = () => {
  document.getElementById('fButton').classList.add('clickedButton');
  document.getElementById('cButton').classList.add('unclickedButton');
}

//Initial render the buttons for normal behaviour
let renderNormalBehaviourButtons = () => {
  document.getElementById('ncButton').classList.add('clickedButton');
  document.getElementById('noButton').classList.add('unclickedButton');
}

//Event listener for the normal behaviour button
let normalBehaviourChange = () => {
  let noButton = document.getElementById('noButton');
  let ncButton = document.getElementById('ncButton');
  noButton.innerHTML = languageLabels[type.language].normalOpen;
  ncButton.innerHTML = languageLabels[type.language].normalClosed;
  noButton.addEventListener('click', () => {
    if (type.normalBehaviour === 'normalClosed') {
      type.normalBehaviour = 'normalOpen';
      noButton.classList.remove('unclickedButton');
      noButton.classList.add('clickedButton');
      ncButton.classList.add('unclickedButton');
      ncButton.classList.remove('clickedButton');
      renderResults(data);
    }
  });
  ncButton.addEventListener('click', () => {
    if (type.normalBehaviour === 'normalOpen') {
      type.normalBehaviour = 'normalClosed';
      ncButton.classList.remove('unclickedButton');
      ncButton.classList.add('clickedButton');
      noButton.classList.add('unclickedButton');
      noButton.classList.remove('clickedButton');
      renderResults(data);
    }
  });
}

//Render all temperature units in inputs and results
let renderTempUnits = (type) => {
  const tempUnits = document.querySelectorAll('.tempUnit');
  tempUnits.forEach((node) => {
    node.innerHTML = `&#176;&#160;${type.degreeUnit}`;
  })
}

// Event listener for the degrees button
let degreeChangeButtons = (type) => {

  //Change the display on the button
  let fButton = document.getElementById('fButton');
  let cButton = document.getElementById('cButton');
  fButton.addEventListener('click', ()=> {
    if (type.degreeUnit === 'C') {
      type.degreeUnit = 'F';
      fButton.classList.add('clickedButton');
      cButton.classList.add('unclickedButton');
      fButton.classList.remove('unclickedButton');
      cButton.classList.remove('clickedButton');
      transformAllTempsData(data);
      renderTempUnits(type);
      renderResults(data);
    }
  });
  cButton.addEventListener('click', ()=> {
    if (type.degreeUnit === 'F') {
      type.degreeUnit = 'C';
      fButton.classList.add('unclickedButton');
      cButton.classList.add('clickedButton');
      cButton.classList.remove('unclickedButton');
      fButton.classList.remove('clickedButton');
      transformAllTempsData(data);
      renderTempUnits(type);
      renderResults(data);
    }
  });
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

//Add event listener for left and right buttons by the temperature slider
document.getElementById('arrowLeft').addEventListener('click', arrowButtonClick('left'));
document.getElementById('arrowRight').addEventListener('click', arrowButtonClick('right'));


//************************************************RENDERING ELEMENTS*********************************** */
//***************************************************************************************************** */

// Render all labels
let renderLabels = (lng) => {
  document.getElementById('optionText').innerHTML = languageLabels[lng].changeOptions;
  document.getElementById('noButton').innerHTML = languageLabels[lng].normalOpen;
  document.getElementById('ncButton').innerHTML = languageLabels[lng].normalClosed;
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
  document.getElementById('transmTempRange').innerHTML = languageLabels[lng].transmTempRange;
  document.getElementById('transmPressRange').innerHTML = languageLabels[lng].transmPressRange;
  document.getElementById('finalControlPressRange').innerHTML = languageLabels[lng].finalControlPressRange;
  document.getElementById('finalControlOpenRange').innerHTML = languageLabels[lng].finalControlOpenRange;
  //document.getElementById('').innerHTML = languageLabels[lng].
};

//Render the values of inputs
let renderInputs = (data) => {
  for (i in data){
    document.getElementById(i).value = data[i].val;
  }
}



//Render all pressure units in inputs and results
let renderPressUnits = (type) => {
  const pressUnits = document.querySelectorAll('.pressUnit');
  pressUnits.forEach((node) => {
    node.innerHTML = `${type.pressUnit}`;
  })
}

//***********************************************************************************************************
//***************************EXECUTE FUNCTIONS***************************************************************

renderLabels(type.language);
renderDegreesButtons();
renderNormalBehaviourButtons();
renderInputs(data);
renderTempUnits(type);
renderPressUnits(type);
degreeChangeButtons(type);
languageChange();
normalBehaviourChange();

//Event listeners
addEventListenerInput('minTransmTemp');
addEventListenerInput('temperature');
addEventListenerInput('maxTransmTemp');
addEventListenerInput('minDesirTemp');
addEventListenerInput('maxDesirTemp');
addEventListenerInput('minFinContrPress');
addEventListenerInput('maxFinContrPress');

renderResults(data);