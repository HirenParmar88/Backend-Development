//AES Algorithms work

import CryptoJS from "crypto-js"

const ciphertext = CryptoJS.AES.encrypt("hiren parmar","123").toString()    //123 is a key
console.log("Cipher Text :", ciphertext);

const plaintext=CryptoJS.AES.decrypt(ciphertext,"123").toString(CryptoJS.enc.Utf8)
console.log("Plain Text :", plaintext);