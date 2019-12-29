const cp = require('child_process')
const cpus = require('os').cpus().length

module.exports = function(workModule) {
  const awaiting = []
  const readyPool = []
  let poolSize = 0

  return function doWork(job, cb) {
    if (!readyPool.length && poolSize > cpus) {
      return awaiting.push([doWork, job, cb])
    } // no process available, rerun later

    const child = readyPool.length
      ? readyPool.shift()
      : (poolSize++, cp.fork(workModule))
    let cbTriggered = false

    child // this pattern always keeps one listener listening
      .removeAllListeners()
      .once('error', er => {
        if (!cbTriggered) {
          cb(er)
          cbTriggered = true
        }
        child.kill()
      })
      .once('exit', () => {
        if (!cbTriggered) {
          cb(new Error('Child exited with code: ' + code))
        }
        poolSize--
        const childIdx = readyPool.indexOf(child) // splice out child if it happened to be pushed back on the stack
        if (childIdx > -1) {
          readyPool.splice(childIdx, 1)
        }
      })
      .once('message', msg => {
        cb(null, msg)
        cbTriggered = true
        readyPool.push(child)
        if (awaiting.length) {
          setImmediate.apply(null, awaiting.shift())
        }
      })
      .send(job)
  }
}
