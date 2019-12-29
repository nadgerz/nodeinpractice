const assert = require('assert')
const exec = require('child_process').exec
const path = require('path')
let ran = 0 //<co id="callout-testing-dump-1" />
const db = {
  config: {
    username: 'nodeinpractice',
    password: 'password',
  },
}

function loadFixture(sqlFile, cb) {
  //<co id="callout-testing-dump-2" />
  sqlFile = path.resolve(sqlFile)
  let command = 'mysql -u ' + db.config.username + ' '
  command += db.config.database + ' < ' + sqlFile //<co id="callout-testing-dump-3" />

  exec(command, (err, stdout, stderr) => {
    //<co id="callout-testing-dump-4" />
    if (err) {
      console.error(stderr)
      throw err
    } else {
      cb()
    }
  })
}

before(done => {
  //<co id="callout-testing-dump-5" />
  ran++
  assert.equal(1, ran) //<co id="callout-testing-dump-6" />
  assert.equal(process.env.NODE_ENV, 'test', 'NODE_ENV is not test') //<co id="callout-testing-dump-7" />
  loadFixture(__dirname + '/fixtures/file.sql', () => {
    //<co id="callout-testing-dump-8" />
    process.nextTick(done)
  })
})
