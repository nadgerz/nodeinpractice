const util = require('util')
const events = require('events')

function Pulsar(speed, times) {
  events.EventEmitter.call(this)

  const self = this
  this.speed = speed
  this.times = times

  this.on('newListener', (eventName, listener) => {
    if (eventName === 'pulse') {
      self.start()
    }
  })
}

util.inherits(Pulsar, events.EventEmitter)

Pulsar.prototype.start = function() {
  const self = this
  var id = setInterval(() => {
    self.emit('pulse')
    self.times--
    if (self.times === 0) {
      clearInterval(id)
    }
  }, this.speed)
}

const pulsar = new Pulsar(500, 5)

pulsar.on('pulse', () => {
  //<co id="callout-events-reflection-2-1" />
  console.log('.')
})
