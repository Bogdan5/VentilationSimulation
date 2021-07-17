exports.moveSliderHandle = (idHandler, idDisplay, idSlider, orientation, rangeMovement) => {
  const handler = document.getElementById(idHandler);
  const display = document.getElementById(idDisplay);
  const slider = document.getElementById(idSlider);
  
  var active = false;

 

  var currentX;
  var currentY;
  var initialX;
  var initialY;
  if (orientation === 'horizontal'){
    currentY = slider.clientY;
    initialY = currentY;
  } else if (orientation === 'vertical'){
    currentX = slider.clientX;
    initialX = currentX;
  }
  var xOffset = 0;
  var yOffset = 0;

  handler.addEventListener("mousedown", dragStart, false);
  handler.addEventListener("mouseup", dragEnd, false);
  handler.addEventListener("mousemove", drag, false);

  let dragStart = (e) => {
    if (orientation === 'horizontal'){

    }
  }
}