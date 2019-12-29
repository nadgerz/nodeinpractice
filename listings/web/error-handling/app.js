const errors = require('./errors')
const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.bodyParser())

app.get('/notes/:id', routes.notes.show)

app.use((err, req, res, next) => {
  //<co id="callout-errors-3-1" />
  if (process.env.NODE_ENV !== 'test') {
    //<co id="callout-errors-3-2" />
    console.error(err.stack)
  }

  res.status(err.statusCode || 500)

  res.format({
    text: function() {
      res.send(err.message) //<co id="callout-errors-3-3" />
    },

    json: function() {
      res.send(err)
    },

    html: function() {
      res.render('errors', { err: err })
    },
  })
})

module.exports = app
