const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello')
})

const songs = express.Router() //<co id="callout-web-express4-restful-1" />

songs.get('/', (req, res) => {
  //<co id="callout-web-express4-restful-2" />
  res.send('A list of songs')
})

songs.get('/:id', (req, res) => {
  res.send('A specific song')
})

app.use('/songs', songs) //<co id="callout-web-express4-restful-3" />

app.listen(3000)
