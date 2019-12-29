const express = require('express')
const app = express()
const db = require('./db')

app.use(express.bodyParser())

app.get('/notes', (req, res) => {
  db.notes.findAll((err, notes) => {
    if (err) {
      return next(err)
    }
    res.send(notes)
  })
})

app.post('/notes', (req, res, next) => {
  db.notes.create(req.body.note, (err, note) => {
    if (err) {
      return next(err)
    }
    res.send(note)
  })
})

app.patch('/notes/:id', (req, res, next) => {
  db.notes.update(req.param('id'), req.body.note, (err, note) => {
    if (err) {
      return next(err)
    }
    res.send(note)
  })
})

app.get('/notes/:id', (req, res, next) => {
  db.notes.find(req.param('id'), (err, note) => {
    if (err) {
      return next(err)
    }
    res.send(note)
  })
})

app.listen(3000)
