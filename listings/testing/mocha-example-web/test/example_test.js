const assert = require('assert')
const http = require('http')
const index = require('./../index')

function request(method, url, cb) {
  //<co id="callout-testing-mocha-web-1" />
  http
    .request(
      {
        hostname: 'localhost',
        port: 8000,
        path: url,
        method: method,
      },
      res => {
        res.body = ''
        res.on('data', chunk => {
          //<co id="callout-testing-mocha-web-2" />
          res.body += chunk
        })

        res.on('end', () => {
          cb(res) //<co id="callout-testing-mocha-web-3" />
        })
      },
    )
    .end()
}

describe('Example web app', () => {
  it('should square numbers', done => {
    request('GET', '/square/4', res => {
      assert.equal(res.statusCode, 200)
      assert.equal(res.body, '16') //<co id="callout-testing-mocha-web-4" />
      done()
    })
  })

  it('should return a 500 for invalid square requests', done => {
    request('GET', '/square', res => {
      assert.equal(res.statusCode, 500) //<co id="callout-testing-mocha-web-5" />
      done()
    })
  })
})
