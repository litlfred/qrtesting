const jws = require('jws')
const fs = require('fs')
const cbor = require('cbor')
const base32 = require('base32')
const qrcode = require('qrcode')

const DATA = { n: 'Felix Cat',
  b: '1980-01-01',
  g: 'male',
  e: '2021-12-31',
  l: 'ER8732',
  o: '2021-04-01',
  s: 'abc',
  v: 'abc',
  d: 'dPD2PfwzBQyphcjeUiAdRP',
  p: 'pc5AEPLL4qZd7uncdCa6jv',
  h: 'cvm6wAX7QCop8ueK7vkPYp',
  c: '4QEdn2XGffqcd3EzDgeCE1' }


console.log(process.argv[2])

let privKey = fs.readFileSync( process.argv[2] )

let payload = cbor.encode(DATA)

console.log("PAYLOAD IS",payload)

let signature = jws.sign( {
  header: { alg: 'HS256' },
  payload: payload,
  privateKey: privKey
} )

console.log(signature.length,signature)
console.log(qrcode.create(signature, { errorCorrectionLevel: 'L' }))
console.log(qrcode.create(signature, { errorCorrectionLevel: 'Q' }))

let sig_32 = base32.encode(signature).toUpperCase()

console.log(sig_32.length,sig_32)
console.log(qrcode.create(sig_32, { errorCorrectionLevel: 'L' }))
console.log(qrcode.create(sig_32, { errorCorrectionLevel: 'Q' }))
