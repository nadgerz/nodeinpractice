const express = require('express')
const app = express()
const config = require('./config') //<co id="callout-config-3-1" />

app.listen(config.port, () => {
  console.log('Using database:', config.db)
  console.log('Listening on port:', config.port)
})
