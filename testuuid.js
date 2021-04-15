const cbor = require('cbor')
const short = require('short-uuid')
const translator = short()
const base32 = require('base32')
const qrcode = require('qrcode')

const addids = (full, shorts, id) => {
  let newuuid = short.uuid()
  let shortid = translator.fromUUID( newuuid )
  full[id] = newuuid
  shorts[id] = shortid
}

let template = {
  "n": "Felix Cat",
  "b": "1980-01-01",
  "g": "male",
  "e": "2021-12-31",
  "l": "ER8732",
  "o": "2021-04-01",
  "s": "abc",
  "v": "abc",
}

let uuidjson = { ...template }
let uuidshort = { ...template }

addids( uuidjson, uuidshort, "d" ) // digitalid
addids( uuidjson, uuidshort, "p" ) // paperid
addids( uuidjson, uuidshort, "h" ) // PHA ID
addids( uuidjson, uuidshort, "c" ) // patientid

const output = ( json ) => {
  let str = JSON.stringify(json)
  let bin = cbor.encode(json)
  let str_32 = base32.encode(str).toUpperCase()
  let bin_32 = base32.encode(bin).toUpperCase()
  console.log(json)
  console.log(bin)
  console.log("STRING LENGTH: ", str.length)
  console.log("STRING 32 LENGTH: ", str_32.length)
  console.log("QR STRING 32 FOR L")
  console.log(qrcode.create(str_32, { errorCorrectionLevel: 'L' }))
  console.log("QR STRING 32 FOR Q")
  console.log(qrcode.create(str_32, { errorCorrectionLevel: 'Q' }))
  console.log("CBOR LENGTH: ", bin.length)
  console.log("CBOR 32 LENGTH: ", bin_32.length)
  console.log("QR CBOR 32 FOR L")
  console.log(qrcode.create(bin_32, { errorCorrectionLevel: 'L' }))
  console.log("QR CBOR 32 FOR Q")
  console.log(qrcode.create(bin_32, { errorCorrectionLevel: 'Q' }))

}

output( uuidjson )
output( uuidshort )
