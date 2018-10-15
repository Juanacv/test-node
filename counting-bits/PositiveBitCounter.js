function Count (input) {
  if (input < 0) {
    throw new RangeError('Input should be a positive integer')
  } else {
    let binaryArr = []
    //converting number  to binary
    while (input > 0) {
      let bit = input % 2
      binaryArr.push(bit)
      input = Math.floor(input / 2)
    }
    //counting number one bits and positions
    let numberOfOnes = 0
    let positions = []
    for (let i = 0; i < binaryArr.length; i++) {
      if (binaryArr[i] === 1) {
        numberOfOnes++
        positions.push(i)
      }
    }
    positions.unshift(numberOfOnes)
    return positions
  }
}

module.exports = { Count }
