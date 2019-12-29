const User = require('./user')
const alex = new User(1, { name: 'Alex' })

alex.save((err, reply) => {
  if (err) {
    console.error(err)
  }

  const savedUser = new User(1)
  savedUser.load((err, reply) => {
    if (err) {
      console.error(err)
    }

    console.log(savedUser.fields)
    alex.db.unref()
  })
})
