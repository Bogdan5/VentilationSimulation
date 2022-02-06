// Data
exports.data = {
  minTransmTemp: {
    val: 40,
    known: true,
    elem: document.getElementById('minTransmTempData')
  },
  maxTransmTemp: {
    val: 240,
    known: true,
    elem: document.getElementById('maxTransmTempData')
  },
  minDesirTemp: {
    val: 70,
    known: true,
    elem: document.getElementById('minDesirTempData')
  },
  maxDesirTemp: {
    val: 80,
    known: true,
    elem: document.getElementById('maxDesirTempData')
  },
  minFinContrPress: {
    val: 3,
    known: true,
    elem: document.getElementById('minFinContrPressData')
  },
  maxFinContrPress: {
    val: 13,
    known: true,
    elem: document.getElementById('maxFinContrPressData')
  },
  temperature: {
    val: 75,
    known: true,
    elem: document.getElementById('temperature')
  }
};

exports.type = {
  normalBehaviour: 'normalClosed',
  language: 'english',
  degreeUnit: 'F',
  pressUnit: 'psi'
};

exports.positions = [, , , ];
