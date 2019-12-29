const fs = require('fs')

fs.readFile('./world.dbf', (err, buf) => {
  const header = {}

  const date = new Date()
  date.setFullYear(1900 + buf[1])
  date.setMonth(buf[2])
  date.setDate(buf[3])
  header.lastUpdated = date.toString()

  header.totalRecords = buf.readUInt32LE(4)
  header.bytesInHeader = buf.readUInt16LE(8)
  header.bytesPerRecord = buf.readUInt16LE(10)

  const fields = []
  let fieldOffset = 32
  const fieldTerminator = 0x0d

  const FIELD_TYPES = {
    C: 'Character',
    N: 'Numeric',
  }

  while (buf[fieldOffset] != fieldTerminator) {
    const fieldBuf = buf.slice(fieldOffset, fieldOffset + 32)
    var field = {}
    field.name = fieldBuf.toString('ascii', 0, 11).replace(/\u0000/g, '')
    field.type = FIELD_TYPES[fieldBuf.toString('ascii', 11, 12)]
    field.length = fieldBuf[16]

    fields.push(field)
    fieldOffset += 32
  }

  const startingRecordOffset = header.bytesInHeader
  const records = []

  for (let i = 0; i < header.totalRecords; i++) {
    let recordOffset = startingRecordOffset + i * header.bytesPerRecord
    const record = {}

    record._isDel = buf.readUInt8(recordOffset) == 0x2a // asterisk indicates deleted record
    recordOffset++

    for (let j = 0; j < fields.length; j++) {
      field = fields[j]
      const Type = field.type === 'Numeric' ? Number : String
      record[field.name] = Type(
        buf.toString('utf8', recordOffset, recordOffset + field.length).trim(),
      )
      recordOffset += field.length
    }

    records.push(record)
  }

  console.log({ header: header, fields: fields, records: records })
})
