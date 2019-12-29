const assert = require('assert')
const fs = require('fs')
const CSVParser = require('./csvparser')

const parser = new CSVParser()
const actual = []

fs.createReadStream(__dirname + '/sample.csv').pipe(parser)

process.on('exit', () => {
  //<co id="callout-streams-testing-1" />
  actual.push(parser.read()) //<co id="callout-streams-testing-2" />
  actual.push(parser.read())
  actual.push(parser.read())

  const expected = [
    //<co id="callout-streams-testing-3" />
    { name: 'Alex', location: 'UK', role: 'admin' },
    { name: 'Sam', location: 'France', role: 'user' },
    { name: 'John', location: 'Canada', role: 'user' },
  ]

  assert.deepEqual(expected, actual) //<co id="callout-streams-testing-4" />
})
