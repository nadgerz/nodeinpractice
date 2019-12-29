const EventEmitter = require('events').EventEmitter
const util = require('util')

function MessageBus(options) {
  EventEmitter.call(this, options)
}

util.inherits(MessageBus, EventEmitter)

module.exports = MessageBus
