const index = require('./../index')
const test = require('tap').test //<co id="callout-testing-tap-1" />

test("Alex's handy mathematics module", t => {
  //<co id="callout-testing-tap-2" />
  t.test('square', t => {
    t.equal(index.square(4), 16) //<co id="callout-testing-tap-3" />
    t.end() //<co id="callout-testing-tap-4" />
  })

  t.test('randomTimeout', t => {
    t.plan(1) //<co id="callout-testing-tap-5" />
    index.randomTimeout(() => {
      t.ok(true) //<co id="callout-testing-tap-6" />
    })
  })

  t.end()
})
