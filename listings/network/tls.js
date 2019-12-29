const fs = require('fs')
const tls = require('tls')

const options = {
  key: fs.readFileSync('server.pem'), //<co id="callout-network-tls-server-1" />
  cert: fs.readFileSync('server-cert.pem'), //<co id="callout-network-tls-server-2" />
  ca: [fs.readFileSync('client-cert.pem')], //<co id="callout-network-tls-server-3" />
  requestCert: true, //<co id="callout-network-tls-server-4" />
}

const server = tls.createServer(options, cleartextStream => {
  const authorized = cleartextStream.authorized ? 'authorized' : 'unauthorized' //<co id="callout-network-tls-server-5" />
  console.log('Connected:', authorized)
  cleartextStream.write('Welcome!\n')
  cleartextStream.setEncoding('utf8')
  cleartextStream.pipe(cleartextStream)
})

server.listen(8000, () => {
  console.log('Server listening')
})
