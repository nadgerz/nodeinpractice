const crypto = require('crypto')

function User(id, fields) {
  this.id = id
  this.fields = fields
  this.db = require('./db')
}

User.prototype = {
  hashPassword: function(text) {
    const shasum = crypto.createHash('sha1')
    shasum.update(text)
    return shasum.digest('hex')
  },

  save: function(cb) {
    this.db.hmset('user:' + this.id, 'fields', JSON.stringify(this.fields), cb)
  },

  load: function(cb) {
    this.db.hmget('user:' + this.id, 'fields', (err, fields) => {
      this.fields = JSON.parse(fields)
      cb(err, this)
    })
  },

  signIn: function(password, cb) {
    const hashedPassword = this.hashPassword(password)
    this.load(err => {
      if (err) {
        cb(err)
      } else {
        cb(null, this.fields.hashedPassword === hashedPassword)
      }
    })
  },
}

module.exports = User
