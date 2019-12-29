const cp = require('child_process')

const child = cp.fork('./child', { silent: true })
child.send('monkeys')
child.on('message', message => {
  console.log('got message from child', message, typeof message)
})
child.stdout.pipe(process.stdout)

setTimeout(() => {
  child.disconnect()
}, 3000)
