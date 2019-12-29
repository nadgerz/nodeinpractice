const assert = require('assert')
const fs = require('fs')

function readConfigFile(cb) {
  //<co id="callout-testing-iferror-1" />
  fs.readFile('config.cfg', (err, data) => {
    if (err && err.code === 'ENOENT') {
      //<co id="callout-testing-iferror-2" />
      cb(null, { database: 'psql://localhost/test' })
    } else if (err) {
      cb(err) //<co id="callout-testing-iferror-3" />
    } else {
      // Do important configuration stuff
      cb(null, data)
    }
  })
}

// Test to make sure non-existent configuration
// files are handled correctly.
readConfigFile((err, data) => {
  assert.ifError(err) //<co id="callout-testing-iferror-4" />
})
