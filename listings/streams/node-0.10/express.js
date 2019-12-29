const stream = require('stream')
const util = require('util')
const express = require('express')
const app = express()

util.inherits(StatStream, stream.Readable) //<co id="callout-streams-express-1" />

function StatStream(limit) {
  stream.Readable.call(this)
  this.limit = limit
}

StatStream.prototype._read = function(size) {
  if (this.limit === 0) {
    // Done
    this.push()
  } else {
    this.push(util.inspect(process.memoryUsage())) //<co id="callout-streams-express-2" />
    this.push('\n')
    this.limit--
  }
}

app.get('/', (req, res) => {
  const statStream = new StatStream(10)
  statStream.pipe(res) //<co id="callout-streams-express-3" />
})

app.listen(3000)
