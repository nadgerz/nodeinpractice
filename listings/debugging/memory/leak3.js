const heapdump = require('heapdump')
const string = '1 string to rule them all'

const leakyArr = []
let count = 2
setInterval(() => {
  leakyArr.push(string.replace(/1/g, count++))
}, 0)

setInterval(() => {
  if (heapdump.writeSnapshot()) {
    console.log('wrote snapshot')
  }
}, 20000)
