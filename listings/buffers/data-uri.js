const fs = require('fs')
const zlib = require('zlib')

const base = fs.readFileSync('./monkey.png')
console.log('base', base.length)

const encoded = base.toString('base64')
console.log('pre', Buffer.byteLength(encoded))

zlib.deflate(encoded, (er, buf) => {
  console.log('zlib-post', buf.length)
})
zlib.gzip(encoded, (er, buf) => {
  console.log('gzip-post', buf.length)
})

console.log('data:image/png;base64,' + encoded)
fs.writeFileSync('./secondmonkey.png', Buffer(encoded, 'base64'))
