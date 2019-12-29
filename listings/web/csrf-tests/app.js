const express = require('express')
const app = express()
const middleware = require('./middleware')

app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.cookieSession({ secret: 'test' }))

app.post('/calendars', middleware.csrf(), (req, res) => {
  res.send(200)
})

module.exports = app
