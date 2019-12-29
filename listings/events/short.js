const util = require('util')
const events = require('events')

function MusicPlayer() {
  events.EventEmitter.call(this)
}

util.inherits(MusicPlayer, events.EventEmitter) //<co id="callout-events-short-1" />
