const CountStream = require('./countstream') //<co id="callout-intro-countstream-index-1" />
const countStream = new CountStream('book') //<co id="callout-intro-countstream-index-2" />
const https = require('https')

https.get('https://www.manning.com', res => {
  //<co id="callout-intro-countstream-index-3" />
  res.pipe(countStream) //<co id="callout-intro-countstream-index-4" />
})

countStream.on('total', count => {
  console.log('Total matches:', count)
})
