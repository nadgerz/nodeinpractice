const http = require('http')

const server = http.createServer((req, res) => {
  response.end('data') // ReferenceError
})
server.listen(3000)

process.on('uncaughtException', er => {
  console.error(er)
})
