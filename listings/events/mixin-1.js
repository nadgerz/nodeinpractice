const EventEmitter = require('events').EventEmitter

function MusicPlayer(track) {
  this.track = track
  this.playing = false

  for (const methodName in EventEmitter.prototype) {
    //<co id="callout-events-mixin-1" />
    this[methodName] = EventEmitter.prototype[methodName]
  }
}

MusicPlayer.prototype = {
  toString: function() {
    if (this.playing) {
      return 'Now playing: ' + this.track
    }
    return 'Stopped'
  },
}

const musicPlayer = new MusicPlayer('Girl Talk - Still Here')

musicPlayer.on('play', function() {
  this.playing = true
  console.log(this.toString())
})

musicPlayer.emit('play')
