import sha256 from 'hash.js/lib/hash/sha/256';
import { Crypt } from 'hybrid-crypto-js';

import getEnvVars from '../env';
const { AUTH_URL } = getEnvVars();

const crypt = new Crypt();

export function sha(text) {
  return sha256()
    .update(text)
    .digest('hex');
}

/** Generate and store keypair */
export function pair() {
  return fetch(`${AUTH_URL}/pair`).then(res => {
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
