const assert = require('assert')
const net = require('net')
let clients = 0
let expectedAssertions = 2

const server = net.createServer(client => {
  clients++
  const clientId = clients
  console.log('Client connected:', clientId)

  client.on('end', () => {
    console.log('Client disconnected:', clientId)
  })

  client.write('Welcome client: ' + clientId + '\r\n')
  client.pipe(client)
})

server.listen(8000, () => {
  console.log('Server started on port 8000')

  runTest(1, () => {
    //<co id="callout-network-client-1" />
    runTest(2, () => {
      console.log('Tests finished')
      assert.equal(0, expectedAssertions) //<co id="callout-network-client-2" />
      server.close() //<co id="callout-network-client-3" />
    })
  })
})

function runTest(expectedId, done) {
  //<co id="callout-network-client-4" />
  const client = net.connect(8000) //<co id="callout-network-client-5" />

  client.on('data', data => {
    //<co id="callout-network-client-6" />
    const expected = 'Welcome client: ' + expectedId + '\r\n'
    assert.equal(data.toString(), expected)
    expectedAssertions--
    client.end() //<co id="callout-network-client-7" />
  })

  client.on('end', done) //<co id="callout-network-client-8" />
}
