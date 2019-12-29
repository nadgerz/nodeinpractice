const zmq = require('zmq')
const push = zmq.socket('push')
const pull = zmq.socket('pull')

push.bindSync('tcp://127.0.0.1:3000')
pull.connect('tcp://127.0.0.1:3000')
console.log('Producer bound to port 3000')

setInterval(() => {
  console.log('sending work')
  push.send('some work')
}, 500)

pull.on('message', msg => {
  console.log('work: %s', msg.toString())
})
