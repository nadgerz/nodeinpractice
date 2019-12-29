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

  describe('create', () => {
    it('should allow notes to be created with valid fields', done => {
      request(app)
        .post('/notes')
        .field('note[title]', 'Node in Practice')
        .field('note[body]', 'Testing web applications is fun!')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.title, 'Node in Practice')
          done()
        })
    })
  })

  describe('update', () => {
    it('should allow notes to be updated with valid fields', done => {
      request(app)
        .patch('/notes/1')
        .field('note[title]', 'Books I want to read')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.title, 'Books I want to read')
          done()
        })
    })
  })

  describe('find', () => {
    it('show notes', done => {
      request(app)
        .get('/notes/2')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.title, 'Literary journals')
          done()
        })
    })
  })
})
