const http = require('http')
const httpProxy = require('http-proxy')

const proxy = new httpProxy.createProxyServer({
  target: 'http://localhost:3000',
})

const wsProxy = new httpProxy.createProxyServer({
  //<co id="callout-production-http-proxy-ws-1" />
  target: 'http://localhost:3001',
})

const proxyServer = http.createServer((req, res) => {
  proxy.web(req, res)
})

proxyServer.on('upgrade', (req, socket, head) => {
  //<co id="callout-production-http-proxy-ws-2" />
  wsProxy.ws(req, socket, head)
})

proxyServer.listen(9000)
