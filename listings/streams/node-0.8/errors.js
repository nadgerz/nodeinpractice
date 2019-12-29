const fs = require('fs')
const stream = fs.createReadStream('not-found') //<co id="callout-streams-errors-1" />

stream.on('error', err => {
  //<co id="callout-streams-errors-2" />
  console.trace()
  console.error('Stack:', err.stack)
  console.error('The error raised was:', err)
})
