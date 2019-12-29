const stream = require('readable-stream')
const util = require('util')
const fs = require('fs')

function JSONLineReader(source) {
  stream.Readable.call(this) //<co id="callout-streams-json-line-1" />
  this._source = source
  this._foundLineEnd = false
  this._buffer = ''

  source.on('readable', () => {
    this.read(0) //<co id="callout-streams-json-line-2" />
  })
}

util.inherits(JSONLineReader, stream.Readable) //<co id="callout-streams-json-line-3" />

JSONLineReader.prototype._read = function(size) {
  //<co id="callout-streams-json-line-4" />
  let chunk
  let line
  let lineIndex
  let result

  if (this._buffer.length === 0) {
    //<co id="callout-streams-json-line-5" />
    chunk = this._source.read()
    this._buffer += chunk
  }

  lineIndex = this._buffer.indexOf('\n')
  if (lineIndex !== -1) {
    line = this._buffer.slice(0, lineIndex) //<co id="callout-streams-json-line-6" />
    if (line) {
      result = JSON.parse(line)
      this._buffer = this._buffer.slice(lineIndex + 1)
      this.emit('object', result) //<co id="callout-streams-json-line-7" />
      this.push(util.inspect(result)) //<co id="callout-streams-json-line-8" />
    } else {
      this._buffer = this._buffer.slice(1)
    }
  }
}

const input = fs.createReadStream(__dirname + '/json-lines.txt', {
  encoding: 'utf8',
}) //<co id="callout-streams-json-line-9" />
const jsonLineReader = new JSONLineReader(input)

jsonLineReader.on('object', obj => {
  console.log('pos:', obj.position, '- letter:', obj.letter)
})
