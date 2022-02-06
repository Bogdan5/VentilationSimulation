let {setDecimal} = require('./utilities.js');

exports.renderVertSliderRange = (id, top, height, min, max, index) => {
  let nod = document.getElementById(id);

  //Positioning of the range
  nod.style.top = `${top}px`;
  //nod.style.height = `${height}px`;

  //Identifiers
  let topCell = document.getElementById('top' + index);
  let middleCell = document.getElementById('middle' + index);
  let middleCellColor = document.getElementById('middleColor' + index);
  let bottomCell = document.getElementById('bottom' + index);
  //Height
  middleCell.style.height = `${height}px`;
  middleCellColor.style.height = `${height}px`;
  //Values
  topCell.innerHTML = setDecimal(max);
  bottomCell.innerHTML = setDecimal(min);
}

//Calculate height of the values range for sliders
exports.getRangeHeight = (min1, max1, min2, max2) => (200*(max1 - min1)/(max2 - min2));

//Calculate top of the values range for sliders
exports.getRangeTop = (max1, min2, max2) => (200*((max2 - max1)/(max2 - min2))) + 22;


//***********************************VALUE DISPLAY ON BOTTOM SLIDERS*********************************************
//***************************************************************************************************************

exports.renderSliderValue = (id, top, value, index) => {
  let nod = document.getElementById(id);
  nod.style.top = `${top}px`;
  
  document.getElementById('slidingValueBottom' + index).innerHTML = value;
}
