const cbor = require('cbor')
const qrcode = require('qrcode')
const base45 = require('base45')
const base32 = require('base32')
const jws = require('jws')
const stringifyObject = require('stringify-object')
const cose = require('cose-js')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const zlib = require('zlib')

const jws_base64_2_45 = (str) => {
  let parts = str.split('.')

  let newparts = parts.map( part => {
    let buff = new Buffer(part, 'base64')
    let b45 = base45.encode(buff)
    return b45
  } )
  return newparts.join('.')
}


let ec_lvls = ['L','Q']
let msgs = {
    "paper_svc_demo_pid" : {
	"r": "svc-qr-uvci",
	"i": "MdY9EQQ75F64O4jEh1dZ",
	"v": "RC-2-draft",
	"n": "Felix Cat",
	"b": "2005-10-04",
	"c": "h1dZ75FMdY9EQQjE64O4",
	"p": "bMlJkAt0V92RYhhG3fNt",
	"a": "EXA1234244"
    },
    "paper_svc_no_demo_pid" : {
	"r": "svc-qr-uvci",
	"i": "MdY9EQQ75F64O4jEh1dZ",
	"v": "RC-2-draft",
	"d": "h1dZ75FMdY9EQQjE64O4",
	"p": "bMlJkAt0V92RYhhG3fNt",
	"a": "EXA1234244"
    },
    "paper_svc_no_demo_no_pid" : {
	"r": "svc-qr-uvci",
	"i": "MdY9EQQ75F64O4jEh1dZ",
	"v": "RC-2-draft",
	"d": "h1dZ75FMdY9EQQjE64O4",
	"a": "EXA1234244"
    },
    "paper_svc_demo_no_pid" : {
	"r": "svc-qr-uvci",
	"i": "MdY9EQQ75F64O4jEh1dZ",
	"v": "RC-2-draft",
	"n": "Felix Cat",
	"b": "2005-10-04",
	"d": "h1dZ75FMdY9EQQjE64O4",
	"p": "bMlJkAt0V92RYhhG3fNt",
	"a": "EXA1234244"
    },

    "immunization_event_no_demo_pid" :  {
	"r": "svc-qr-uvcei",
	"e": "2006-10-04",
	"l": "AXK23RWERS",
	"o": "2021-05-22",
	"d": "h1dZ75FMdY9EQQjE64O4",
        "p": "bMlJkAt0V92RYhhG3fNt",
	"a": "EXA1234244",
	"v": "RA01.1",
	"s": "completed",
	"c": "MDRNA1",
	"v": "RC-2-draft",
    },
    
    "immunization_event_demo_pid" :  {
	"r": "svc-qr-uvcei",
	"e": "2006-10-04",
	"l": "AXK23RWERS",
	"n": "Felix Cat",
	"b": "2005-10-04",
	"o": "2021-05-22",
	"d": "h1dZ75FMdY9EQQjE64O4",
        "p": "bMlJkAt0V92RYhhG3fNt",
	"a": "EXA1234244",
	"v": "RA01.1",
	"s": "completed",
	"c": "MDRNA1",
	"v": "RC-2-draft",
    },
    "immunization_event_demo_no_pid" :  {
	"r": "svc-qr-uvcei",
	"e": "2006-10-04",
	"l": "AXK23RWERS",
	"n": "Felix Cat",
	"b": "2005-10-04",
	"o": "2021-05-22",
	"d": "h1dZ75FMdY9EQQjE64O4",
	"a": "EXA1234244",
	"v": "RA01.1",
	"s": "completed",
	"c": "MDRNA1",
	"v": "RC-2-draft",
    },
    "immunization_qr_event_demo_no_pid" :  {
	"item": [
            {
		"linkId": "r",
		"answer": [ { "valueString": "svc-qr-uvcei" } ]
            },
            { 
		"linkId": "e",
		"answer": [ { "valueDate": "2006-10-04" } ]
            },
            { 
		"linkId": "n",
		"answer": [ { "valueString": "Felix Cat" } ]
            },
            { 
		"linkId": "b",
		"answer": [ { "valueDate": "2005-10-04" } ]
            },
            { 
		"linkId": "o",
		"answer": [ { "valueDate": "2021-05-22" } ]
            },
            { 
		"linkId": "d",
		"answer": [ { "valueString": "h1dZ75FMdY9EQQjE64O4" } ]
            },
            { 
		"linkId": "a",
		"answer": [ { "valueString": "EXA1234244" } ]
            },
            { 
		"linkId": "v",
		"answer": [ { "valueString": "RA01.1" } ]
            },
            { 
		"linkId": "s",
		"answer": [ { "valueString": "completed" } ]
            },
            { 
		"linkId": "c",
		"answer": [ { "valueString": "MDRNA1" } ]
            },
            { 
		"linkId": "v",
		"answer": [ { "valueString": "RC-2-draft" } ]
            },
	]
    },
    "immunization_qr3_demo_pid" :  {
	"subject" : {
	    "resourceType" : "Patient",
	    "id" : "SHC-Patient-Example",
	    "name" : [
		{
		    "text" : "Felix Cat"
		}
	    ],
	    "birthDate" : "2000-01-02"
	},
	"item": [
            {
		"linkId": "r",
		"answer": [ { "valueString": "svc-qr-uvcei" } ]
            },
            { 
		"linkId": "e",
		"answer": [ { "valueDate": "2006-10-04" } ]
            },
            { 
		"linkId": "o",
		"answer": [ { "valueDate": "2021-05-22" } ]
            },
            { 
		"linkId": "d",
		"answer": [ { "valueString": "h1dZ75FMdY9EQQjE64O4" } ]
            },
            { 
		"linkId": "a",
		"answer": [ { "valueString": "EXA1234244" } ]
            },
            { 
		"linkId": "v",
		"answer": [ { "valueString": "RA01.1" } ]
            },
            { 
		"linkId": "s",
		"answer": [ { "valueString": "completed" } ]
            },
            { 
		"linkId": "c",
		"answer": [ { "valueString": "MDRNA1" } ]
            },
            { 
		"linkId": "v",
		"answer": [ { "valueString": "RC-2-draft" } ]
            },
	]
    },
    "immunization_qr3_demo_pid_full" :  {	
	"questionnaire" : "SVC-Questionnaire",
	"subject" : {
	    "resourceType" : "Patient",
	    "id" : "SHC-Patient-Example",
	    "name" : [
		{
		    "text" : "Felix Cat"
		}
	    ],
	    "birthDate" : "2000-01-02"
	},
	"item": [
	    {
		"linkId": "r",
		"answer": [ { "valueString": "svc-qr-uvcei" } ]
	    },
	    { 
		"linkId": "e",
		"answer": [ { "valueDate": "2006-10-04" } ]
	    },
	    { 
		"linkId": "o",
		"answer": [ { "valueDate": "2021-05-22" } ]
	    },
	    { 
		"linkId": "d",
		"answer": [ { "valueString": "h1dZ75FMdY9EQQjE64O4" } ]
	    },
	    { 
		"linkId": "a",
		"answer": [ { "valueString": "EXA1234244" } ]
	    },
	    { 
		"linkId": "v",
		"answer": [ { "valueString": "RA01.1" } ]
	    },
	    { 
		"linkId": "s",
		"answer": [ { "valueString": "completed" } ]
	    },
	    { 
		"linkId": "c",
		"answer": [ { "valueString": "MDRNA1" } ]
	    },
	    { 
		"linkId": "v",
		"answer": [ { "valueString": "RC-2-draft" } ]
	    },
	]
    },
    "immunization_qr3_demo_pid_full_condensed" :  {	
	"q" : "SVC-covid",
	"s" : {
	    "id" : "1234567890123456789",
	    "n" :  "Felix Cat Has A Name",
	    "bd" : "2000-01-02"
	},
	"item": [{
	    "r":		   "svc-qr-uvcei" ,
	    "e":		   "2006-10-04" ,
	    "o":		   "2021-05-22" ,
	    "d":		   "h1dZ75FMdY9EQQjE64O4" ,
	    "a":		   "EXA1234244" ,
	    "v":		   "RA01.1" ,
	    "s":		   "completed" ,
	    "c":		   "MDRNA1" ,
	}]
    },

    "immunization_qr3_demo_no_pid" :  {
	"subject" : {
	    "resourceType" : "Patient",
	    "name" : [
		{
		    "text" : "Felix Cat"
		}
	    ],
	    "birthDate" : "2000-01-02"
	},
	"item": [
	    {
		"linkId": "r",
		"answer": [ { "valueString": "svc-qr-uvcei" } ]
	    },
	    { 
		"linkId": "e",
		"answer": [ { "valueDate": "2006-10-04" } ]
	    },
	    { 
		"linkId": "o",
		"answer": [ { "valueDate": "2021-05-22" } ]
	    },
	    { 
		"linkId": "d",
		"answer": [ { "valueString": "h1dZ75FMdY9EQQjE64O4" } ]
	    },
	    { 
		"linkId": "a",
		"answer": [ { "valueString": "EXA1234244" } ]
	    },
	    { 
		"linkId": "v",
		"answer": [ { "valueString": "RA01.1" } ]
	    },
	    { 
		"linkId": "s",
		"answer": [ { "valueString": "completed" } ]
	    },
	    { 
		"linkId": "c",
		"answer": [ { "valueString": "MDRNA1" } ]
	    },
	    { 
		"linkId": "v",
		"answer": [ { "valueString": "RC-2-draft" } ]
	    },
	]
    },
    "dgc" : {
	"nam" : {
	    "_fn": "Cat",
	    "_gn": "Felix",
	},
	"dob" : "2005-10-04",
	"dsc" : "4R8cUFReUiDHA2eP",
	"v" : {
	    "tg": {
		"code": "840539006",
		"system": "2.16.840.1.113883.6.96"
	    },
	    "vp": {
		"code": "1119305005"
	    },
	    "mp": {
		"code": "EU/1/20/1507"
	    },
	    "ma": {
		"code": "ORG-100031184"
	    },
	    "dn": 1,
	    "sd": 2,
	    "dt": "2021-04-01",
	    "co": "US",
	    "is": "Dept of Health",
	    "ci": "mSG6Te8PoUaNRsUetCzt2u"
	}
    },
    "dgc_longer" : {
	"nam" : {
	    "fn": "????????????????????????",
	    "_fn": "Shi Jie Wei Ren Cai Shen Zong Tong",
	    "gn": "?????????????????????",
	    "_gn": "Huang Hong Cheng Tai Wan A Cheng"
	},
	"dob" : "2005-10-04",
	"dsc" : "4R8cUFReUiDHA2eP",
	"v" : {
	    "tg": {
		"code": "840539006",
		"system": "2.16.840.1.113883.6.96"
	    },
	    "vp": {
		"code": "1119305005"
	    },
	    "mp": {
		"code": "EU/1/20/1507"
	    },
	    "ma": {
		"code": "ORG-100031184"
	    },
	    "dn": 1,
	    "sd": 2,
	    "dt": "2021-04-01",
	    "co": "US",
	    "is": "Dept of Health",
	    "ci": "mSG6Te8PoUaNRsUetCzt2u"
	}
    }
}


