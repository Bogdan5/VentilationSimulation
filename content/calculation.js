let debounce = (func, delay) => {
    let debouncing
    return function() {
      const context = this
      const args = arguments
      clearTimeout(debouncing)
      debouncing = setTimeout(() => func.apply(context, args), delay)
    }
  }

//Determines if enough data available for calculation
let dataCompletenessCheck = (data) => {
    if (!data.minTransmTemp.known || !data.maxTransmTemp.known || !minFinContrPress || !maxFinContrPress) {
        return false;
    }
    if ((data.minDesirTemp && data.maxDesirTemp) || (data.sensitivity && data.setPoint)) {
        return true;
    }
}

// Recalculates value on change
const recalculate = (data) => {
    if (dataCompletenessCheck(data)) {
        
    }
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





// export {data, recalculate};