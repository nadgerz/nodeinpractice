const net = require('net')
const repl = require('repl')

net
  .createServer(socket => {
    const r = repl.start({
      input: socket,
      output: socket,
    })
    r.on('exit', () => {
      socket.end()
    })
  })
  .listen(1337)

console.log('node repl listening on 1337')
