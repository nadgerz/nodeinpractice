const assert = require('assert')
const http = require('http') //<co id="callout-network-http-1" />

const server = http.createServer((req, res) => {
  //<co id="callout-network-http-2" />
  res.writeHead(200, { 'Content-Type': 'text/plain' }) //<co id="callout-network-http-3" />
  res.write('Hello, world.\r\n') //<co id="callout-network-http-4" />
  res.end()
})

server.listen(8000, () => {
  //<co id="callout-network-http-5" />
  console.log('Listening on port 8000')
})

const req = http.request(
  {
    //<co id="callout-network-http-6" />
    port: 8000,
  },
  res => {
    console.log('HTTP headers:', res.headers)
    res.on('data', data => {
      console.log('Body:', data.toString())
      assert.equal('Hello, world.\r\n', data.toString()) //<co id="callout-network-http-7" />
      assert.equal(200, res.statusCode)
      server.unref()
    })
  },
)

req.end()
