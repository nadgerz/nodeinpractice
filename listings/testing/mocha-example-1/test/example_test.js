const index = require('./../index')
const assert = require('assert')

describe('Amazing mathematical operations', () => {
  //<co id="callout-testing-mocha-1-1" />
  it('should square numbers', () => {
    assert.equal(index.square(4), 16)
  })

  it('should run a callback after a delay', done => {
    //<co id="callout-testing-mocha-1-2" />
    index.randomTimeout(() => {
      assert(true)
      done() //<co id="callout-testing-mocha-1-3" />
    })
  })
})
