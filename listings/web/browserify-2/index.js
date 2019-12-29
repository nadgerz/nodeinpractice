const MessageBus = require('./messagebus')
const messageBus = new MessageBus()
const $ = require('jquery')(window) //<co id="callout-browserify-2-1" />

messageBus.on('message', msg => {
  $('#messages').append('<p>' + msg + '</p>')
})

$(() => {
  //<co id="callout-browserify-2-2" />
  messageBus.emit('message', 'Hello from example 2')
})
