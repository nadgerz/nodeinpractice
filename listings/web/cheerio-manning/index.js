const cheerio = require('cheerio')
const fs = require('fs')

fs.readFile('./index.html', 'utf8', (err, html) => {
  const $ = cheerio.load(html) //<co id="web-cheerio-manning-1" />
  const releases = $('.Releases a strong') //<co id="web-cheerio-manning-2" />

  releases.each(function(i) {
    console.log('New release:', this.text()) //<co id="web-cheerio-manning-3" />
  })
})
