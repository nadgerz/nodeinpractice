const assert = require('assert')

const recurse = require('../lib/recurse')
const tail = require('../lib/tail')
const iter = require('../lib/iter')
// var bigiter = require('../lib/bigiter')

const suite = new (require('benchmark').Suite)()

suite
  .add('recurse', () => {
    recurse(20)
  })
  .add('tail', () => {
    tail(20)
  })
  .add('iter', () => {
    iter(20)
  })
  // .add('bigiter', function () { bigiter(20) })
  .on('complete', function() {
    console.log('results:')

    this.forEach(result => {
      console.log(result.name, result.count, result.times.elapsed)
    })

    assert.equal(
      this.filter('fastest').pluck('name')[0],
      'iter',
      'expect iter to be the fastest',
    )
  })
  .run()
