const cbor = require('cbor')
const qrcode = require('qrcode')
const base45 = require('base45')
const jws = require('jws')
const stringifyObject = require('stringify-object')
const cose = require('cose-js');
const fs = require('fs');

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
    }


}


/**********************************************************************
 *  No need to edit below                                             *
 *********************************************************************/

fs.truncate('output/stats.csv', 0,function() {})
fs.appendFile('output/stats.csv',"Message	Serialization	EC Level	Verion	Mod. Size	Length	Serialization\n",function() {})

Object.keys(msgs).forEach( msgname=>{
    let msg = msgs[msgname]
    let sig_msg = msg
    sig_msg['z'] = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJVadQssw5c"

    console.log("\n\n\n******   Message "  + msgname + "   *********\n\n\n")
    
    let str = JSON.stringify(sig_msg)

    let condStr = str.replaceAll('"','').replaceAll('{','').replaceAll('}','')
    console.log("Looking at Signed Condesnsed string: " + condStr)
    console.log("  Length: " + condStr.length)


    let cbrstr = cbor.encode(msg)
    console.log("CBOR encodded string: " + cbrstr)
    console.log("  Length: " + cbrstr.length)

    let b45str = base45.encode(cbrstr)
    console.log("Based 45 encoding of CBOR: " + b45str)
    console.log("  Length: " + b45str.length)


    const headers = {
	'p': {'alg': 'ES256'},
	'u': {'kid': '11'}
    };
    const signer = {
	'key': {
	    'd': Buffer.from('6c1382765aec5358f117733d281c1c7bdc39884d04a45a1e6c67c858bc206c19', 'hex')
	}
    };

    let cosebuf = cose.sign.create(headers,str,signer)
    let cosestr =  cosebuf.toString('hex')


    let serializations = {
	'json' : str,
	'condensed' : condStr,
	'cbor_b45' : b45str
//	'cose' : cosestr
    }

    
    ec_lvls.forEach( function(ec_lvl) {
	Object.keys(serializations).forEach(sname => {
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
	})
    })
})  
