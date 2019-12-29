const fs = require('fs')
const https = require('https')
const os = require('os')

const options = {
  key: fs.readFileSync('client.pem'), //<co id="callout-network-https-client-1" />
  cert: fs.readFileSync('client-cert.pem'), //<co id="callout-network-https-client-2" />
  ca: [fs.readFileSync('server-cert.pem')], //<co id="callout-network-https-client-3" />
  hostname: os.hostname(), //<co id="callout-network-https-client-4" />
  port: 8000,
  path: '/',
  method: 'GET',
}

const req = https.request(options, res => {
  //<co id="callout-network-https-client-5" />
  res.on('data', d => {
    process.stdout.write(d)
  })
})
req.end()

req.on('error', e => {
  console.error(e)
})
