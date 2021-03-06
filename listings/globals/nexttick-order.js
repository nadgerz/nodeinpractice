const EventEmitter = require('events').EventEmitter
const fs = require('fs')
let content

function readFileIfRequired(cb) {
  if (!content) {
    //<co id="callout-globals-nexttick-3-1" />
    fs.readFile(__filename, 'utf8', (err, data) => {
      content = data
      console.log('readFileIfRequired: readFile')
      cb(err, content)
    })
  } else {
    process.nextTick(() => {
      //<co id="callout-globals-nexttick-3-2" />
      console.log('readFileIfRequired: cached')
      cb(null, content)
    })
  }
}

readFileIfRequired((err, data) => {
  //<co id="callout-globals-nexttick-3-3" />
  console.log('1. Length:', data.length)

  readFileIfRequired((err, data2) => {
    console.log('2. Length:', data2.length)
  })

  console.log('Reading file again...')
})

console.log('Reading file...')
