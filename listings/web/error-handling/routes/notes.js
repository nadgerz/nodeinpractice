const db = require('./../db')
const errors = require('./../errors') //<co id="callout-errors-1-1" />

module.exports.show = function(req, res, next) {
  //<co id="callout-errors-1-2" />
  db.notes.find(req.param('id'), (err, note) => {
    if (err) {
      return next(err)
    } //<co id="callout-errors-1-3" />
    if (!note) {
      return next(new errors.NotFound('That note was not found.')) //<co id="callout-errors-1-4" />
    }
    res.send(note)
  })
}
