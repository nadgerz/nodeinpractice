const fs = require('fs')
const join = require('path').join

exports.findSync = function(nameRe, startPath) {
  const results = []

  function finder(path) {
    const files = fs.readdirSync(path)

    for (let i = 0; i < files.length; i++) {
      const fpath = join(path, files[i])
      const stats = fs.statSync(fpath)

      if (stats.isDirectory()) {
        finder(fpath)
      }
      if (stats.isFile() && nameRe.test(files[i])) {
        results.push(fpath)
      }
    }
  }

  finder(startPath)
  return results
}

exports.find = function(nameRe, startPath, cb) {
  const results = []
  let asyncOps = 0

  function finder(path) {
    asyncOps++
    fs.readdir(path, (er, files) => {
      if (er) {
        return cb(er)
      }

      files.forEach(file => {
        const fpath = join(path, file)

        asyncOps++
        fs.stat(fpath, (er, stats) => {
          if (er) {
            return cb(er)
          }

          if (stats.isDirectory()) {
            finder(fpath)
          }
          if (stats.isFile() && nameRe.test(file)) {
            results.push(fpath)
          }

          asyncOps--
          if (asyncOps == 0) {
            cb(null, results)
          }
        })
      })

      asyncOps--
      if (asyncOps == 0) {
        cb(null, results)
      }
    })
  }

  finder(startPath)
}

console.log(exports.findSync(/file.*/, '.'))
exports.find(/file.*/, '.', console.log)
