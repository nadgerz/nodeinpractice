const assert = require('assert')
const util = require('util')

assert.throws(
  () => {
    //<co id="callout-testing-throws-1" />
    loginAdmin('Alex')
  },
  PermissionError, //<co id="callout-testing-throws-2" />
  'A PermissionError was expected',
)

function PermissionError() {
  //<co id="callout-testing-throws-3" />
  Error.call(this, arguments)
}
util.inherits(PermissionError, Error)

function User(name) {
  this.name = name
  this.permissions = {
    admin: false,
  }
}

function loginAdmin(name) {
  const user = new User(name)
  if (!user.permissions.admin) {
    throw new PermissionError('You are not an administrator') //<co id="callout-testing-throws-4" />
  }
  return user
}
