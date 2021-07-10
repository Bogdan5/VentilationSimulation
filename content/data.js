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
exports.recalculate = () => {

}



// export {data, recalculate};