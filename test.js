const cbor = require('cbor')
const qrcode = require('qrcode')

const CONTENT = {
  "r": "svc-qr-uvci",
  "i": "example",
  "v": "RC-2-draft",
  "n": "Felix Cat",
  "b": "2005-10-04",
  "d": "h1dZ75FMdY9EQQjE64O4",
  "p": "bMlJkAt0V92RYhhG3fNt",
  "s": "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "k": "12345678a"
}

let str_content = JSON.stringify(CONTENT)
console.log(str_content.length)
let encoded = cbor.encode(CONTENT)

console.log(encoded.length)

qrcode.toString(str_content, { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )

qrcode.toFile( 'testout.png', [ { data: encoded } ], { errorCorrectionLevel: 'Q' }, (err,out) => {
  console.log("DONE WITH FILE")
})
qrcode.toFile( 'teststring.png', JSON.stringify(CONTENT), { errorCorrectionLevel: 'Q' }, (err,out) => {
  console.log("DONE WITH FILE STRING")
})

let decoded = cbor.decode(encoded)
console.log(decoded)


