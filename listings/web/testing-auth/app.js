const express = require('express')
const app = express()
const user = { username: 'admin', password: 'secret' }

app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.session({ secret: 'mottainai kara' }))

function requiresAccount(req, res, next) {
  if (req.session.signedIn) {
    next()
  } else {
    res.send(401)
  }
}

app.post('/session', (req, res) => {
  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    req.session.signedIn = true
    req.session.user = user
    res.send(200)
  } else {
    res.send(401)
  }
})

app.get('/admin', requiresAccount, (req, res) => {
  res.send('Administrators only area')
})

module.exports = app
