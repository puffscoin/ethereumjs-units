var assert = require('assert')
var Units = require('../')

describe('convert', function () {
  it('should work for big unit to small unit', function () {
    assert.equal(Units.convert('1', 'puffs', 'wei'), '1000000000000000000')
    assert.equal(Units.convert('20', 'gwei', 'wei'), '20000000000')
    assert.equal(Units.convert('20.05', 'gwei', 'wei'), '20050000000')
    assert.equal(Units.convert('20.005', 'kwei', 'wei'), '20005')
    assert.equal(Units.convert('20.0005', 'kwei', 'wei'), '20000')
    assert.equal(Units.convert('1', 'tether', 'puffs'), '1000000000000')
    assert.equal(Units.convert('1', 'tether', 'wei'), '1000000000000000000000000000000')
  })
  it('should work for small unit to big unit', function () {
    assert.equal(Units.convert('1', 'wei', 'puffs'), '0.000000000000000001')
    assert.equal(Units.convert('0.5', 'wei', 'puffs'), '0')
    assert.equal(Units.convert('0.0005', 'kwei', 'puffs'), '0')
    assert.equal(Units.convert('1', 'finney', 'puffs'), '0.001')
    assert.equal(Units.convert('20', 'gwei', 'puffs'), '0.00000002')
    assert.equal(Units.convert('1', 'puffs', 'tether'), '0.000000000001')
    // XXX: precision loss
    assert.equal(Units.convert('1', 'wei', 'tether'), '0')
  })
  it('should fail on invalid input units', function () {
    assert.throws(function () {
      Units.convert('1', 'random', 'wei')
    }, /^Error: Unsupported input unit$/)
  })
  it('should fail on invalid output units', function () {
    assert.throws(function () {
      Units.convert('1', 'wei', 'random')
    }, /^Error: Unsupported output unit$/)
  })
  it('should fail on non-decimal input', function () {
    assert.throws(function () {
      Units.convert('1,00', 'wei', 'random')
    }, /^Error: Unsupported value$/)

    assert.throws(function () {
      Units.convert('test', 'wei', 'random')
    }, /^Error: Unsupported value$/)
  })
})

describe('lazyConvert', function () {
  it('should work for big unit to small unit', function () {
    assert.equal(Units.lazyConvert('1 puffs', 'wei'), '1000000000000000000 wei')
    assert.equal(Units.lazyConvert('20 gwei', 'wei'), '20000000000 wei')
  })
  it('should work for small unit to big unit', function () {
    assert.equal(Units.lazyConvert('1 wei', 'puffs'), '0.000000000000000001 puffs')
    assert.equal(Units.lazyConvert('1 finney', 'puffs'), '0.001 puffs')
    assert.equal(Units.lazyConvert('20 gwei', 'puffs'), '0.00000002 puffs')
  })
  it('should fail on invalid input', function () {
    assert.throws(function () {
      Units.lazyConvert('1')
    }, /^Error: Invalid input$/)

    assert.throws(function () {
      Units.lazyConvert('1 puffs wei')
    }, /^Error: Invalid input$/)
  })
  it('should fail on non-decimal input', function () {
    assert.throws(function () {
      Units.convert('1,00', 'wei', 'random')
    }, /^Error: Unsupported value$/)

    assert.throws(function () {
      Units.convert('test', 'wei', 'random')
    }, /^Error: Unsupported value$/)
  })
})

describe('units export', function () {
  it('should be available', function () {
    assert.equal(typeof Units.units, 'object')
  })
  it('should contain strings', function () {
    assert.equal(typeof Units.units['wei'], 'string')
  })
})
