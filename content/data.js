// Data
exports.data = {
  minTransmTempData: 0,
  maxTransmTempData: 0,
  minDesirTempData: 0,
  maxDesirTempData: 0,
  setPointData: 0,
  sensitivityData: 0,
  minFinContrPressData: 0,
  maxFinContrPressData: 0,
  temperature: 0
}

exports.knownValues = {
  minTransmTempData: true,
  maxTransmTempData: true,
  minDesirTempData: true,
  maxDesirTempData: true,
  setPointData: false,
  sensitivityData: false,
  minFinContrPressData: true,
  maxFinContrPressData: true,
  temperature: true
}


// Recalculates value on change
const recalculate = () => {

}

// Get the values of the input
exports.saveInputChange = (id, dat) => {
  return () => {
    let val = document.getElementById(id).value;
    if (!val){
      dat[id] = 0;
    } else {
      console.log(val);
      dat[id] = val;
      recalcutate();
    }
  }

}

//Debouncing
exports.debounce = (func, delay) => {
  let debouncing
  return function() {
    const context = this
    const args = arguments
    clearTimeout(debouncing)
    debouncing = setTimeout(() => func.apply(context, args), delay)
  }
}



// export {data, recalculate};