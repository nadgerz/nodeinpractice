const express = require('express')
const app = express()

app.on('hello-alert', () => {
  console.warn('Warning!')
})

app.get('/', (req, res) => {
  res.app.emit('hello-alert') //<co id="callout-events-detect-1" />
  res.send('hello world')
})

app.listen(3000)
