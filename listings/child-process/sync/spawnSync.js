const sp = require('child_process').spawnSync
const ps = sp('ps', ['aux'])
const grep = sp('grep', ['node'], {
  input: ps.stdout,
  encoding: 'utf8',
})
console.log(grep)
