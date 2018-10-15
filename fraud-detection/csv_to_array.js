var fs = require('fs')
/*
This function converts a csv file into an array of arrays where every
array is a file from file
*/
function parseCSV (csvFilePath) {
  var result = []
  var fileContents = fs.readFileSync(csvFilePath)
  var lines = fileContents.toString().split('\n')

  for (var i = 0; i < lines.length; i++) {
    result.push(lines[i].toString().split(','))
  }

  return result
}

module.exports = {
  parseCSV
}
