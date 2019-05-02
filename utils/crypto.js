import sha256 from "hash.js/lib/hash/sha/256";
// import JSEncrypt from "jsencrypt";
import { Crypt, RSA } from "hybrid-crypto-js";

const crypt = new Crypt();
const rsa = new RSA();

export function sha(text) {
  return sha256()
    .update(text)
    .digest("hex");
}

/** Generate and store keypair */
export function pair() {
  // return new Promise(resolve => {
  //   rsa.generateKeypair(function(keypair) {
  //     resolve({ pub: keypair.publicKey, priv: keypair.privateKey });
  //   }, 2048);
  // });
  return fetch(
    "https://ny6zfikugf.execute-api.us-east-1.amazonaws.com/dev"
  ).then(res => {
    return res.json();
  });
}

/** Encrypt the provided string with the destination public key */
export function encrypt(content, publicKey) {
  return crypt.encrypt(publicKey, content);
}

/** Decrypt the provided string with the private key */
export function decrypt(content, privateKey) {
  return crypt.decrypt(privateKey, content).message;
}

// /** Generate and store keypair */
// export function pair() {
//   let crypt = new JSEncrypt({ default_key_size: 2048 });
//   crypt.getPrivateKey();

//   // Only return the public key, keep the private key hidden
//   return { pub: crypt.getPublicKey(), priv: crypt.getPrivateKey() };
// }

// /** Encrypt the provided string with the destination public key */
// export function encrypt(content, publicKey) {
//   let crypt = new JSEncrypt({ default_key_size: 2048 });
//   crypt.setKey(publicKey);
//   return crypt.encrypt(content);
// }

// /** Decrypt the provided string with the local private key */
// export function decrypt(content, privateKey) {
//   let crypt = new JSEncrypt({ default_key_size: 2048 });
//   crypt.setKey(privateKey);
//   return crypt.decrypt(content);
// }
