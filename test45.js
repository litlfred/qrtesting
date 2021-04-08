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
let condStr = str.replaceAll('"','').replaceAll('{','').replaceAll('}','')
console.log("Condesnsed string: " + condStr)
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

console.log ("\n\n\nBase 45 Encodings")


let encoded = cbor.encode(CONTENT)

console.log("CBOR encodded string: " + encoded)
console.log("  Length: " + encoded.length)

let b45str = base45.encode(encoded)

console.log("Based 45 Encoded of CBOR: " + b45str)
console.log("  Length: " + b45str.length)



console.log("b45 String / L")
qrcode.toString(b45str, { errorCorrectionLevel: 'L' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(b45str, { errorCorrectionLevel: 'L' }))
qrcode.toFile('test45_l.png', [ {data: b45str}], { errorCorrectionLevel: 'L' }, (err,out) => {})

console.log("b45 String / Q")
qrcode.toString(b45str, { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )
console.log(qrcode.create(b45str, { errorCorrectionLevel: 'Q' }))
qrcode.toFile('test45_q.png', [ {data: b45str}], { errorCorrectionLevel: 'Q' }, (err,out) => {})




//let decoded = cbor.decode(encoded)
//console.log(decoded)


