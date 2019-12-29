const assert = require('assert')
let exitCode = 0
const filenames = process.argv.slice(2)

it = function(name, test) {
  //<co id="callout-testing-runner-1"/>
  let err

  try {
    test() //<co id="callout-testing-runner-2"/>
  } catch (e) {
    err = e
  }

  console.log(' - it', name, err ? '[FAIL]' : '[OK]') //<co id="callout-testing-runner-3"/>

  if (err) {
    console.error(err)
    console.error(err.stack) //<co id="callout-testing-runner-4"/>
    exitCode = 1
  }
}

filenames.forEach(filename => {
  //<co id="callout-testing-runner-5"/>
  console.log(filename)
  require('./' + filename)
})

process.on('exit', () => {
  //<co id="callout-testing-runner-6"/>
  process.exit(exitCode)
})