/**********************************************************************
 *  No need to edit below                                             *
 *********************************************************************/

fs.truncate('output/stats.csv', 0,function() {})
fs.appendFile('output/stats.csv',"Message	Serialization	EC Level	Verion	Mod. Size	Length	Serialization\n",function() {})

Object.keys(msgs).forEach( async (msgname) => {
    let msg = msgs[msgname]
    let sig_msg = msg
    sig_msg['z'] = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJVadQssw5c"

    console.log("\n\n\n******   Message "  + msgname + "   *********\n\n\n")
    
    let str = JSON.stringify(sig_msg)

    let condStr = str.replace(/["{}]/g,'')
    console.log("Looking at Signed Condesnsed string: " + condStr)
    console.log("  Length: " + condStr.length)


    let jwtstr= jwt.sign(str, 'sooper_secret_key' , { algorithm:'HS256'})
    console.log("Looking at JWT: " + jwtstr)
    console.log("  Length: " + jwtstr.length)

    
    let cbrstr = cbor.encode(msg)
    console.log("CBOR encodded string: " + cbrstr)
    console.log("  Length: " + cbrstr.length)

    let b45str = base45.encode(cbrstr)
    console.log("Based 45 encoding of CBOR: " + b45str)
    console.log("  Length: " + b45str.length)

    let b32str = base32.encode(cbrstr).toUpperCase()
    console.log("Based 32 encoding of CBOR: " + b32str)
    console.log("  Length: " + b32str.length)

    let jwsstr = jws.sign( { 
      header: { alg: 'ES256' },
      payload: msg,
      privateKey: `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIM361ggcmEAJf6b7TxCW/Si5Nvr6ZDLrdpAfUvTRZSoloAoGCCqGSM49
AwEHoUQDQgAE8HOwR7KpuzBJn+H2Go2Qk9EmsK20+wzylQ64IKhrrszOrmIekG1v
IwT8wck/ahwIRdyWBEqCZ7gdy3Gg8MADTQ==
-----END EC PRIVATE KEY-----`
    } )
    let jwsd = zlib.deflateSync(jwsstr)
    let jwsd45 = base45.encode(jwsd)
    let jws45 = jws_base64_2_45(jwsstr)
    let jws45d = zlib.deflateSync(jws45)
    let jws45d45 = base45.encode(jws45d)

    let jwscborstr = jws.sign( { 
      header: { alg: 'ES256' },
      payload: cbor.encode(msg),
      privateKey: `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIM361ggcmEAJf6b7TxCW/Si5Nvr6ZDLrdpAfUvTRZSoloAoGCCqGSM49
AwEHoUQDQgAE8HOwR7KpuzBJn+H2Go2Qk9EmsK20+wzylQ64IKhrrszOrmIekG1v
IwT8wck/ahwIRdyWBEqCZ7gdy3Gg8MADTQ==
-----END EC PRIVATE KEY-----`
    } )
    let jwscbord = zlib.deflateSync(jwscborstr)
    let jwscbord45 = base45.encode(jwscbord)

    let jwscbor45 = jws_base64_2_45(jwscborstr)
    let jwscbor45d = zlib.deflateSync(jwscbor45)
    let jwscbor45d45 = base45.encode(jwscbor45d)



      /* makes invalid JWS due to payload and haven't found a way to retrieve from the payload yet
    let jwscbr = jws.sign( { 
      header: { alg: 'ES256' },
      payload: cbrstr,
      privateKey: `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIM361ggcmEAJf6b7TxCW/Si5Nvr6ZDLrdpAfUvTRZSoloAoGCCqGSM49
AwEHoUQDQgAE8HOwR7KpuzBJn+H2Go2Qk9EmsK20+wzylQ64IKhrrszOrmIekG1v
IwT8wck/ahwIRdyWBEqCZ7gdy3Gg8MADTQ==
-----END EC PRIVATE KEY-----`
    } )
    */


    const headers = {
	'p': {'alg': 'ES256'},
	'u': {'kid': '11'}
    };
    const signer = {
	'key': {
	    'd': Buffer.from('6c1382765aec5358f117733d281c1c7bdc39884d04a45a1e6c67c858bc206c19', 'hex')
	}
    };

    let cosebuf = await cose.sign.create(headers,JSON.stringify(msg),signer)
    let cosestr =  cosebuf.toString('hex')
    // MUST DO toUpperCase() so QR will use alphanumeric
    let cosed = zlib.deflateSync(cosebuf)
    let cosegz = zlib.gzipSync(cosebuf)
    let cosebrotli = zlib.brotliCompressSync(cosebuf)
    let cose32 = base32.encode(cosebuf).toUpperCase()
    let cose45 = base45.encode(cosebuf)
    let cosed32 = base32.encode(cosed).toUpperCase()
    let cosed45 = base45.encode(cosed)
    let cosegz32 = base32.encode(cosegz).toUpperCase()
    let cosegz45 = base45.encode(cosegz)
    let cosebrotli32 = base32.encode(cosebrotli)
    let cosebrotli45 = base45.encode(cosebrotli)

    let cosecborbuf = await cose.sign.create(headers,cbor.encode(msg),signer)
    let cosecborstr =  cosebuf.toString('hex')
    // MUST DO toUpperCase() so QR will use alphanumeric
    let cosecbord = zlib.deflateSync(cosecborbuf)
    let cosecborgz = zlib.gzipSync(cosecborbuf)
    let cosecborbrotli = zlib.brotliCompressSync(cosecborbuf)
    let cosecbor32 = base32.encode(cosecborbuf).toUpperCase()
    let cosecbor45 = base45.encode(cosecborbuf)
    let cosecbord32 = base32.encode(cosecbord).toUpperCase()
    let cosecbord45 = base45.encode(cosecbord)
    let cosecborgz32 = base32.encode(cosecborgz).toUpperCase()
    let cosecborgz45 = base45.encode(cosecborgz)
    let cosecborbrotli32 = base32.encode(cosecborbrotli)
    let cosecborbrotli45 = base45.encode(cosecborbrotli)


    let serializations = {
	//'json' : str,
	//'condensed' : condStr,
	//'cbor_b45' : b45str,
	//'cbor_b32' : b32str,
	//'jwt' : jwtstr,
	'cose' : cosestr,
	'cosecbor' : cosecborstr,
	'cose32' : cose32,
	'cosecbor32' : cosecbor32,
	'cose45' : cose45,
	'cosecbor45' : cosecbor45,
  'cosed32' : cosed32,
  'cosecbord32' : cosecbord32,
  'cosed45' : cosed45,
  'cosecbord45' : cosecbord45,
  //'cosegz32' : cosegz32,
  'cosegz45' : cosegz45,
  //'cosebrotli32' : cosebrotli32,
  'cosebrotli45' : cosebrotli45,
  'jws' : jwsstr,
  'jws45' : jws45,
  'jwsd45' : jwsd45,
  //'jws45d45' : jws45d45,
  'jwscbor' : jwscborstr,
  'jwscbor45' : jwscbor45,
  'jwscbord45' : jwscbord45,
  //'jwscbor45d45' : jwscbor45d45,
  //'jwscbr' : jwscbr
    }

    
      for ( let ec_lvl of ec_lvls ) {
        for( let sname of Object.keys(serializations) ) {
          let serialization = serializations[sname]
          console.log(sname + " / " +  ec_lvl)
          console.log("  Length: " + serialization.length)
          console.log("  Content: " + serialization)

          qrcode.toString(serialization, { errorCorrectionLevel: ec_lvl }, (err,string) => {
            console.log(string)
          })
          let qr = qrcode.create(serialization, { errorCorrectionLevel: ec_lvl })
          console.log(qr)
          fs.appendFile('output/stats.csv',
            msgname + '	' +
            sname + '	' +
            ec_lvl + '	' +
            qr["version"] + "	" +
            qr["modules"]["size"] + "	" +
            serialization.length + '	'  +
            serialization  + "\n",
            function(){})
          qrcode.toFile('output/' + msgname + '.'  + sname +'.' + ec_lvl  +'.png', [ {data: serialization}], { errorCorrectionLevel: ec_lvl }, (err,out) => {})	
        }
      }
})  
