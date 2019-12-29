const dgram = require('dgram')
const fs = require('fs')
const port = 41230
const defaultSize = 16

function Client(remoteIP) {
  const inStream = fs.createReadStream(__filename) //<co id="callout-network-udp-1" />
  const socket = dgram.createSocket('udp4') //<co id="callout-network-udp-2" />

  inStream.on('readable', () => {
    sendData() //<co id="callout-network-udp-3" />
  })

  function sendData() {
    const message = inStream.read(defaultSize) //<co id="callout-network-udp-4" />

    if (!message) {
      return socket.unref() //<co id="callout-network-udp-5" />
    }

    socket.send(message, 0, message.length, port, remoteIP, (err, bytes) => {
      //<co id="callout-network-udp-6" />
      sendData()
    })
  }
}

function Server() {
  const socket = dgram.createSocket('udp4') //<co id="callout-network-udp-7" />

  socket.on('message', (msg, rinfo) => {
    //<co id="callout-network-udp-8" />
    process.stdout.write(msg.toString())
  })

  socket.on('listening', () => {
    //<co id="callout-network-udp-9" />
    console.log('Server ready:', socket.address())
  })

  socket.bind(port)
}

if (process.argv[2] === 'client') {
  //<co id="callout-network-udp-10" />
  new Client(process.argv[3]) //<co id="callout-network-udp-11" />
} else {
  new Server()
}
