const User = require('./../models/user')

module.exports.create = function(req, res, next) {
  const user = new User(req.body)
  user.save(err => {
    if (err) {
      return next(err)
    }
    res.app.emit('user:created', user) //<co id="callout-events-structure-2-1" />
    res.send('User created')
  })
}
