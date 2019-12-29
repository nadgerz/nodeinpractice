function monitor() {
  console.log(process.memoryUsage())
}

const id = setInterval(monitor, 1000)
id.unref() //<co id="callout-globals-setinterval-unref" />

setTimeout(() => {
  console.log('Done!')
}, 5000)
