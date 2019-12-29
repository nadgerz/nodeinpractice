const express = require('express')
const app = express()
const nconf = require('nconf')
const routes = require('./routes')

nconf
  .argv() //<co id="callout-config-4-1" />
  .env()
  .file({ file: 'config.json' })

nconf.set('db', 'localhost/development') //<co id="callout-config-4-2" />
nconf.set('port', 3000)

app.get('/', routes.index)

app.listen(nconf.get('port'), () => {
  //<co id="callout-config-4-3" />
  console.log('Using database:', nconf.get('db'))
  console.log('Listening on port:', nconf.get('port'))
})
