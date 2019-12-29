const rabbitHub = require('rabbitmq-nodejs-client')
const subHub = rabbitHub.create({ task: 'sub', channel: 'myChannel' })
const pubHub = rabbitHub.create({ task: 'pub', channel: 'myChannel' })

subHub.on('connection', hub => {
  hub.on('message', msg => {
    //<co id="callout-events-alternatives-1-1" />
    console.log(msg)
  })
})
subHub.connect()

pubHub.on('connection', hub => {
  hub.send('Hello World!')
})
pubHub.connect()
