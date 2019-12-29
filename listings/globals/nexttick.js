const EventEmitter = require('events').EventEmitter

function complexOperations() {
  const events = new EventEmitter()

  process.nextTick(() => {
    ;<co id="callout-globals-nexttick-2" />
    events.emit('success')
  })

  return events
}

complexOperations().on('success', () => {
  console.log('success!')
})
