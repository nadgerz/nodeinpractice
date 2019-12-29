function tick() {
  console.log('tick:', Date.now())
}

function tock() {
  console.log('tock:', Date.now())
}

setInterval(tick, 1000)

setTimeout(() => {
  //<co id="callout-globals-setinterval" />
  setInterval(tock, 1000)
}, 500)
