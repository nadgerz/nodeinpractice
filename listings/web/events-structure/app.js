const express = require('express')
const app = express()
const emails = require('./emails')
const routes = require('./routes')

app.use(express.json())

app.post('/users', routes.users.create) //<co id="callout-events-structure-1-1" />

app.on('user:created', emails.welcome) //<co id="callout-events-structure-1-2" />

module.exports = app
