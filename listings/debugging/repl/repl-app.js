const http = require('http')

const stats = { numReqs: 0 }

const server = (module.exports = http.createServer())
server.on('request', (req, res) => {
  stats.numReqs++
  res.end('Hello World')
})
server.listen(3000)
console.log('server listening on 3000')

const net = require('net')
const repl = require('repl')

net
  .createServer(socket => {
    const r = repl.start({
      input: socket,
      output: socket,
      terminal: true,
      useGlobal: true,
    })
    r.on('exit', () => {
      socket.end()
    })
    r.context.server = server
    r.context.stats = stats
  })
  .listen(1337)
console.log('repl listening on 1337')
