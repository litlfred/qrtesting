const cbor = require('cbor')
const qrcode = require('qrcode')
const base45 = require('base45')
const zlib = require('zlib')

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

const ERROR_LEVEL = 'Q'

const saveFile = ( filename, content ) => {
  qrcode.toFile( filename, [ { data: content } ], { errorCorrectionLevel: ERROR_LEVEL }, (err,out) => {
    console.log(filename,"size",content.length)
  })
}

let str_cont = JSON.stringify(CONTENT)
// original string version
saveFile( 'qr_string.png', str_cont )
// original string version
let str_base45 = base45.encode(str_cont)
saveFile( 'qr_string_base45.png', str_base45 )
// brotli string
let str_brotli = zlib.brotliCompressSync(str_cont)
saveFile( 'qr_string_brotli.png', str_brotli )
// brotli base45 string
let str_brotli_base45 = base45.encode(str_brotli)
saveFile( 'qr_string_brotli_base45.png', str_brotli_base45 )
// deflate string
let str_deflate = zlib.deflateSync(str_cont)
saveFile( 'qr_string_deflate.png', str_deflate )
// gzip string
let str_gzip = zlib.gzipSync(str_cont)
saveFile( 'qr_string_gzip.png', str_gzip )
// cbor version
let cbor_cont = cbor.encode( str_cont )
saveFile( 'qr_cbor.png', cbor_cont )
// brotli cbor
let cbor_brotli = zlib.brotliCompressSync( cbor_cont )
saveFile( 'qr_cbor_brotli.png', cbor_brotli )
// deflate cbor
let cbor_deflate = zlib.deflateSync( cbor_cont )
saveFile( 'qr_cbor_deflate.png', cbor_deflate )
// gzip cbor
let cbor_gzip = zlib.gzipSync( cbor_cont )
saveFile( 'qr_cbor_gzip.png', cbor_gzip )
// cbor base45
let cbor_base45 = base45.encode( cbor_cont )
saveFile( 'qr_cbor_base45.png', cbor_base45 )
// brotli cbor base45
let cbor_brotli_base45 = base45.encode( cbor_brotli )
saveFile( 'qr_cbor_brotli_base45.png', cbor_brotli_base45 )
// deflate cbor base45
let cbor_deflate_base45 = base45.encode( cbor_deflate )
saveFile( 'qr_cbor_deflate_base45.png', cbor_deflate_base45 )
// gzip cbor base45
let cbor_gzip_base45 = base45.encode( cbor_gzip )
saveFile( 'qr_cbor_gzip_base45.png', cbor_gzip_base45 )

/*
console.log("ORIG",str_cont.length)
let cont_comp = zlib.brotliCompressSync(str_cont)
console.log("ORIG COMP",cont_comp.length)

let encoded = cbor.encode(CONTENT)

console.log("CBOR",encoded.length)
let str_comp = zlib.brotliCompressSync(encoded)
console.log("COMPRESSED CBOR",str_comp.length)

let b45str = base45.encode(encoded)
console.log("BASE45",b45str.length)

let b45_comp = zlib.brotliCompressSync(b45str)
console.log("B45 COMP",b45_comp.length)


qrcode.toString(JSON.stringify(CONTENT), { errorCorrectionLevel: 'Q' }, (err,string) => {
  console.log(string)
} )


qrcode.toFile( 'test45.png', [ { data: b45str } ], { errorCorrectionLevel: "Q" }, (err,out) => {
  console.log("DONE WITH FILE")
})
*/

//let decoded = cbor.decode(encoded)
//console.log(decoded)


