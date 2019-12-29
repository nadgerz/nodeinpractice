const Database = require('./database')
const client = new Database('./test.db')

client.on('load', () => {
  const foo = client.get('foo')

  client.set('bar', 'my sweet value', er => {
    if (er) {
      console.error(er)
    }
    console.log('write successful')
  })

  client.del('baz')
})
