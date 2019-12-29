const assert = require('assert')
const sinon = require('sinon')
const User = require('./../user')

describe('Users (integration test)', () => {
  const fields = {
    name: 'Huxley',
    hashedPassword: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
  }
  let user
  const userId = 1

  before(done => {
    user = new User(userId, fields)
    user.save(done)
  })

  after(() => {
    // Tell Redis to close the connection when ready
    user.db.unref()
  })

  it('should load users', done => {
    const testUser = new User(userId)
    testUser.load(err => {
      assert.equal(testUser.fields.name, user.fields.name)
      done(err)
    })
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
