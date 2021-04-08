const cbor = require('cbor')
const qrcode = require('qrcode')
const base45 = require('base45')
const jws = require('jws')
const stringifyObject = require('stringify-object')

const CONTENT = {
  "r": "svc-qr-uvci",
  "i": "example",
  "v": "RC-2-draft",
  "n": "Felix Cat",
  "b": "2005-10-04",
  "d": "h1dZ75FMdY9EQQjE64O4",
  "p": "bMlJkAt0V92RYhhG3fNt",
  "s": "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "k": "12345678"
}

let str = JSON.stringify(CONTENT)
console.log("Looking at JSON string: " + str)
console.log("  Length: " + str.length)

let condStr = str.replaceAll('"','').replaceAll('{','').replaceAll('}','')
console.log("Condesnsed string: " + condStr)
console.log("  Length: " + condStr.length)

let encoded = cbor.encode(CONTENT)

console.log("CBOR encodded string: " + encoded)
console.log("  Length: " + encoded.length)

let b45str = base45.encode(encoded)

console.log("Based 45 Encoded of CBOR: " + b45str)
console.log("  Length: " + b45str.length)

qrcode.toString(str, { errorCorrectionLevel: 'L' }, (err,string) => {
  console.log(string)
} )

qrcode.toString(str, { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )


qrcode.toString(condStr, { errorCorrectionLevel: 'L' }, (err,string) => {
  console.log(string)
} )

qrcode.toString(condStr, { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )


let qr = qrcode.create(str, { errorCorrectionLevel: 'L' })
const qrpretty = stringifyObject(qr, { indent: '  ',  singleQuotes: false })
console.log( qr)


qrcode.toFile( 'test45.png', [ { data: b45str } ], { errorCorrectionLevel: "Q" }, (err,out) => {
  console.log("DONE WITH FILE")
})

//let decoded = cbor.decode(encoded)
//console.log(decoded)


