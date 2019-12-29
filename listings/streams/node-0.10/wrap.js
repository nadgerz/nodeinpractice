const stream = require('stream')
const Readable = stream.Readable
const util = require('util')

util.inherits(MemoryStream, stream)

function MemoryStream(interval) {
  this.readable = true //<co id="callout-streams-wrap-1" />

  setInterval(() => {
    const data = process.memoryUsage()
    data.date = new Date()
    this.emit('data', JSON.stringify(data) + '\n') //<co id="callout-streams-wrap-2" />
  }, interval)
}

const memoryStream = new MemoryStream(250)
const wrappedStream = new Readable().wrap(memoryStream) //<co id="callout-streams-wrap-3" />

wrappedStream.pipe(process.stdout) //<co id="callout-streams-wrap-4" />
