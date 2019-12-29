const app = require('./../app')
const assert = require('assert')
const request = require('supertest')
const administrator = {
  //<co id="callout-web-testing-auth-1" />
  username: 'admin',
  password: 'secret',
}

describe('authentication', () => {
  let cookies

  before(done => {
    request(app)
      .post('/session')
      .field('username', administrator.username) //<co id="callout-web-testing-auth-2" />
      .field('password', administrator.password)
      .end((err, res) => {
        assert.equal(200, res.statusCode)
        cookies = res.headers['set-cookie'] //<co id="callout-web-testing-auth-3" />
        done()
      })
  })

  it('should allow admins to access the admin area', done => {
    request(app)
      .get('/admin') //<co id="callout-web-testing-auth-4" />
      .set('Cookie', cookies) //<co id="callout-web-testing-auth-5" />
      .expect(200, done)
  })
})
