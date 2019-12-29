const fs = require('fs')
const zlib = require('zlib')

function benchStream(inSize, outSize) {
  const time = process.hrtime() //<co id="callout-streams-buffer-size-1" />
  let watermark = process.memoryUsage().rss
  const input = fs.createReadStream('/usr/share/dict/words', {
    bufferSize: inSize,
  })
  const gzip = zlib.createGzip({ chunkSize: outSize })
  const output = fs.createWriteStream('out.gz', {
    bufferSize: inSize,
  })

  const memoryCheck = setInterval(() => {
    //<co id="callout-streams-buffer-size-2" />
    const rss = process.memoryUsage().rss

    if (rss > watermark) {
      watermark = rss
    }
  }, 50)

  input.on('end', () => {
    //<co id="callout-streams-buffer-size-3" />
    const memoryEnd = process.memoryUsage()
    clearInterval(memoryCheck)

    const diff = process.hrtime(time)
    console.log(
      [
        inSize,
        outSize,
        (diff[0] * 1e9 + diff[1]) / 1000000,
        watermark / 1024,
      ].join(', '),
    ) //<co id="callout-streams-buffer-size-4" />
  })

  input.pipe(gzip).pipe(output) //<co id="callout-streams-buffer-size-5" />

  return input
}

console.log('file size, gzip size, ms, RSS')

let fileSize = 128
let zipSize = 5024

function run(times) {
  benchStream(fileSize, zipSize).on('end', () => {
    //<co id="callout-streams-buffer-size-6" />
    times--
    fileSize *= 2
    zipSize *= 2

    if (times > 0) {
      run(times) //<co id="callout-streams-buffer-size-7" />
    }
  })
}

run(10) //<co id="callout-streams-buffer-size-8" />
