const db = require('./../db')

module.exports.index = function(req, res, next) {
  //<co id="web-express-routes-3-1" />
  db.notes.findAll((err, notes) => {
    if (err) {
      return next(err)
    }
    res.send(notes)
  })
}

module.exports.create = function(req, res, next) {
  db.notes.create(req.body.note, (err, note) => {
    if (err) {
      return next(err)
    }
    res.send(note)
  })
}

module.exports.update = function(req, res, next) {
  db.notes.update(req.param('id'), req.body.note, (err, note) => {
    if (err) {
      return next(err)
    }
    res.send(note)
  })
}

module.exports.show = function(req, res, next) {
  db.notes.find(req.param('id'), (err, note) => {
    if (err) {
      return next(err)
    }
    res.send(note)
  })
}
