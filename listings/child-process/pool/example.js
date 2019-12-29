const http = require('http')
const makePool = require('./pooler')
const doJob = makePool('./worker')

http
  .createServer((req, res) => {
    doJob('send dummy job', (er, data) => {
      if (er) {
        return res.end('got an error:' + er.message)
      }
      res.end(data)
    })
  })
  .listen(3000)
