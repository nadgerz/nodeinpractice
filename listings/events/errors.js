const util = require('util')
const events = require('events')

function MusicPlayer() {
  events.EventEmitter.call(this)
}

util.inherits(MusicPlayer, events.EventEmitter)

const musicPlayer = new MusicPlayer()

musicPlayer.on('play', function(track) {
  this.emit('error', 'unable to play!')
})

musicPlayer.on('error', err => {
  //<co id="callout-events-errors-1-1" />
  console.error('Error:', err)
})

setTimeout(() => {
  musicPlayer.emit('play', 'Little Comets - Jennifer')
}, 1000)
