const express = require('express')
const app = express()
const Schema = require('validate')
const xml2json = require('xml2json')
const util = require('util')
const Page = new Schema()

Page.path('title')
  .type('string')
  .required() //<co id="web-middleware-5-1"/>

function ValidatorError(errors) {
  //<co id="web-middleware-5-2"/>
  this.statusCode = 400
  this.message = errors.join(', ')
}
util.inherits(ValidatorError, Error)

function xmlMiddleware(req, res, next) {
  //<co id="web-middleware-5-3"/>
  if (!req.is('xml')) {
    return next()
  }

  let body = ''
  req.on('data', str => {
    //<co id="web-middleware-5-4"/>
    body += str
  })

  req.on('end', () => {
    req.body = xml2json.toJson(body.toString(), {
      object: true,
      sanitize: false,
    })
    next()
  })
}

function checkValidXml(req, res, next) {
  //<co id="web-middleware-5-5"/>
  const page = Page.validate(req.body.page)
  if (page.errors.length) {
    next(new ValidatorError(page.errors)) //<co id="web-middleware-5-6"/>
  } else {
    next()
  }
}

function errorHandler(err, req, res, next) {
  //<co id="web-middleware-5-7"/>
  console.error('errorHandler', err)
  res.send(err.statusCode || 500, err.message)
}

app.use(xmlMiddleware) //<co id="web-middleware-5-8"/>

app.post('/pages', checkValidXml, (req, res) => {
  //<co id="web-middleware-5-9"/>
  console.log('Valid page:', req.body.page)
  res.send(req.body)
})

app.use(errorHandler) //<co id="web-middleware-5-10"/>

app.listen(3000)
