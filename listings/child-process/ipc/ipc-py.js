const cp = require('child_process')

const child = cp.spawn('./ipc.py', [], { stdio: [0, 1, 2, 'ipc'] })
child.on('message', msg => {
  console.log('parent received:', msg)
})

child.send('parent monkeys')
child.send(true)
child.send(
  'larger than the characters you have in your 80 char buffer object, hope you survive',
)

setTimeout(() => {
  child.send(23)
  child.send({ an: 'object' })
}, 2000)
