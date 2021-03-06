const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000) //<co id="callout-config-1-1" />

app.configure('development', () => {
  //<co id="callout-config-1-2" />
  app.set('db', 'localhost/development')
})

app.configure('production', () => {
  //<co id="callout-config-1-3" />
  app.set('db', 'db.example.com/production')
})

app.listen(app.get('port'), () => {
  //<co id="callout-config-1-4" />
  console.log('Using database:', app.get('db'))
  console.log('Listening on port:', app.get('port'))
})
