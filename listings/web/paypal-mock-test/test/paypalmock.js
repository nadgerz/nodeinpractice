const express = require('express')
const paypalApp = express()

paypalApp.returnInvalid = false //<co id="callout-web-test-paypal-2-1" />

paypalApp.post('/validate', (req, res) => {
  //<co id="callout-web-test-paypal-2-2" />
  if (paypalApp.returnInvalid) {
    res.send('INVALID')
  } else {
    res.send('VERIFIED')
  }
})

module.exports = paypalApp
