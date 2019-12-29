const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.logger())
app.set('env', process.env.NODE_ENV || 'development')
app.set('port', process.env.PORT || 3000)
app.set('views', './views')
app.set('view engine', 'jade')

app.use(app.router)
app.use(express.static('./public'))

app.get('/', routes.index)

module.exports = app
