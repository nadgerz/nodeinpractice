const fs = require('fs')
const http = require('http')

http
  .createServer((req, res) => {
    const data = fs.readFileSync('./output.dat')
    res.end(data)
  })
  .listen(3000)
