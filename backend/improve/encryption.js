const CryptoJS = require("crypto-js");
const Crypto = require('crypto');
const jwt = require("jsonwebtoken");


const generateHash = (object) => {
    const SALT = "c4eef35af5f5cbeef35af12b8135dbf6c55793b17258f5dbf6c1993"
    return jwt.sign(object, SALT, {noTimestamp: true})
}

const encrypt = (message) => CryptoJS.SHA256(message);


// const generateHash = (pass) => {
//     return Crypto.createHmac('sha256', process.env.SALT)
//         .update(pass)
//         .digest('hex');
// }


let hash = (message) => CryptoJS.SHA256(message).toString();
let fakeID = (length=8) => hash(Crypto.randomBytes(32).toString('hex')).substr(0, length);

let fakeNumString = (length=5) => {
    let inner = (length) =>{
        temp = "";
        for (x=0; x <= length; x++){
            temp += Math.floor(Math.random() * 10);
        }
        return temp;
    }
    return inner(length);
}

// encryptAES
let encryptAES = (message, key) => CryptoJS.AES.encrypt(message, key).toString();

// decryptAES
let decryptAES = (message, key) => CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);





if (require.main === module) {

    console.log(generateHash("KAi"))


    // message = 'zenosama';
    // passphase = 'ZNEOSAMAEAJSKLHJLKALJLKAKLLKAJAJKLJAKLK';
    // encrypted = messageEncrypt(message, passphase);
    // decrypted = messageDecrypt(encrypted, passphase);

    // console.log('Encrypted :' + encrypted);
    // console.log('Size of Encrypted :' + sizeof(encrypted));
    // console.log('Decrypted: ' + decrypted);
    // console.log(sizeof('U2FsdGVkX19+SiLlnUMiuz+mNakFA6PDrrHWmxldZSA='));
}

const randomHash = (length = 24, type = 1) => {
    let characters = '';
    let result = '';
    if (type === 1){
        characters = "abcdef0123456789";
    }else{
        characters = "ABCDEFabcdef0123456789";
    }

	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		)
	}
	return result;
};


module.exports = {
    hash, fakeID, fakeNumString, encryptAES, decryptAES, generateHash, randomHash
}