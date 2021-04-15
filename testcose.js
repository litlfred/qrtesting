const cose = require('cose-js')
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

const headers = {
  p: {alg: 'ES256'},
  u: {kid: '11'}
}

const signer = {
  key: {
    'd': Buffer.from('6c1382765aec5358f117733d281c1c7bdc39884d04a45a1e6c67c858bc206c19', 'hex')
  }
}

const verifier = {
  key: {
    'x': Buffer.from('143329cce7868e416927599cf65a34f3ce2ffda55a7eca69ed8919a394d42f0f', 'hex'),
    'y': Buffer.from('60f7f1a780d8a783bfb7a2dd6b2796e8128dbbcef9d3d168db9529971a36e7b9', 'hex')
  }
}

cose.sign.create(headers, DATA, signer).then ( (buf) => {
  console.log(buf)
  console.log(buf.toString('hex'))
  let buf_32 = base32.encode(buf).toUpperCase()
  console.log(qrcode.create(buf_32, { errorCorrectionLevel: 'Q' }))

  cose.sign.verify( buf, verifier ).then( (ver) => {
    console.log("VERIFIED", ver.toString('utf8'))
  } )

} )


