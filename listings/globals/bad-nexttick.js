const EventEmitter = require('events').EventEmitter

function complexOperations() {
  const events = new EventEmitter()

  events.emit('success')
  ;<co id="callout-globals-nexttick-1" />

  return events
}

complexOperations().on('success', () => {
  console.log('success!')
})
