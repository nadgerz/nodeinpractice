const util = require('util')
const events = require('events')

function MusicPlayer() {
  events.EventEmitter.call(this)
  this.on(MusicPlayer.events.play, this.play.bind(this))
}

const e = (MusicPlayer.events = {
  //<co id="callout-events-category-1" />
  play: 'play',
  pause: 'pause',
  stop: 'stop',
  ff: 'ff',
  rw: 'rw',
  addTrack: 'add-track',
})

util.inherits(MusicPlayer, events.EventEmitter)

MusicPlayer.prototype.play = function() {
  this.playing = true
}

const musicPlayer = new MusicPlayer()

musicPlayer.on(e.play, () => {
  //<co id="callout-events-category-2" />
  console.log('Now playing')
})

musicPlayer.emit(e.play)
