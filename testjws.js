const jws = require('jws')
const fs = require('fs')
const cbor = require('cbor')
const base32 = require('base32')
const base45 = require('base45')
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


const base64245 = (str) => {
  let parts = str.split('.')

  console.log(parts)
  let newparts = parts.map( part => {
    let buff = new Buffer(part, 'base64')
    let b45 = base45.encode(buff)
    return b45
  } )
  console.log(newparts)
  return newparts.join('.')
}

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

let privKey = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIM361ggcmEAJf6b7TxCW/Si5Nvr6ZDLrdpAfUvTRZSoloAoGCCqGSM49
AwEHoUQDQgAE8HOwR7KpuzBJn+H2Go2Qk9EmsK20+wzylQ64IKhrrszOrmIekG1v
IwT8wck/ahwIRdyWBEqCZ7gdy3Gg8MADTQ==
-----END EC PRIVATE KEY-----`

//let encoded = cbor.encode(DATA)
//let payload = encoded.toString('hex')
//let payload = { c: encoded }
let payload = DATA

console.log("JSON SIZE:",JSON.stringify(DATA).length)
//console.log("CBOR SIZE:",encoded.length)
console.log("PAYLOAD IS",payload.length)

let signature = jws.sign( {
  header: { alg: ALGO },
  payload: payload,
  privateKey: privKey
} )

console.log(signature.length,signature)
let sig45 = base64245(signature)
console.log(base64245(signature))

let pubKey = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8HOwR7KpuzBJn+H2Go2Qk9EmsK20
+wzylQ64IKhrrszOrmIekG1vIwT8wck/ahwIRdyWBEqCZ7gdy3Gg8MADTQ==
-----END PUBLIC KEY-----`
console.log( jws.verify( signature, ALGO, pubKey.toString() ) )

console.log("JWS L")
console.log(qrcode.create(signature, { errorCorrectionLevel: 'L' }))
console.log(qrcode.create(sig45, { errorCorrectionLevel: 'L' }))
console.log("JWS Q")
console.log(qrcode.create(signature, { errorCorrectionLevel: 'Q' }))
console.log(qrcode.create(sig45, { errorCorrectionLevel: 'Q' }))

let sig_32 = base32.encode(signature).toUpperCase()

console.log(sig_32.length,sig_32)
console.log("JWS 32 L")
console.log(qrcode.create(sig_32, { errorCorrectionLevel: 'L' }))
console.log("JWS 32 Q")
console.log(qrcode.create(sig_32, { errorCorrectionLevel: 'Q' }))


let decoded = jws.decode(signature)
console.log(decoded)
//console.log(cbor.decode(Buffer.from(decoded.payload,'hex')))

console.log(JSON.stringify(decoded).length)
let cbor_decoded = base32.encode(cbor.encode(decoded)).toUpperCase()
console.log(cbor_decoded.length, cbor_decoded)

console.log("JWS CBOR L")
console.log(qrcode.create(cbor_decoded, { errorCorrectionLevel: 'L' }))
console.log("JWS CBOR Q")
console.log(qrcode.create(cbor_decoded, { errorCorrectionLevel: 'Q' }))
