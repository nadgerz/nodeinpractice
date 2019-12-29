const app = require('./../../app')
const assert = require('assert')
const db = require('./../../db')
const request = require('supertest')

describe('notes', () => {
  before(done => {
    db.notes.seed(
      {
        1: {
          title: 'Nature documentaries',
          body: 'Life\nThe Planets',
        },

        2: {
          title: 'Literary journals',
          body: 'London Review of Books\nLiterary Review',
        },
      },
      done,
    )
  })

  describe('find', () => {
    it('should show notes', done => {
      request(app)
        .get('/notes/2')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.title, 'Literary journals')
          done()
        })
    })

    it('should return a 404 for IDs that do not exist', done => {
      request(app)
        .get('/notes/999')
        .expect(404, done)
    })

    it('should send JSON errors when requested', done => {
      request(app)
        .get('/notes/999')
        .set('Accept', 'application/json')
        .expect(404, (err, res) => {
          assert.equal(res.body.name, 'NotFound')
          done()
        })
    })
  })
})
