const net = require('net') //<co id="callout-network-server-1" />
let clients = 0 //<co id="callout-network-server-2" />

const server = net.createServer(client => {
  clients++ //<co id="callout-network-server-3" />
  const clientId = clients
  console.log('Client connected:', clientId)

  client.on('end', () => {
    //<co id="callout-network-server-4" />
    console.log('Client disconnected:', clientId)
  })

  client.write('Welcome client: ' + clientId + '\r\n') //<co id="callout-network-server-5" />
  client.pipe(client) //<co id="callout-network-server-6" />
})

server.listen(8000, () => {
  //<co id="callout-network-server-7" />
  console.log('Server started on port 8000')
})
