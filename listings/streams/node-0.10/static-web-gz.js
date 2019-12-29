const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http
  .createServer((req, res) => {
    res.writeHead(200, { 'content-encoding': 'gzip' }) //<co id="callout-streams-static-web-gz-1" />
    fs.createReadStream(__dirname + '/index.html')
      .pipe(zlib.createGzip()) //<co id="callout-streams-static-web-gz-2" />
      .pipe(res)
  })
  .listen(8000)
