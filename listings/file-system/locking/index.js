const locker = require('./locker')

locker.lock(err => {
  if (err) {
    throw err
  }
  console.log('locked')

  locker.unlock(() => {
    console.log('unlocked')
  })
})
