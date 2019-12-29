exports.merge = function(a, b) {
  if (a && b) {
    for (const key in b) {
      a[key] = b[key]
    }
  }
  return a
}
