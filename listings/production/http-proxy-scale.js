const http = require('http')
const httpProxy = require('http-proxy')

const targets = [
  { target: 'http://localhost:3000' },
  { target: 'http://localhost:3001' },
  { target: 'http://localhost:3002' },
]

const proxies = targets.map((options, i) => {
  const proxy = new httpProxy.createProxyServer(options) //<co id="callout-production-http-proxy-scaling-1" />
  proxy.on('error', err => {
    console.error('Proxy error:', err)
    console.error('Server:', i)
  })
  return proxy
})

let i = 0
http
  .createServer((req, res) => {
    proxies[i].web(req, res)
    i = (i + 1) % proxies.length //<co id="callout-production-http-proxy-scaling-2" />
  })
  .listen(9000)
