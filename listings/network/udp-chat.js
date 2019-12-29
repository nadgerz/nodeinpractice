const assert = require('assert')
const dgram = require('dgram')
const fs = require('fs')
const defaultSize = 16
const port = 41234

function Client(remoteIP) {
  const socket = dgram.createSocket('udp4')
  const readline = require('readline') //<co id="callout-network-client-server-1" />
  const rl = readline.createInterface(process.stdin, process.stdout)

  socket.send(new Buffer('<JOIN>'), 0, 6, port, remoteIP) //<co id="callout-network-client-server-2" />

  rl.setPrompt('Message> ')
  rl.prompt()

  rl.on('line', line => {
    sendData(line) //<co id="callout-network-client-server-3" />
  }).on('close', () => {
    process.exit(0)
  })

  socket.on('message', (msg, rinfo) => {
    //<co id="callout-network-client-server-4" />
    console.log('\n<' + rinfo.address + '>', msg.toString())
    rl.prompt()
  })

  function sendData(message) {
    socket.send(
      new Buffer(message),
      0,
      message.length,
      port,
      remoteIP,
      (err, bytes) => {
        //<co id="callout-network-client-server-5" />
        console.log('Sent:', message)
        rl.prompt()
      },
    )
  }
}

function Server() {
  const clients = []
  const server = dgram.createSocket('udp4')

  server.on('message', (msg, rinfo) => {
    //<co id="callout-network-client-server-6" />
    const clientId = rinfo.address + ':' + rinfo.port //<co id="callout-network-client-server-7" />

    msg = msg.toString()

    if (!clients[clientId]) {
      //<co id="callout-network-client-server-8" />
      clients[clientId] = rinfo
    }

    if (msg.match(/^</)) {
      //<co id="callout-network-client-server-9" />
      console.log('Control message:', msg)
      return
    }

    for (let client in clients) {
      //<co id="callout-network-client-server-10" />
      if (client !== clientId) {
        client = clients[client]
        server.send(
          new Buffer(msg),
          0,
          msg.length,
          client.port,
          client.address,
          (err, bytes) => {
            if (err) {
              console.error(err)
            }
            console.log('Bytes sent:', bytes)
          },
        )
      }
    }
  })

  server.on('listening', () => {
    console.log('Server ready:', server.address())
  })

  server.bind(port)
}

module.exports = {
  Client: Client,
  Server: Server,
}

if (!module.parent) {
  switch (process.argv[2]) {
    case 'client':
      new Client(process.argv[3])
      break

    case 'server':
      new Server()
      break

    default:
      console.log('Unknown option')
  }
}
