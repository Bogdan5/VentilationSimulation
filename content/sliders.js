
exports.moveSliderHandle = (idHandler, idDisplay, idSlider, orientation) => {

  let rect = idSlider.getBoundingClientRect();
  console.log('orientation ', orientation);
  let limiter = 130;
  var active = false;
  var currentX;
  var currentY;
  var initialX;
  var initialY;
  if (orientation === 'horizontal'){
    currentY = rect.top;
    initialY = currentY;
    console.log('currentY', currentY);
  } else if (orientation === 'vertical'){
    currentX = rect.left;
    initialX = currentX;
  }
  var xOffset = 0;
  var yOffset = 0;

  let dragStart = (e) => {
    if (orientation === 'horizontal'){
      initialX = e.clientX - xOffset;
    } else if (orientation === 'vertical') {
      initialY = e.clientY - yOffset;
    }

    if (e.target === idHandler) {
      active = true;
    }
  }

  let drag = (e) => {
    if (active) {
      e.preventDefault();
      
      if (orientation === 'horizontal'){
        currentX = e.clientX - initialX;
        limiter = currentX;
      } else if (orientation === 'vertical') {
        currentY = e.clientY - initialY;
        limiter = currentY;
      }
      
      xOffset = currentX;
      yOffset = currentY;

      console.log('currentX ', currentX);

      // setTranslate(currentX, currentY, handler);
      if (limiter < 130 && limiter > -130){
        if (orientation === 'horizontal'){
          setTranslate(currentX, 0, idHandler);
        } else if (orientation === 'vertical') {
          setTranslate(0, currentY, idHandler);
        }
      }
    }
  }

  let dragEnd = (e) => {  
    if (orientation === 'horizontal'){
      initialX = currentX;
    } else if (orientation === 'vertical') {
      initialY = currentY;
    }
    active = false;
  }

  let setTranslate = (xPos, yPos, el) => {
    el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
    console.log('xPos', xPos);
  }

  // console.log('idHandler ', idHandler);
  idHandler.addEventListener("mousedown", dragStart, false);
  idHandler.addEventListener("mouseup", dragEnd, false);
  idHandler.addEventListener("mousemove", drag, false);
  idHandler.addEventListener("mouseout", dragEnd, false);
}