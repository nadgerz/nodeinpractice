const assert = require('assert')
const sinon = require('sinon')
const db = sinon.mock(require('./../db')) //<co id="callout-testing-stubbing-database-1" />
const User = require('./../user')

describe('Users', () => {
  const fields = {
    name: 'Huxley',
    hashedPassword: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', //<co id="callout-testing-stubbing-database-2" />
  }
  let user

  before(() => {
    user = new User(1, fields)
    const stub = sinon
      .stub(user.db, 'hmget') //<co id="callout-testing-stubbing-database-3" />
      .callsArgWith(2, null, JSON.stringify(fields)) //<co id="callout-testing-stubbing-database-4" />
  })

  it('should allow users to sign in', done => {
    user.signIn('test', (err, signedIn) => {
      assert(signedIn)
      done(err)
    })
  })

  it('should require the correct password', done => {
    user.signIn('wrong', (err, signedIn) => {
      assert(!signedIn)
      done(err)
    })
  })
})
