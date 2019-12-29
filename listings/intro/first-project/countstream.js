const Writable = require('stream').Writable
const util = require('util')

module.exports = CountStream

util.inherits(CountStream, Writable) //<co id="callout-intro-countstream-1" />

function CountStream(matchText, options) {
  Writable.call(this, options)
  this.count = 0
  this.matcher = new RegExp(matchText, 'ig') //<co id="callout-intro-countstream-2" />
}

CountStream.prototype._write = function(chunk, encoding, cb) {
  const matches = chunk.toString().match(this.matcher) //<co id="callout-intro-countstream-3" />
  if (matches) {
    this.count += matches.length
  }
  cb()
}

CountStream.prototype.end = function() {
  this.emit('total', this.count) //<co id="callout-intro-countstream-4" />
}
