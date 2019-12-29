const fastfib = require('fastfib')
const http = require('http')

http
  .createServer((req, res) => {
    res.end('The result is ' + fastfib(40))
  })
  .listen(3000)

console.log('fastfibber running on port 3000')
