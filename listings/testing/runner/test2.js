const assert = require('assert')

it('should run a test from another file', () => {
  assert('a' === 'a')
})

it('should run a test after the failed test', () => {
  assert(true)
})
