const db = require('./../db')

module.exports.index = function(req, res, next) {
  db.pages.findAll((err, pages) => {
    if (err) {
      return next(err)
    }
    res.send(pages)
  })
}

module.exports.create = function(req, res, next) {
  const page = req.body.page
  db.pages.create(page, (err, page) => {
    if (err) {
      return next(err)
    } //<co id="callout-web-rest-2-1" />
    res.send(page) //<co id="callout-web-rest-2-2" />
  })
}

module.exports.update = function(req, res, next) {
  const id = req.param('id')
  const page = req.body.page
  db.pages.update(id, page, (err, page) => {
    if (err) {
      return next(err)
    }
    res.send(page)
  })
}

module.exports.show = function(req, res, next) {
  db.pages.find(req.param('id'), (err, page) => {
    if (err) {
      return next(err)
    }
    res.send(page)
  })
}

module.exports.patch = function(req, res, next) {
  const id = req.param('id')
  const page = req.body.page
  db.pages.patch(id, page, (err, page) => {
    //<co id="callout-web-rest-2-3" />
    if (err) {
      return next(err)
    }
    res.send(page)
  })
}

module.exports.remove = function(req, res, next) {
  const id = req.param('id')
  db.pages.remove(id, err => {
    if (err) {
      return next(err)
    }
    res.send(200)
  })
}
