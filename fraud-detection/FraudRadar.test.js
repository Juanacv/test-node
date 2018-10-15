const FraudRadar = require('./FraudRadar')
const assert = require('assert')
const path = require('path')
//Parse a csv-style file to an array of arrays
const parser = require('./csv_to_array')

describe('Fraud Radar', function () {
  it('Should process the one line file', function () {
    let checkFraudObject = new FraudRadar(parser.parseCSV(path.join(__dirname, 'Files', 'OneLineFile.txt')))
    let result = checkFraudObject.checkFraud()
    assert.ok(result)
    assert.equal(result.length, 0)
  })

  it('Should process the two line file in which the second is fraudulent', function () {
    let checkFraudObject = new FraudRadar(parser.parseCSV(path.join(__dirname, 'Files', 'TwoLines_FraudulentSecond.txt')))
    let result = checkFraudObject.checkFraud()
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].isFraudulent, true)
    assert.equal(result[0].orderId, 2)
  })

  it('Should process the three line file in which the second is fraudulent', function () {
    let checkFraudObject = new FraudRadar(parser.parseCSV(path.join(__dirname, 'Files', 'ThreeLines_FraudulentSecond.txt')))
    let result = checkFraudObject.checkFraud()
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].isFraudulent, true)
    assert.equal(result[0].orderId, 2)
  })

  it('Should process the four line file in which more than one order is fraudulent', function () {
    let checkFraudObject = new FraudRadar(parser.parseCSV(path.join(__dirname, 'Files', 'FourLines_MoreThanOneFraudulent.txt')))
    let result = checkFraudObject.checkFraud()
    assert.ok(result)
    assert.equal(result.length, 2)
  })
})
