const electron = require('electron');
const {ipcRenderer} = electron;

// Default values
let language = 'english';
let degreeUnit = 'C';
let normalBehaviour = "normalOpen";

// Set the language of the labels
const {languageLabels} = require('./content/languagesLabels.js');
ipcRenderer.on('languageChange', function (e, lang){
  if (lang !== language) {
    language = lang;
    renderLabels(language);
  }
  
  //Might need to re-render here
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

}



renderLabels(language);
