const net = require('net')
const repl = require('repl')

net
  .createServer(socket => {
    const r = repl.start({
      input: socket,
      output: socket,
      terminal: true,
    })
    r.on('exit', () => {
      socket.end()
    })
    // r.context.socket = socket
  })
  .listen(1337)

console.log('node repl listening on 1337')
