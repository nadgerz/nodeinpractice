const middleware = require('./../middleware')

middleware.csrf = function() {
  //<co id="callout-web-testing-seams-2-1" />
  return function(req, res, next) {
    req.session._csrf = '' //<co id="callout-web-testing-seams-2-2" />
    next()
  }
}

const app = require('./../app')
const request = require('supertest')

describe('calendar', () => {
  it('should allow us to turn off csrf', done => {
    request(app)
      .post('/calendars')
      .expect(200, done) //<co id="callout-web-testing-seams-2-3" />
  })
})
