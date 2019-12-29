const bodyParser = require('body-parser') //<co id="callout-web-express4-1" />
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const session = require('express-session')
const methodOverride = require('method-override')
const express = require('express')
const app = express()

app.use(cookieParser('secret')) //<co id="callout-web-express4-2" />
app.use(session({ secret: 'secret' }))
app.use(bodyParser())
app.use(methodOverride())
app.use(csurf())

app.get('/', (req, res) => {
  //<co id="callout-web-express4-3" />
  res.send('Hello')
})

app.listen(3000)
