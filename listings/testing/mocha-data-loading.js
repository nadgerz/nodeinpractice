const assert = require('assert')
const crypto = require('crypto')

function User(fields) {
  //<co id="callout-testing-orm-loading-1" />
  this.fields = fields
}

User.prototype.save = function(cb) {
  process.nextTick(cb) //<co id="callout-testing-orm-loading-2" />
}

User.prototype.signIn = function(password) {
  const shasum = crypto.createHash('sha1')
  shasum.update(password)
  return shasum.digest('hex') === this.fields.hashed_password
}

describe('user model', () => {
  describe('sign in', () => {
    const user = new User({
      //<co id="callout-testing-orm-loading-3" />
      email: 'alex@example.com',
      hashed_password: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
    })

    before(done => {
      user.save(done) //<co id="callout-testing-orm-loading-4" />
    })

    it('should accept the correct password', () => {
      assert(user.signIn('test'))
    })

    it('should not accept the wrong password', () => {
      assert.equal(user.signIn('wrong'), false)
    })
  })
})
