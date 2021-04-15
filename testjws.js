const jws = require('jws')
const fs = require('fs')
const cbor = require('cbor')
const base32 = require('base32')
const qrcode = require('qrcode')
/*
 * for ES256 create keys like this:
 * ssh-keygen -t ecdsa -b 256 -m PEM -f ./ecdsa256.pem
 * ssh-keygen -e -m PKCS8 -f ./ecdsa256.pem.pub > ecdsa256.pub
 *
 * for ES512 create keys like this:
 * ssh-keygen -t ecdsa -b 521 -m PEM -f ./ecdsa521.pem
 * ssh-keygen -e -m PKCS8 -f ./ecdsa521.pem.pub > ecdsa521.pub
 */
const ALGO = 'ES256'

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
  header: { alg: ALGO },
  payload: payload,
  privateKey: privKey
} )

let pubKey = fs.readFileSync( process.argv[3] )
console.log(signature.length,signature)

console.log( jws.verify( signature, ALGO, pubKey.toString() ) )
console.log(jws.decode(signature))

console.log(qrcode.create(signature, { errorCorrectionLevel: 'L' }))
console.log(qrcode.create(signature, { errorCorrectionLevel: 'Q' }))

let sig_32 = base32.encode(signature).toUpperCase()

console.log(sig_32.length,sig_32)
console.log(qrcode.create(sig_32, { errorCorrectionLevel: 'L' }))
console.log(qrcode.create(sig_32, { errorCorrectionLevel: 'Q' }))
