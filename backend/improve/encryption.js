import CryptoJS from 'crypto-js';
import Crypto from 'crypto';
import jwt from 'jsonwebtoken';


export const generateHash = (object) => {
    const SALT = "c4eef35af5f5cbeef35af12b8135dbf6c55793b17258f5dbf6c1993"
    return jwt.sign(object, SALT, {noTimestamp: true})
}

export const encrypt = (message) => CryptoJS.SHA256(message);


// const generateHash = (pass) => {
//     return Crypto.createHmac('sha256', process.env.SALT)
//         .update(pass)
//         .digest('hex');
// }


export let hash = (message) => CryptoJS.SHA256(message).toString();
export let fakeID = (length=8) => hash(Crypto.randomBytes(32).toString('hex')).substr(0, length);

export let fakeNumString = (length=5) => {
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
export let encryptAES = (message, key) => CryptoJS.AES.encrypt(message, key).toString();

// decryptAES
export let decryptAES = (message, key) => CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);



export const randomHash = (length = 24, type = 1) => {
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


