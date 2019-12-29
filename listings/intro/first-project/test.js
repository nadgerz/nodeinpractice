const assert = require('assert')
const CountStream = require('./countstream')
const countStream = new CountStream('example')
const fs = require('fs')
let passed = 0

countStream.on('total', count => {
  //<co id="callout-intro-countstream-test-1" />
  assert.equal(count, 1) //<co id="callout-intro-countstream-test-2" />
  passed++
})

fs.createReadStream(__filename).pipe(countStream) //<co id="callout-intro-countstream-test-3" />

process.on('exit', () => {
  //<co id="callout-intro-countstream-test-4" />
  console.log('Assertions passed:', passed)
})
