const util = require('util')
const events = require('events')

function MusicPlayer() {
  this.playing = false
  events.EventEmitter.call(this)
}

util.inherits(MusicPlayer, events.EventEmitter)

const musicPlayer = new MusicPlayer()

musicPlayer.on('play', function(track) {
  this.playing = true
})

musicPlayer.on('stop', function() {
  this.playing = false
})

musicPlayer.on('play', track => {
  //<co id="callout-events-inherit-2-1" />
  console.log('Track now playing:', track)
})

musicPlayer.emit('play', 'The Roots - The Fire')

setTimeout(() => {
  musicPlayer.emit('stop')
}, 1000)
