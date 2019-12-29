const express = require('express')
const WebSocketServer = require('ws').Server
const parseCookie = express.cookieParser('some secret') //<co id="callout-web-websockets-1-1" />
const MemoryStore = express.session.MemoryStore //<co id="callout-web-websockets-1-2" />
const store = new MemoryStore()

const app = express()
const server = app.listen(process.env.PORT || 3000)
let webSocketServer

app.use(parseCookie)
app.use(express.session({ store: store, secret: 'some secret' })) //<co id="callout-web-websockets-1-3" />
app.use(express.static(__dirname + '/public'))

app.get('/random', (req, res) => {
  //<co id="callout-web-websockets-1-4" />
  req.session.random = Math.random().toString()
  res.send(200)
})

webSocketServer = new WebSocketServer({ server: server }) //<co id="callout-web-websockets-1-5" />

webSocketServer.on('connection', ws => {
  //<co id="callout-web-websockets-1-6" />
  let session

  ws.on('message', (data, flags) => {
    const message = JSON.parse(data)

    if (message.type === 'getSession') {
      //<co id="callout-web-websockets-1-7" />
      parseCookie(ws.upgradeReq, null, err => {
        const sid = ws.upgradeReq.signedCookies['connect.sid'] //<co id="callout-web-websockets-1-8" />

        store.get(sid, (err, loadedSession) => {
          //<co id="callout-web-websockets-1-9" />
          if (err) {
            console.error(err)
          }
          session = loadedSession
          ws.send('session.random: ' + session.random, {
            mask: false,
          }) //<co id="callout-web-websockets-1-10" />
        })
      })
    } else {
      ws.send('Unknown command')
    }
  })
})
