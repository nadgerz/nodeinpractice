const bignum = require('bignum')
module.exports = bignum

function bigiter(n) {
  let current = bignum('0')
  let next = bignum('1')
  let swap
  for (let i = 0; i < n; i++) {
    ;(swap = current), (current = next)
    next = swap.add(next)
  }
  return current.toString()
}
