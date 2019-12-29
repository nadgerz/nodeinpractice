const domain = require('domain')
const http = require('http')

const d = domain.create()
d.on('error', () => {
  console.error(er)
  server.close()
  setTimeout(process.exit, 15000, 1)
})

d.run(() => {
  const server = http.createServer((req, res) => {
    response.end('data') // ReferenceError
  })
  server.listen(3000)
})
