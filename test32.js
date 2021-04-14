const cbor = require('cbor')
const qrcode = require('qrcode')
const base32 = require('base32')
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
  "s": "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJVadQssw5c",
  "k": "12345678"
}

let str = JSON.stringify(CONTENT)
console.log("Looking at JSON string: " + str)
console.log("  Length: " + str.length)



console.log ("\n\n\JSON String Encodings")

console.log("JSON String / L")
qrcode.toString(str, { errorCorrectionLevel: 'L' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(str, { errorCorrectionLevel: 'L' }))
qrcode.toFile('json_l.png', [ {data: str}], { errorCorrectionLevel: 'L' }, (err,out) => {})

console.log("JSON String / Q")
qrcode.toString(str, { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(str, { errorCorrectionLevel: 'Q' }))
qrcode.toFile('json_q.png', [ {data: str}], { errorCorrectionLevel: 'Q' }, (err,out) => {})


console.log ("\n\n\Condensend String Encodings")
let condStr = str.replace(/"/g,'').replace(/{/g,'').replace(/}/g,'')
console.log("Condensed string: " + condStr)
console.log("  Length: " + condStr.length)

console.log("Condensed String / L")
qrcode.toString(condStr, { errorCorrectionLevel: 'L' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(condStr, { errorCorrectionLevel: 'L' }))
qrcode.toFile('cond_l.png', [ {data: condStr}], { errorCorrectionLevel: 'L' }, (err,out) => {})

console.log("Condensed String / Q")
qrcode.toString(condStr, { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(condStr, { errorCorrectionLevel: 'Q' }))
qrcode.toFile('cond_q.png', [ {data: condStr}], { errorCorrectionLevel: 'Q' }, (err,out) => {})

console.log ("\n\n\nBase 32 Encodings")


let encoded = cbor.encode(CONTENT)

console.log("CBOR encodded string: " + encoded)
console.log("  Length: " + encoded.length)

let b32str = base32.encode(encoded).toUpperCase()

console.log("Based 32 Encoded of CBOR: " + b32str)
console.log("  Length: " + b32str.length)



console.log("b32 String / L")
qrcode.toString(b32str, { errorCorrectionLevel: 'L' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(b32str, { errorCorrectionLevel: 'L' }))
qrcode.toFile('test32_l.png', [ {data: b32str}], { errorCorrectionLevel: 'L' }, (err,out) => {})

console.log("b32 String / Q")
qrcode.toString(b32str, { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(b32str, { errorCorrectionLevel: 'Q' }))
qrcode.toFile('test32_q.png', [ {data: b32str}], { errorCorrectionLevel: 'Q' }, (err,out) => {})

let b32json = base32.encode(JSON.stringify(CONTENT)).toUpperCase()
console.log("Based 32 Encoded of JSON: " + b32json)
console.log("  Length: " + b32json.length)

console.log("b32 JSON / L")
qrcode.toString(b32json, { errorCorrectionLevel: 'L' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(b32json, { errorCorrectionLevel: 'L' }))
qrcode.toFile('test32j_l.png', [ {data: b32json}], { errorCorrectionLevel: 'L' }, (err,out) => {})

console.log("b32 JSON / Q")
qrcode.toString(b32json, { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(b32json, { errorCorrectionLevel: 'Q' }))
qrcode.toFile('test32j_q.png', [ {data: b32json}], { errorCorrectionLevel: 'Q' }, (err,out) => {})




//let decoded = cbor.decode(encoded)
//console.log(decoded)


