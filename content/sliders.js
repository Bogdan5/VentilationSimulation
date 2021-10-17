exports.renderVertSliderRange = (id, data) => {
  let nod = document.getElementById(id);
  let top = (224*(data.minDesirTemp.val - data.minTransmTemp.val))/(data.maxTransmTemp.val - data.minTransmTemp.val);
  let height = (224*(data.maxDesirTemp.val - data.minDesirTemp.val))/(data.maxTransmTemp.val - data.minTransmTemp.val);
  // nod.style.top = `${top}px`;
  // nod.style.height = `${height}px`;
  if (height<48){
    if (top > 24){
      top -= 24;
    }
    height += 48;
  } else {
    
  }
}