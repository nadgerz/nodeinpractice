const fs = require('fs')
const http = require('http')
const data = fs.readFileSync('./output.dat')

http
  .createServer((req, res) => {
    res.end(data)
  })
  .listen(3000)
