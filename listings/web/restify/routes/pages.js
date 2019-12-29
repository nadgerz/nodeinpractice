const db = require('./../db')

module.exports.index = function(req, res, next) {
  //<co id="callout-web-restify-2-1" />
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
    }
    res.send(page)
  })
}

module.exports.update = function(req, res, next) {
  const id = req.params.id //<co id="callout-web-restify-2-2" />
  const page = req.body.page
  db.pages.update(id, page, (err, page) => {
    if (err) {
      return next(err)
    }
    res.send(page)
  })
}

module.exports.show = function(req, res, next) {
  db.pages.find(req.params.id, (err, page) => {
    if (err) {
      return next(err)
    }
    res.send(page)
  })
}

module.exports.patch = function(req, res, next) {
  const id = req.params.id
  const page = req.body.page
  db.pages.patch(id, page, (err, page) => {
    if (err) {
      return next(err)
    }
    res.send(page)
  })
}

module.exports.remove = function(req, res, next) {
  const id = req.params.id
  db.pages.remove(id, err => {
    if (err) {
      return next(err)
    }
    res.send(200) //<co id="callout-web-restify-2-3" />
  })
}
