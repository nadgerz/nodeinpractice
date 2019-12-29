const express = require('express')
const app = express()
const PayPal = require('./paypal')
const payPal = new PayPal({
  user: 'NIP',
  payPalUrl: 'http://localhost:3001/validate', //<co id="callout-web-test-paypal-1-1" />
  rootUrl: 'http://localhost:3000',
})

app.use(express.bodyParser())

app.post('/buy', (req, res, next) => {
  const url = payPal.generateUrl(req.body) //<co id="callout-web-test-paypal-1-2" />

  // Send the user to the PayPal payment page
  res.redirect(url)
})

app.post('/paypal/success', (req, res, next) => {
  payPal.verify(req.body, err => {
    //<co id="callout-web-test-paypal-1-3" />
    if (err) {
      next(err)
    }
    app.emit('purchase:accepted', req.body) //<co id="callout-web-test-paypal-1-4" />
    res.send(200)
  })
})

module.exports = app
